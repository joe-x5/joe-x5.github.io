// script.js

(function() {
  const LONG_PRESS_DURATION = 3000; // 3 seconds
  const TARGET_KEY = '5'; // Key to detect
  let pressTimer = null;
  let isLongPress = false;

  // Load saved option or default to '0' (off)
  let currentOption = localStorage.getItem('kaios_option') || '0';
  let customName = localStorage.getItem('kaios_name') || '';

  // Define emojis or text options
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

  // Create overlay for falling items
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

  // Keydown handler
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

  // Keyup handler
  function handleKeyUp(e) {
    if (e.key === TARGET_KEY) {
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    }
  }

  // Function to open prompt menu
  function openMenu() {
    const menuText = `
Select Option:
0 - Off
00 - All
000 - Random
0000 - Enter Name / Special
1-20 - Specific Emojis
Current: ${currentOption}
Enter choice:
`;
    const choice = prompt(menuText, currentOption);
    if (choice !== null) {
      if (choice === '0000') {
        const name = prompt('Enter your name:', '');
        if (name !== null && name.trim() !== '') {
          localStorage.setItem('kaios_name', name.trim());
          alert('Name saved. Falling emojis with your name.');
          currentOption = 'name';
          localStorage.setItem('kaios_option', currentOption);
          customName = name.trim();
        }
      } else if (choice === '0' || choice === '00' || choice === '000') {
        // Save the choice
        localStorage.setItem('kaios_option', choice);
        currentOption = choice;
        alert('Option saved.');
      } else {
        const num = parseInt(choice, 10);
        if (!isNaN(num) && num >= 1 && num <= 20) {
          localStorage.setItem('kaios_option', choice);
          currentOption = choice;
          alert('Option saved.');
        } else {
          alert('Invalid choice');
        }
      }
    }
  }

  // Function to create falling item
  function createFallingItem() {
    let emoji = '';

    // Determine emoji or text
    if (currentOption === '0') {
      // Off
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
    } else if (currentOption === 'name' && customName !== '') {
      // Display name as falling text
      emoji = customName;
    } else {
      // Specific number 1-20
      const num = parseInt(currentOption, 10);
      emoji = itemsOptions[String(num)] || '✨';
    }

    // Create element
    const item = document.createElement('div');
    item.textContent = emoji;
    item.style.position = 'absolute';
    item.style.top = '-50px';
    item.style.fontSize = '24px';
    item.style.pointerEvents = 'none';

    const startX = Math.random() * window.innerWidth;
    item.style.left = `${startX}px`;

    overlay.appendChild(item);

    // Animate
    const duration = 3000 + Math.random() * 2000; // 3-5 sec
    const endY = window.innerHeight + 50;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentY = progress * endY;
      const sway = Math.sin(progress * Math.PI * 4) * 50;
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

  // Start/stop falling
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

  // Initialize falling
  startFalling();

})();