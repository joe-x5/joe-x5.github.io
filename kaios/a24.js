// Function to toggle spatial navigation
function toggleCursor() {
    // Check if spatial navigation is enabled
    if (typeof navigator.spatialNavigationEnabled !== 'undefined') {
        navigator.spatialNavigationEnabled = !navigator.spatialNavigationEnabled;
        console.log('Spatial Navigation Enabled:', navigator.spatialNavigationEnabled);
    } else {
        console.warn('Spatial navigation is not supported in this browser.');
    }
}

// Function to toggle fullscreen mode
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
            console.warn(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}

document.addEventListener("keydown", (e) => {
  switch(e.key) {
    /* Volume Down */
    case "*":
      if (navigator.volumeManager)
        navigator.volumeManager.requestDown();
      break;

    case "SoftRight": 
      window.close(); // Attempt to close the app
      break;         
                        
    case "Call": 
      toggleCursor(); // Toggle spatial navigation
      break;

    /* Fullscreen toggle with '0' */
    case "0":
      toggleFullScreen();
      break;

    /* Volume Up */
    case "#":
      if (navigator.volumeManager)
        navigator.volumeManager.requestUp();
      break;
  }
});