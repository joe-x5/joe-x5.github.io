// Updated script with "All options" feature

(function() {
  const LONG_PRESS_DURATION = 3000; // 3 seconds
  const TARGET_KEY = '5'; // Key to detect
  let pressTimer = null;
  let isLongPress = false;

  // Load saved option or default to '0' (off)
  let currentOption = localStorage.getItem('kaios_option') || '0';

  // Load saved name if any
  let userName = localStorage.getItem('kaios_name') || '';

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

  // Debugging logs
  function log(msg) {
    console.log(msg);
  }

  // Handle keydown for long press detection
  function handleKeyDown(e) {
    if (e.key === TARGET_KEY) {
      log('Key down detected for 5');
      if (pressTimer === null) {
        isLongPress = false;
        pressTimer = setTimeout(() => {
          isLongPress = true;
          log('Long press detected, opening menu...');
          openMenu();
        }, LONG_PRESS_DURATION);
      }
    }
  }

  // Cancel long press if keyup before duration
  function handleKeyUp(e) {
    if (e.key === TARGET_KEY) {
      log('Key up detected for 5');
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
    optionsList += `0000 : Write your own name and start falling\n`;
    optionsList += `00 : All emojis (random from all)\n`;

    const displayOptionText = currentOption === 'name' ? `Name: ${userName}` : (currentOption !== '0' && currentOption !== '00' && currentOption !== '000' ? itemsOptions[currentOption] || '' : '');

    const menuText = `
Select option:
0 - Off (no animations)
00 - All emojis
000 - Random emoji
${Object.entries(itemsOptions).map(([k, e]) => `${k} : ${e}`).join('\n')}
0000 : Write your own name and start falling
00 : All emojis (random from all)
Current selection: ${currentOption}${displayOptionText !== '' ? ` (${displayOptionText})` : ''}${userName !== '' ? `, Name: ${userName}` : ''}
Enter your choice:
`;
    const choice = prompt(menuText, currentOption);
    if (choice !== null) {
      if (['0', '00', '000'].includes(choice)) {
        currentOption = choice;
        localStorage.setItem('kaios_option', currentOption);
      } else if (choice === '0000') {
        const name = prompt('Enter your name:');
        if (name !== null && name.trim() !== '') {
          userName = name.trim();
          localStorage.setItem('kaios_name', userName);
          currentOption = 'name';
          localStorage.setItem('kaios_option', currentOption);
        }
      } else if (!isNaN(parseInt(choice, 10)) && parseInt(choice, 10) >= 1 && parseInt(choice, 10) <= 20) {
        currentOption = choice;
        localStorage.setItem('kaios_option', currentOption);
      } else {
        alert('Invalid choice! Please try again.');
      }
    }
  }

  // Function to create a falling emoji or name
  function createFallingItem() {
    let displayText = '';

    if (currentOption === '0') {
      // Off: do nothing
      return;
    } else if (currentOption === '00') {
      // All options: pick random emoji
      const keys = Object.keys(itemsOptions);
      const randKey = keys[Math.floor(Math.random() * keys.length)];
      displayText = itemsOptions[randKey];
    } else if (currentOption === '000') {
      // Random emoji from all options
      const keys = Object.keys(itemsOptions);
      const randKey = keys[Math.floor(Math.random() * keys.length)];
      displayText = itemsOptions[randKey];
    } else if (currentOption === 'name' && userName !== '') {
      // Falling name
      displayText = userName;
    } else {
      // Specific emoji
      displayText = itemsOptions[currentOption] || '✨';
    }

    // Create element for emoji or name
    const item = document.createElement('div');
    item.textContent = displayText;
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

  // Start periodic creation of falling emojis or names
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

  // Start falling
  startFalling();

  // Debug message
  log('Script loaded. Long-press "5" to open menu.');

})();