// Select all image elements
const images = document.querySelectorAll('img');

images.forEach(img => {
  const src = img.getAttribute('src');
  if (src && src.startsWith('img/')) {
    // Replace only relative paths starting with 'img/'
    img.src = 'https://joe-x5.github.io/chatwave/' + src;
  }
});