(function() {
    const adsDisabledKey = 'adsDisabled';
    let showAd = false; // Flag to control the visibility of ads

    // Check localStorage for ad-disable flag
    const adsEnabled = !localStorage.getItem(adsDisabledKey); // Enable ads unless disabled

    // If ads are disabled, hide the ad
    if (!adsEnabled) {
        console.log('Ads are currently disabled for this user.');
        showAd = false; // Set showAd to false if ads are disabled
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
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.border = '2px solid black';
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

    // Display the popup
    function showPopup() {
        if (showAd) {
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
            timerText.style.fontSize = '14px';

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
            let isLongPress = false;
            const longPressDuration = 800; // Long press duration (800ms)

            const handleLongPress = () => {
                const password = prompt('Enter password to disable ads:');
                if (password === 'vx') {
                    localStorage.setItem(adsDisabledKey, 'true'); // Set flag in local storage
                    alert('Ads have been disabled for this user.');
                    showAd = false; // Update showAd variable
                    popup.style.display = 'none'; // Hide the popup
                } else {
                    alert('Incorrect password. Ads will remain enabled.');
                }
            };

            const startLongPress = () => {
                isLongPress = true;
                longPressTimeout = setTimeout(() => {
                    handleLongPress();
                    isLongPress = false; // Reset the long press flag after handling
                }, longPressDuration);
            };

            const endLongPress = () => {
                if (isLongPress) {
                    clearTimeout(longPressTimeout); // Clear timeout if user releases early
                    isLongPress = false; // Reset long press flag
                }
            };

            // Attach long press event listeners to timer text
            timerText.addEventListener('mousedown', startLongPress);
            timerText.addEventListener('mouseup', endLongPress);
            timerText.addEventListener('mouseleave', endLongPress);
            timerText.addEventListener('touchstart', startLongPress);
            timerText.addEventListener('touchend', endLongPress);
            timerText.addEventListener('touchcancel', endLongPress);
            timerText.addEventListener('pointerdown', startLongPress);
            timerText.addEventListener('pointerup', endLongPress);
            timerText.addEventListener('pointercancel', endLongPress);

            // Dismiss the popup when the button is clicked
            dismissBtn.onclick = () => {
                popup.style.display = 'none'; // Hide the popup
                clearInterval(countdownInterval); // Clear countdown interval
            };

            // Implement SoftLeft button functionality for KaiOS
            document.addEventListener('keydown', (event) => {
                // Assuming the SoftLeft button has a specific key identifier in KaiOS
                if (event.key === 'SoftLeft') { // Replace with actual key value for SoftLeft if needed
                    dismissBtn.click(); // Simulate click on the dismiss button
                }
            });
        }
    }

    // Load the popup every 2 minutes if showAd is true
    setInterval(() => {
        if (showAd) {
            showPopup();
        }
    }, 120000); // 120000 ms = 2 minutes

    // Show the popup when the page loads for the first time
    window.onload = showPopup;
})();
