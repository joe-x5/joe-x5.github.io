
window.onload = function() {
    const notificationsUrl = 'https://joe-x5.github.io/kaios/notifications.json';

    // Function to request permission if needed
    function requestNotificationPermission() {
        if ("Notification" in window) {
            if (Notification.permission !== "granted" && Notification.permission !== "denied") {
                return Notification.requestPermission();
            } else {
                return Promise.resolve(Notification.permission);
            }
        } else {
            // No support for notifications
            return Promise.resolve("unsupported");
        }
    }

    // Fetch notifications JSON
    fetch(notificationsUrl)
        .then(response => response.json())
        .then(data => {
            // Filter enabled notifications
            const enabledNotifications = data.filter(n => n.enabled);

            // Request permission and then schedule notifications
            requestNotificationPermission().then(permission => {
                if (permission === "granted") {
                    enabledNotifications.forEach(notif => {
                        setTimeout(() => {
                            new Notification(notif.title, {
                                body: notif.body,
                                icon: notif.icon
                            });
                        }, notif.delay * 1000); // delay in milliseconds
                    });
                } else {
                    console.log("Notification permission not granted or unsupported.");
                }
            });
        })
        .catch(error => {
            console.error("Error fetching notifications JSON:", error);
        });
};
