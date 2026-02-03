window.addEventListener('load', () => {
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach(iframe => {
    iframe.addEventListener('load', () => {
      if (iframe.src.includes('x0storekaios.blogspot.com/')) {
        iframe.src = iframe.src.replace(
          'x0storekaios.blogspot.com/',
          'x0.rf.gd/tools/safe-link/links.php?p='
        );
      }
    });
  });
});
