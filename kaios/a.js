// Function to dynamically load another JavaScript file
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
}

// Load multiple scripts
Promise.all([
    loadScript('https://joe-x5.github.io/kaios/notice.js'),
    loadScript('https://joe-x5.github.io/kaios/b.js')
]).then(() => {
    console.log('All scripts loaded successfully!');
}).catch(error => {
    console.error(error);
});