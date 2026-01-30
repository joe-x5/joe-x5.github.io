const enableStyles = true; // Set to false to disable

const cssUrls = [
  'https://joe-x5.github.io/kaios/css/a.css',
  'https://joe-x5.github.io/kaios/css/blank.css',
  'https://joe-x5.github.io/kaios/css/blank.css'
];

const links = [];

if (enableStyles) {
  // Enable styles
  cssUrls.forEach(function(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
    links.push(link);
  });
} else {
  // Disable styles: remove existing link elements if any
  links.forEach(function(link) {
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
  });
}