// Select the iframe element
const iframe = document.getElementById('iframe');

if (iframe) {
  // Set the necessary attributes
  iframe.setAttribute('mozbrowser', 'true');
  iframe.setAttribute('mozallowfullscreen', 'true');
  iframe.setAttribute('remote', 'true');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('name', 'X0 Team');

  // Function to initialize iframe features
  function initIframeFeatures() {
    try {
      // Access the iframe's document
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

      // Example: Intercept link clicks inside iframe
      iframeDoc.addEventListener('click', (e) => {
        const target = e.target;
        if (target.tagName === 'A') {
          const href = target.getAttribute('href');

          // Handle external links or add custom logic
          if (href && href.startsWith('http')) {
            e.preventDefault();
            window.open(href, '_blank'); // Open in new tab/window
          }
        }
      });

      // Example: Handle location change
      iframe.addEventListener('mozbrowserlocationchange', (e) => {
        console.log('Location changed:', e.detail);
        // Add custom logic on location change
      });

      // Example: Handle fullscreen toggle
      iframe.addEventListener('mozbrowserfullscreenchange', (e) => {
        if (document.fullscreenElement) {
          // Exit fullscreen
          document.exitFullscreen();
        } else {
          // Enter fullscreen if needed
          iframe.requestFullscreen();
        }
      });

      // You can add other event listeners like mozbrowsererror, mozbrowserloadstart, etc.
      
    } catch (err) {
      console.error('Error initializing iframe features:', err);
    }
  }

  // Attach load event to initialize features after iframe loads
  iframe.addEventListener('load', initIframeFeatures);
}