// script.js

(function() {
  const LONG_PRESS_DURATION = 3000; // 3 seconds
  const TARGET_KEY = '5'; // Key to detect (e.key == '5')
  let pressTimer = null;
  let isLongPress = false;

  // Load saved option or default to 0 (off)
  let currentOption = localStorage.getItem('kaios_option') || '0';

  // Define falling emoji options
  const itemsOptions = {
    '1': '❤️', // Heart
    '2': '🌸', // Flower
    '3': '🌹', // Rose
    '4': '🩲', // Panty
    '5': '😘', // Kiss
    '6': '🎂', // Cake
    '7': '⭐',
    '8': '✨',
    '9': '🌟',
    '10': '🌈',
    '11': '💖',
    '12': '🌻',
    '13': '🍭',
    '14': '🎉',
    '15': '🎈',
    '16': '🎁',
    '17': '🎵',
    '18': '🎶',
    '19': '🎺',
    '20': '🎸',
  };

  // Create overlay container for falling animations
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

  // Handle keydown for long press detection
  function handleKeyDown(e) {
    if (e.key === TARGET_KEY) {
      if (pressTimer === null) {
        isLongPress = false;
        pressTimer = setTimeout(() => {
          isLongPress = true;
          openMenu();
        }, LONG_PRESS_DURATION);
      }
    }
  }

  // Cancel long press if keyup before duration
  function handleKeyUp(e) {
    if (e.key === TARGET_KEY) {
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    }
  }

  // Function to open prompt menu for options
  function openMenu() {
    // Compose menu string
    const menuString = `
Select option:
0 - Off
00 - All
000 - Random
1-20 - Specific
Current: ${currentOption}
Enter choice:
`;
    // Show prompt
    const choice = prompt(menuString, currentOption);
    if (choice !== null) {
      // Validate choice
      const validChoices = ['0', '00', '000'];
      const numChoice = parseInt(choice, 10);
      if (validChoices.includes(choice)) {
        currentOption = choice;
        localStorage.setItem('kaios_option', currentOption);
      } else if (!isNaN(numChoice) && numChoice >= 1 && numChoice <= 20) {
        currentOption = choice;
        localStorage.setItem('kaios_option', currentOption);
      } else {
        // Invalid choice, keep previous
        alert('Invalid choice');
      }
    }
  }

  // Function to create a falling item
  function createFallingItem() {
    let emoji = '';

    // Determine emoji based on currentOption
    if (currentOption === '0') {
      // Off, do not create
      return;
    } else if (currentOption === '00') {
      // All options
      const keys = Object.keys(itemsOptions);
      const randKey = keys[Math.floor(Math.random() * keys.length)];
      emoji = itemsOptions[randKey];
    } else if (currentOption === '000') {
      // Random emoji
      const keys = Object.keys(itemsOptions);
      const randKey = keys[Math.floor(Math.random() * keys.length)];
      emoji = itemsOptions[randKey];
    } else {
      // Specific number 1-20
      const num = parseInt(currentOption, 10);
      emoji = itemsOptions[String(num)] || '✨';
    }

    // Create DOM element
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
    const duration = 3000 + Math.random() * 2000; // 3-5 sec
    const endY = window.innerHeight + 50;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentY = progress * endY;
      const sway = Math.sin(progress * Math.PI * 4) * 50; // sway
      item.style.top = `${currentY}px`;
      item.style.left = `${startX + sway}px`;
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        overlay.removeChild(item);
      }
    }

    requestAnimationFrame(animate);
  }

  // Periodically create falling items
  let fallingInterval = null;
  function startFalling() {
    if (fallingInterval === null) {
      fallingInterval = setInterval(createFallingItem, 300);
    }
  }
  function stopFalling() {
    if (fallingInterval !== null) {
      clearInterval(fallingInterval);
      fallingInterval = null;
    }
  }

  // Initialize event listeners
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);

  // Start falling animations
  startFalling();

  // Optionally, you can toggle falling animations with other events
})();