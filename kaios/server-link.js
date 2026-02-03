// Toggle variable: set to true to enable URL replacement, false to disable
const enableReplacement = true; // Change to false to disable

if (enableReplacement) {
  document.querySelectorAll('iframe').forEach(function(iframe) {
    // Save original src
    const originalSrc = iframe.src;

    // Replace with a lightweight placeholder (e.g., a blank or loading page)
    iframe.src = 'about:blank'; // or a small loading page URL

    // Optional: show a loading indicator or placeholder here

    // Delay replacement of the real URL for faster initial load
    setTimeout(function() {
      iframe.src = originalSrc.replace(
        'x0storekaios.blogspot.com/',
        'x0.rf.gd/tools/safe-link/links.php?p='
      );
    }, 100); // Delay in milliseconds, adjust as needed
  });
}