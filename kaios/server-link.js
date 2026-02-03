window.addEventListener('load', () => {
  const iframe = document.querySelector('iframe.iframe'); // Select iframe with class 'iframe'

  if (!iframe) return; // Exit if iframe not found

  // If a saved link exists, set it as the iframe's src
  const savedLink = localStorage.getItem('iframeLink');
  if (savedLink) {
    iframe.src = savedLink;
  }

  // Wait for iframe to load
  iframe.addEventListener('load', () => {
    let currentSrc = iframe.src;

    // Check if the URL matches the target domain
    if (currentSrc.includes('x0storekaios.blogspot.com/')) {
      // Replace URL
      const newSrc = currentSrc.replace(
        'x0storekaios.blogspot.com/',
        'x0.rf.gd/tools/safe-link/links.php?p='
      );

      // Save the new URL in localStorage
      localStorage.setItem('iframeLink', newSrc);

      // Update iframe's src
      iframe.src = newSrc;

      // Show alert prompt
      alert('Server link has been changed and updated.');
      
      // Reload the page to apply changes
      location.reload();
    }
  });
});