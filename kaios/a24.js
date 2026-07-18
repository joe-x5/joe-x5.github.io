// Variable to track state (starts as true)
let cursorActive = true;

// 1. Enable cursor automatically on app startup
window.addEventListener('DOMContentLoaded', function() {
  setCursorState(cursorActive);
});

// 2. Listen for the '1' key press to toggle
window.addEventListener('keydown', function(e) {
  if (e.key === '1') {
    e.preventDefault(); 
    cursorActive = !cursorActive; // Toggle state
    setCursorState(cursorActive);
  }
});

// Helper function to handle both KaiOS versions
function setCursorState(enable) {
  // KaiOS 3.0+
  if (navigator.b2g && navigator.b2g.virtualCursor) {
    if (enable) navigator.b2g.virtualCursor.enable();
    else navigator.b2g.virtualCursor.disable();
  } 
  // KaiOS 2.5
  else if ('spatialNavigationEnabled' in navigator) {
    navigator.spatialNavigationEnabled = enable;
  }
}
