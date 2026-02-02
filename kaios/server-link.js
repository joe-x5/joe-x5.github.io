// Run this script as early as possible in your app's startup
const enableReplacement = true;

if (enableReplacement) {
  // Replace iframe URLs immediately
  document.querySelectorAll('iframe').forEach(function(iframe) {
    if (iframe.src.includes('x0storekaios.blogspot.com/')) {
      iframe.src = iframe.src.replace(
        'x0storekaios.blogspot.com/',
        'x0.rf.gd/tools/safe-link/links.php?p='
      );
    }
  });
}