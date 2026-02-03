// Global flag to control notifications
let notificationsEnabled = false;

// Store timeout IDs to allow cancellation if needed
let scheduledTimeouts = [];

// Function to fetch notifications JSON using XMLHttpRequest for KaiOS
function fetchNotifications() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://joe-x5.github.io/kaios/notifications.json', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        scheduleNotifications(data);
      } else {
        console.error('Failed to fetch notifications:', xhr.status);
      }
    }
  };
  xhr.send();
}

// Function to schedule notifications based on fetched data
function scheduleNotifications(notifications) {
  // Clear previous scheduled notifications
  clearScheduledNotifications();

  if (!notificationsEnabled) {
    console.log('Notifications are currently disabled.');
    return;
  }

  notifications.forEach(function(notification) {
    if (notification.enabled) {
      var timeoutId = setTimeout(function() {
        showNotification(notification);
      }, notification.delay * 1000);
      scheduledTimeouts.push(timeoutId);
    }
  });
}

// Function to show a notification
function showNotification(notificationData) {
  if ('Notification' in window) {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          new Notification(notificationData.title, {
            body: notificationData.body,
            icon: notificationData.icon
          });
        }
      });
    } else {
      new Notification(notificationData.title, {
        body: notificationData.body,
        icon: notificationData.icon
      });
    }
  } else {
    console.log('Notifications are not supported.');
  }
}

// Function to clear all scheduled notifications
function clearScheduledNotifications() {
  scheduledTimeouts.forEach(function(id) {
    clearTimeout(id);
  });
  scheduledTimeouts = [];
}

// Function to enable notifications
function enableNotifications() {
  notificationsEnabled = true;
  console.log('Notifications enabled.');
  fetchNotifications(); // Optionally reschedule
}

// Function to disable notifications
function disableNotifications() {
  notificationsEnabled = false;
  console.log('Notifications disabled.');
  clearScheduledNotifications();
}

// Example usage:
enableNotifications(); // Call this to enable notifications
// disableNotifications(); // Call this to disable notifications

// Fetch and schedule notifications initially
fetchNotifications();