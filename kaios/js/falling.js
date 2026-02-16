// script.js

(function() {
  // Constants
  const LONG_PRESS_DURATION = 3000; // 3 seconds in ms
  const BUTTON_CODE_5 = 53; // Key code for '5' key in KaiOS
  const FALLING_ITEMS = [
    { type: 'heart', emoji: '❤️' },
    { type: 'flower', emoji: '🌸' },
    { type: 'hears', emoji: '👂' },
    { type: 'panty', emoji: '🩲' },
    { type: 'banana', emoji: '🍌' },
  ];

  // State variables
  let pressTimer = null;
  let isLongPress = false;

  // Create overlay for falling animations
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.pointerEvents = 'none';
  overlay.style.overflow = 'hidden';
  overlay.style.zIndex = 9999;
  document.body.appendChild(overlay);

  // Function to start long press detection
  function handleKeyDown(e) {
    if (e.keyCode === BUTTON_CODE_5) {
      if (pressTimer === null) {
        isLongPress = false;
        pressTimer = setTimeout(() => {
          isLongPress = true;
          openMenu();
        }, LONG_PRESS_DURATION);
      }
    }
  }

  // Function to cancel long press detection
  function handleKeyUp(e) {
    if (e.keyCode === BUTTON_CODE_5) {
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    }
  }

  // Function to open prompt menu
  function openMenu() {
    const options = Array.from({ length: 11 }, (_, i) => `${i}`);
    const choice = prompt(
      'Select an option:\n' + options.join(' : '),
      localStorage.getItem('kaios_option') || '0'
    );
    if (choice !== null && options.includes(choice)) {
      localStorage.setItem('kaios_option', choice);
    }
  }

  // Function to create falling item
  function createFallingItem() {
    const itemData = FALLING_ITEMS[Math.floor(Math.random() * FALLING_ITEMS.length)];
    const emoji = itemData.emoji;

    const item = document.createElement('div');
    item.textContent = emoji;
    item.style.position = 'absolute';
    item.style.top = '-50px';
    item.style.fontSize = '24px';
    item.style.pointerEvents = 'none';

    // Random horizontal position
    const startX = Math.random() * window.innerWidth;
    item.style.left = `${startX}px`;

    overlay.appendChild(item);

    // Animate falling
    const duration = 3000 + Math.random() * 2000; // 3-5 seconds
    const endY = window.innerHeight + 50;

    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentY = progress * endY;
      const currentX = startX + Math.sin(progress * Math.PI * 4) * 50; // sway

      item.style.top = `${currentY}px`;
      item.style.left = `${currentX}px`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        overlay.removeChild(item);
      }
    }

    requestAnimationFrame(animate);
  }

  // Function to generate multiple falling items periodically
  let fallingInterval = null;

  function startFallingAnimation() {
    if (fallingInterval === null) {
      fallingInterval = setInterval(createFallingItem, 300);
    }
  }

  function stopFallingAnimation() {
    if (fallingInterval !== null) {
      clearInterval(fallingInterval);
      fallingInterval = null;
    }
  }

  // Initialize
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);

  // Optional: start the falling animation on page load
  startFallingAnimation();

  // Optional: toggle falling animation with a button or another event
  // For example, start/stop on long press, or with a specific key

})();