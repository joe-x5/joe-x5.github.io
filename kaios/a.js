// script.js

(function() {
    // Create and style the popup
    const popup = document.createElement('div');
    const adContainer = document.createElement('div');
    const dismissBtn = document.createElement('button');
    const adIframe = document.createElement('iframe');

    // Style the popup
    popup.style.width = '200px';
    popup.style.height = '200px';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.border = '1px solid #ccc';
    popup.style.backgroundColor = 'white';
    popup.style.display = 'none'; // Hide initially
    popup.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    popup.style.zIndex = '1000';

    // Create and style the dismiss button with emoji
    dismissBtn.innerHTML = '&#10006; Dismiss'; // Using HTML entity for "cross mark"
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

    // Create and configure the ad iframe
    adIframe.setAttribute('data-google-container-id', 'a!2');
    adIframe.setAttribute('data-load-complete', 'true');
    adIframe.frameBorder = '0';
    adIframe.style.border = '0';
    adIframe.style.width = '100%';
    adIframe.style.height = '100%';
    adIframe.src = "https://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-1786122365693674&output=html&adk=2062069824&adf=3025194257&lmt=1705043566&w=728&rafmt=9&format=728x90&url=https://y8.com/&host=ca-host-pub-1556223355139109&";

    // Assemble the popup
    adContainer.style.border = 'none';
    adContainer.style.width = '90%';
    adContainer.style.margin = '0 auto';
    adContainer.style.position = 'relative';
    adContainer.style.visibility = 'visible';
    adContainer.style.backgroundColor = 'transparent';
    adContainer.style.overflow = 'auto';

    adContainer.appendChild(adIframe);
    popup.appendChild(dismissBtn);
    popup.appendChild(adContainer);

    // Append popup to the body
    document.body.appendChild(popup);

    function showPopup() {
        popup.style.display = 'block'; // Show popup
        dismissBtn.style.display = 'none'; // Hide the dismiss button initially

        setTimeout(() => {
            dismissBtn.style.display = 'block'; // Show the dismiss button after 20 seconds
        }, 20000); // 20 seconds

        // Dismiss the popup
        dismissBtn.onclick = () => {
            popup.style.display = 'none'; // Hide the popup
        };
    }

    // Load the popup every 2 minutes
    setInterval(showPopup, 120000); // 120000 ms = 2 minutes

    // Show the popup when the page loads for the first time
    window.onload = showPopup;
})();
