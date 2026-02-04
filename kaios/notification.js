// Global flag to control notifications
let notificationsEnabled = true;
let scheduledTimeouts = [];

// Detect platform
function isKaiOS() {
  return /KAIOS/i.test(navigator.userAgent) || 'MozActivity' in window;
}

// Fetch notifications from JSON
function fetchNotifications() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://joe-x5.github.io/kaios/notifications.json', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          var data = JSON.parse(xhr.responseText);
          scheduleNotifications(data);
        } catch (e) {
          console.error('Error parsing JSON:', e);
        }
      } else {
        console.error('Failed to fetch notifications:', xhr.status);
      }
    }
  };
  xhr.send();
}

// Schedule notifications
function scheduleNotifications(notifications) {
  clearScheduledNotifications();
  
  if (!notificationsEnabled) {
    console.log('Notifications disabled');
    return;
  }
  
  console.log('Scheduling', notifications.length, 'notifications');
  
  notifications.forEach(function(notification, index) {
    if (notification.enabled) {
      var delay = notification.delay || 5; // Default 5 seconds if not specified
      var timeoutId = setTimeout(function() {
        showNotification(notification);
      }, delay * 1000);
      scheduledTimeouts.push(timeoutId);
      console.log('Scheduled notification', index, 'in', delay, 'seconds');
    }
  });
}

// Show notification for Android (Web API)
function showAndroidNotification(notificationData) {
  if (!('Notification' in window)) {
    console.log('Notifications not supported');
    return;
  }
  
  if (Notification.permission === 'granted') {
    var notification = new Notification(notificationData.title || 'Notification', {
      body: notificationData.body || '',
      icon: notificationData.icon || 'https://joe-x5.github.io/kaios/icon.png'
    });
    
    notification.onclick = function() {
      window.focus();
      this.close();
    };
    
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function(permission) {
      if (permission === 'granted') {
        var notification = new Notification(notificationData.title || 'Notification', {
          body: notificationData.body || '',
          icon: notificationData.icon || 'https://joe-x5.github.io/kaios/icon.png'
        });
      }
    });
  }
}

// Show notification for KaiOS
function showKaiOSNotification(notificationData) {
  if ('MozActivity' in window) {
    try {
      var activity = new MozActivity({
        name: 'notification',
        data: {
          title: notificationData.title || 'Notification',
          body: notificationData.body || '',
          iconUrl: notificationData.icon || 'https://joe-x5.github.io/kaios/icon.png'
        }
      });
      
      console.log('KaiOS notification sent');
    } catch (e) {
      console.error('KaiOS notification error:', e);
    }
  } else {
    console.log('MozActivity not available');
  }
}

// Main notification function
function showNotification(notificationData) {
  console.log('Showing notification:', notificationData.title);
  
  if (isKaiOS()) {
    showKaiOSNotification(notificationData);
  } else {
    showAndroidNotification(notificationData);
  }
}

// Clear all scheduled notifications
function clearScheduledNotifications() {
  scheduledTimeouts.forEach(function(id) {
    clearTimeout(id);
  });
  scheduledTimeouts = [];
}

// Enable notifications
function enableNotifications() {
  notificationsEnabled = true;
  console.log('Notifications enabled');
  fetchNotifications();
}

// Disable notifications
function disableNotifications() {
  notificationsEnabled = false;
  console.log('Notifications disabled');
  clearScheduledNotifications();
}

// Initialize - start everything
function init() {
  console.log('Initializing notifications system...');
  
  if (isKaiOS()) {
    console.log('Running on KaiOS');
    // KaiOS doesn't need permission request
    enableNotifications();
  } else {
    console.log('Running on Android/Desktop');
    
    // Check notification permission for Android/Desktop
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        enableNotifications();
      } else if (Notification.permission === 'default') {
        // Request permission
        Notification.requestPermission().then(function(permission) {
          console.log('Permission result:', permission);
          if (permission === 'granted') {
            enableNotifications();
          }
        });
      }
    } else {
      console.log('Web Notifications API not available');
    }
  }
}

// Start when page loads
window.addEventListener('load', init);

// Optional: Refresh every 5 minutes
setInterval(function() {
  if (notificationsEnabled) {
    fetchNotifications();
  }
}, 300000);