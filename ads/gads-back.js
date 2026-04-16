function fetchAndReloadIframe(iframeId) {
  const iframe = document.getElementById(iframeId);
  const srcUrl = iframe.src;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', srcUrl, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Inject the fetched content into the iframe
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(xhr.responseText);
      doc.close();
    }
  };
  xhr.send();
}

function reloadIframes() {
  fetchAndReloadIframe('ad-iframe-1');
  fetchAndReloadIframe('ad-iframe-2');
}

// Set interval to reload every 2 minutes (120,000 ms)
setInterval(reloadIframes, 120000);
