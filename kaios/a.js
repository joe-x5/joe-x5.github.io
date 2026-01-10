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

loadScript('https://joe-x5.github.io/kaios/notice.js')
    .then(() => {
        console.log('Script loaded successfully!');
    })
    .catch(error => {
        console.error(error);
    });

(function() {
    // Check localStorage for ad-disable flag
    const adsDisabledKey = 'adsDisabled';
    const adsEnabled = !localStorage.getItem(adsDisabledKey); // Enable ads unless disabled

    // If ads are disabled, exit
    if (!adsEnabled) {
        console.log('Ads are currently disabled for this user.');
        return; // Exit if ads are disabled
    }

    // Create and style the popup
    const popup = document.createElement('div');
    const adContainer = document.createElement('div');
    const dismissBtn = document.createElement('button');
    const adIframe = document.createElement('iframe');
    const timerText = document.createElement('p'); // For timer display

    // Style the popup
    popup.style.width = '220px';
    popup.style.height = '220px';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';popup.style.border = '2px solid black';
popup.style.borderRadius = '5px';
popup.style.backgroundColor = 'white';
popup.style.display = 'none'; // Hide initially
popup.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)'; // Updated box shadow
popup.style.zIndex = '999';

// Create and style the dismiss button with emoji
    dismissBtn.innerHTML = '&#10006;'; // Using HTML entity for "cross mark"
    dismissBtn.style.position = 'absolute';
    dismissBtn.style.top = '5px';
    dismissBtn.style.right = '5px';
    dismissBtn.style.cursor = 'pointer';
    dismissBtn.style.backgroundColor = 'red';
    dismissBtn.style.color = 'white';
    dismissBtn.style.border = 'none';
    dismissBtn.style.padding = '5px 10px';
    dismissBtn.style.borderRadius = '5px';
    dismissBtn.style.display = 'none'; // Hidden initially
    dismissBtn.style.zIndex = '1000';

    // Create and configure the ad iframe
    adIframe.setAttribute('data-google-container-id', 'a!2');
    adIframe.setAttribute('data-load-complete', 'true');
    adIframe.frameBorder = '0';
    adIframe.style.border = '0';
    adIframe.style.width = '100%';
    adIframe.style.height = '100%'; // Adjusted for better layout
    adIframe.src = "https://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-1786122365693674&output=html&adk=2062069824&adf=3025194257&lmt=1705043566&w=200&rafmt=9&format=200x200&url=https://y8.com/&host=ca-host-pub-1556223355139109&";

    // Assemble the popup
    adContainer.style.border = 'none';
    adContainer.style.width = '100%';
    adContainer.style.margin = '0 auto';
    adContainer.style.position = 'relative';
    adContainer.style.backgroundColor = 'transparent';
    adContainer.style.overflow = 'auto';

    adContainer.appendChild(adIframe);
    popup.appendChild(dismissBtn);
    popup.appendChild(adContainer);
    popup.appendChild(timerText); // Add timer text to the popup

    // Append popup to the body
    document.body.appendChild(popup);

    function showPopup() {
        popup.style.display = 'block'; // Show popup
        dismissBtn.style.display = 'none'; // Hide the dismiss button initially
        let timeLeft = 20; // Countdown starting value

        timerText.innerText = `${timeLeft}`; // Initial countdown text
        timerText.style.position = 'absolute';
        timerText.style.right = '5px';
        timerText.style.top = '5px';
     timerText.style.cursor = 'pointer';
     timerText.style.backgroundColor = 'red';
     timerText.style.color = 'white';
     timerText.style.border = 'none';
     timerText.style.padding = '5px 10px';
     timerText.style.borderRadius = '5px';
        timerText.style.fontSize = '20px';

        const countdownInterval = setInterval(() => {
            timeLeft--;
            timerText.innerText = `${timeLeft}`;
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                dismissBtn.style.display = 'block'; // Show the dismiss button after countdown
                timerText.innerText = ''; // Clear the timer text
            }
        }, 1000); // Update every second

        // Long press event for disabling ads
        let longPressTimeout;
        timerText.addEventListener('mousedown', () => {
            longPressTimeout = setTimeout(() => {
                const password = prompt('Enter password to disable ads:');
                if (password === 'vx') {
                    localStorage.setItem(adsDisabledKey, 'true');
                    alert('Ads have been disabled for this user.');
                    popup.style.display = 'none'; // Hide the popup
                } else {
                    alert('Incorrect password. Ads will remain enabled.');
                }
            }, 800); // Long press duration (800ms)
        });

        timerText.addEventListener('mouseup', () => {
            clearTimeout(longPressTimeout); // Clear timeout if user releases early
        });

        timerText.addEventListener('mouseleave', () => {
            clearTimeout(longPressTimeout); // Clear timeout if user leaves the timer area
        });

        // Dismiss the popup
        dismissBtn.onclick = () => {
            popup.style.display = 'none'; // Hide the popup
            clearInterval(countdownInterval); // Clear countdown interval
        };
    }

    // Load the popup every 2 minutes
    setInterval(showPopup, 120000); // 120000 ms = 2 minutes

    // Show the popup when the page loads for the first time
    window.onload = showPopup;
})();
