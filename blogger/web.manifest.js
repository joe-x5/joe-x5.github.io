// automatic manifest generator 

document.addEventListener('DOMContentLoaded', function() {
  const title = "<data:blog.pageTitle/>";
  const description = "<data:blog.pageDescription/>";
  const iconUrl = "/favicon.ico"; // Path to your favicon

  const manifestObject = {
    name: title,
    short_name: title,
    description: description,
    icons: [
      {
        src: iconUrl,
        sizes: "16x16",
        type: "image/x-icon"
      },
      {
        src: iconUrl,
        sizes: "32x32",
        type: "image/x-icon"
      },
      {
        src: iconUrl,
        sizes: "48x48",
        type: "image/x-icon"
      }
      // Add more icon sizes if needed
    ],
    start_url: "./"
  };

  const blob = new Blob([JSON.stringify(manifestObject)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('link');
  link.rel = 'manifest';
  link.href = url;

  document.head.appendChild(link);
});