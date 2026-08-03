  document.addEventListener("DOMContentLoaded", function() {
    var runUTCCheck = true; // Control switch

    if (!runUTCCheck) return;

    const STORAGE_KEY = 'bannedUTC';
    const BAN_DURATION = 24 * 60 * 60 * 1000; // 24 hours

    const bannedOffsets = {
      'PK': 5,   // Pakistan UTC+5
      'BD': 6    // Bangladesh UTC+6
    };

    // Check if user already flagged
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      try {
        const banData = JSON.parse(storedData);
        const now = Date.now();
        if ((banData.country && bannedOffsets[banData.country] !== undefined) &&
            (now - banData.timestamp) < BAN_DURATION) {
          // Still banned
          window.location.href = "https://joefunx.blogspot.com/2026/04/banned.html?m=1";
          return;
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (e) {
        console.error('Error parsing UTC ban data:', e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    // Check UTC offset
    function checkUTCOffset() {
      const offsetHours = new Date().getTimezoneOffset() / -60; // getTimezoneOffset returns minutes behind UTC
      // getTimezoneOffset returns negative for UTC+ zones, positive for UTC- zones
      // So, UTC+5 is -300 minutes, which is offsetHours = -5
      // Adjust accordingly:
      const userUTCOffset = -new Date().getTimezoneOffset() / 60; // Convert to positive for UTC+ etc.

      // Check against banned offsets
      for (const country in bannedOffsets) {
        if (bannedOffsets[country] === userUTCOffset) {
          // Store ban info
          localStorage.setItem(STORAGE_KEY, JSON.stringify({
            country: country,
            timestamp: Date.now()
          }));
          // Redirect
          window.location.href = "https://joefunx.blogspot.com/2026/04/banned.html?m=1";
          break;
        }
      }
    }

    checkUTCOffset();
  });