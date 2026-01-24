const cssUrls = [
  'https://joe-x5.github.io/kaios/css/a.css',
  'https://joe-x5.github.io/kaios/css/b.css',
  'https://joe-x5.github.io/kaios/css/c.css'
];

cssUrls.forEach(function(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
});