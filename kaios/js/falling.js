// script.js

(function() {
  const LONG_PRESS_DURATION = 3000; // 3 seconds
  const TARGET_KEY = '5'; // Key to detect (e.key == '5')
  let pressTimer = null;
  let isLongPress = false;

  // Load saved option or default to '0' (off)
  let currentOption = localStorage.getItem('kaios_option') || '0';

  // Define emoji options
  const itemsOptions = {
    '1': '❤️',  // Heart
    '2': '🌸',  // Flower
    '3': '🌹',  // Rose
    '4': '🩲',  // Panty
    '5': '😘',  // Kiss
    '6': '🎂',  // Cake
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

  // Function to open prompt menu with options list
  function openMenu() {
    // Compose options list string
    let optionsList = '';
    for (const [key, emoji] of Object.entries(itemsOptions)) {
      optionsList += `${key} : ${emoji}\n`;
    }

    const menuText = `
Select option:
0 - Off (no animations)
00 - All emojis
000 - Random emoji
${optionsList}
Current selection: ${currentOption}
Enter your choice:
`;
    const choice = prompt(menuText, currentOption);
    if (choice !== null) {
      // Validate input
      if (['0', '00', '000'].includes(choice)) {
        // Valid special options
        currentOption = choice;
        localStorage.setItem('kaios_option', currentOption);
      } else if (!isNaN(parseInt(choice, 10)) && parseInt(choice, 10) >= 1 && parseInt(choice, 10) <= 20) {
        // Valid number 1-20
        currentOption = choice;
        localStorage.setItem('kaios_option', currentOption);
      } else {
        alert('Invalid choice! Please try again.');
      }
    }
  }

  // Function to create a falling emoji
  function createFallingItem() {
    let emoji = '';

    if (currentOption === '0') {
      // Off: do nothing
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

    // Create element for emoji
    const item = document.createElement('div');
    item.textContent = emoji;
    item.style.position = 'absolute';
    item.style.top = '-50px';
    item.style.fontSize = '24px';
    item.style.pointerEvents = 'none';

    // Random start position
    const startX = Math.random() * window.innerWidth;
    item.style.left = `${startX}px`;

    overlay.appendChild(item);

    // Animate fall
    const duration = 3000 + Math.random() * 2000; // 3-5 seconds
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

  // Start periodic creation of falling emojis
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

  // Event listeners
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);

  // Initiate falling animations
  startFalling();

})();