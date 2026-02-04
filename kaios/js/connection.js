// KaiOS Internet Connectivity Monitor
// Shows notification only when connection status changes

// Create and inject popup styles
const style = document.createElement('style');
style.textContent = `
    @keyframes borderPulse {
        0% { border-color: transparent; }
        50% { border-color: inherit; }
        100% { border-color: transparent; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(-10px); }
    }
`;
document.head.appendChild(style);

// Create popup element
const popup = document.createElement('div');
popup.id = 'connectionPopup';
popup.style.cssText = `
    position: fixed;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 160px;
    padding: 6px 10px;
    border-radius: 3px;
    font-family: sans-serif;
    font-size: 11px;
    font-weight: bold;
    text-align: center;
    z-index: 9999;
    opacity: 0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    border: 1.5px solid transparent;
    animation: borderPulse 1.5s infinite;
    pointer-events: none;
`;
document.body.appendChild(popup);

let popupTimeout = null;
let lastConnectionState = null;
let lastConnectionType = null;

// Function to show popup
function showConnectionStatus(message, color) {
    // Clear any existing timeout
    if (popupTimeout) {
        clearTimeout(popupTimeout);
        popup.style.animation = 'none';
    }
    
    // Set popup content and style
    popup.textContent = message;
    popup.style.backgroundColor = color;
    popup.style.color = '#FFFFFF';
    popup.style.boxShadow = `0 2px 6px ${color}40`;
    
    // Show with animation
    popup.style.opacity = '1';
    popup.style.animation = 'fadeIn 0.3s ease, borderPulse 1.5s infinite';
    
    // Hide after 2 seconds with fade out
    popupTimeout = setTimeout(() => {
        popup.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            popup.style.opacity = '0';
            popup.style.animation = '';
        }, 300);
    }, 2000);
}

// Function to get current connection type and status
function getConnectionInfo() {
    let isOnline = navigator.onLine;
    let connectionType = 'unknown';
    
    // Try to detect connection type
    if (navigator.mozConnection) {
        const conn = navigator.mozConnection;
        if (conn.type) {
            connectionType = conn.type;
        }
    }
    
    return {
        isOnline: isOnline,
        type: connectionType,
        state: isOnline ? 'online' : 'offline'
    };
}

// Function to check if connection state changed
function checkConnectionChange() {
    const currentInfo = getConnectionInfo();
    const currentState = `${currentInfo.state}-${currentInfo.type}`;
    
    // Only show notification if state changed
    if (lastConnectionState !== currentState) {
        lastConnectionState = currentState;
        
        if (currentInfo.isOnline) {
            // Show different messages based on connection type
            let message = 'You\'re Online';
            if (currentInfo.type === 'wifi') {
                message = 'WiFi Connected';
            } else if (currentInfo.type === 'cellular') {
                message = 'Mobile Data On';
            } else if (currentInfo.type === 'ethernet') {
                message = 'Ethernet Connected';
            }
            
            showConnectionStatus(message, '#4CAF50'); // Green
        } else {
            showConnectionStatus('You\'re Offline', '#F44336'); // Red
        }
    }
}

// Initial check - store initial state but don't show notification on load
window.addEventListener('load', function() {
    const initialInfo = getConnectionInfo();
    lastConnectionState = `${initialInfo.state}-${initialInfo.type}`;
    lastConnectionType = initialInfo.type;
    
    // Optional: Show initial status after a brief delay (remove if you don't want this)
    setTimeout(() => {
        if (initialInfo.isOnline) {
            let message = 'You\'re Online';
            if (initialInfo.type === 'wifi') {
                message = 'WiFi Connected';
            } else if (initialInfo.type === 'cellular') {
                message = 'Mobile Data On';
            }
            showConnectionStatus(message, '#4CAF50');
        }
    }, 1000);
});

// Listen for online/offline events
window.addEventListener('online', function() {
    // Small delay to ensure connection type is detected
    setTimeout(checkConnectionChange, 500);
});

window.addEventListener('offline', function() {
    checkConnectionChange();
});

// KaiOS-specific: Use connection API for detailed network type changes
if (navigator.mozConnection) {
    const conn = navigator.mozConnection;
    
    conn.addEventListener('change', function() {
        // Check for connection type changes
        const currentType = conn.type || 'unknown';
        
        if (lastConnectionType !== currentType) {
            lastConnectionType = currentType;
            
            // If we're online, show connection type change
            if (navigator.onLine) {
                let message = 'You\'re Online';
                if (currentType === 'wifi') {
                    message = 'Switched to WiFi';
                } else if (currentType === 'cellular') {
                    message = 'Switched to Mobile Data';
                } else if (currentType === 'none') {
                    message = 'You\'re Offline';
                    showConnectionStatus(message, '#F44336');
                    return;
                }
                
                showConnectionStatus(message, '#4CAF50');
            }
        }
        
        // Also check general connection state
        checkConnectionChange();
    });
}

// Periodic check for connection changes (every 30 seconds)
setInterval(checkConnectionChange, 30000);

// Check when app comes to foreground
if (document.visibilityState !== undefined) {
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            // Check for connection changes when app becomes visible
            setTimeout(checkConnectionChange, 1000);
        }
    });
}

// Network information API (if available)
if (navigator.connection) {
    navigator.connection.addEventListener('change', checkConnectionChange);
}

// Function to perform actual network test (optional, for accuracy)
function performNetworkTest() {
    if (navigator.onLine) {
        fetch('https://www.gstatic.com/generate_204', {
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-cache'
        })
        .catch(() => {
            // If fetch fails but navigator says online, there might be captive portal or limited connectivity
            if (navigator.onLine && lastConnectionState && lastConnectionState.includes('online')) {
                showConnectionStatus('Limited Connectivity', '#FF9800'); // Orange
                lastConnectionState = 'limited-unknown';
            }
        });
    }
}

// Perform occasional network tests (every 2 minutes)
setInterval(performNetworkTest, 120000);