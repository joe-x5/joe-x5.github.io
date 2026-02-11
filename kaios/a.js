// Function to dynamically load another JavaScript file
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
}

// Function to detect the device type
function getDeviceType() {
    const userAgent = navigator.userAgent;
    if (/KaiOS/i.test(userAgent)) {
        return 'KaiOS';
    } else if (/Android/i.test(userAgent)) {
        return 'Android';
    } else {
        return 'Other';
    }
}

// Load multiple scripts based on device type
function loadScriptsForDevice() {
    const deviceType = getDeviceType();
    console.log(`Device Type: ${deviceType}`);

    const scriptsToLoad = [
        loadScript('https://joe-x5.github.io/kaios/notice.js'),
loadScript('https://joe-x5.github.io/kaios/notification.js'),
loadScript('https://joe-x5.github.io/kaios/js/custom-html.js'),
        loadScript('https://joe-x5.github.io/kaios/kai-ads.js'),
loadScript('https://joe-x5.github.io/kaios/server-link.js'),
loadScript('https://joe-x5.github.io/kaios/css.js'),
loadScript('https://joe-x5.github.io/kaios/js/permission.js'),
        loadScript('https://joe-x5.github.io/kaios/b.js'),
        loadScript('https://joe-x5.github.io/kaios/c.js')
    ];

    // You can conditionally load different scripts if needed, based on device type
    // Example:
    if (deviceType === 'KaiOS') {
        // Load additional scripts specific for KaiOS if needed
    } else if (deviceType === 'Android') {
        // Load additional scripts for Android if needed
    }

    // Load the scripts
    Promise.all(scriptsToLoad)
        .then(() => {
            console.log('All scripts loaded successfully!');
        })
        .catch(error => {
            console.error(error);
        });
}

// Execute the function to load scripts
loadScriptsForDevice();