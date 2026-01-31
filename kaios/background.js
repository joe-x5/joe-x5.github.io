// background.js

// Function to show a notification
function showNotification(title, message) {
  if (Notification.permission === "granted") {
    new Notification(title, { body: message });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification(title, { body: message });
      }
    });
  }
}

// Example: show a notification when the background script runs
showNotification("KaiOS Notification", "Background script is active!");