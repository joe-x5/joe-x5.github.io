  // Toggle variable: set to true to enable URL replacement, false to disable
  const enableReplacement = true; // Change to false to disable

  if (enableReplacement) {
    document.querySelectorAll('iframe').forEach(function(iframe) {
      iframe.src = iframe.src.replace('x0storekaios.blogspot.com/', 'x0.rf.gd/tools/safe-link/links.php?p=');
    });
  }
