(function() {
  // URL of your JSON config file hosted on GitHub
  const configUrl = 'https://joe-x5.github.io/kaios/js/ban.json';

  // URL to redirect if banned
  const banRedirectUrl = 'https://x0storekaios.iblogger.org/a/ban/';

  // Function to fetch JSON config
  function fetchConfig() {
    fetch(configUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(config => {
        checkBanStatus(config);
      })
      .catch(error => {
        console.error('Error fetching config:', error);
      });
  }

  // Function to get user's IP address
  function getUserIP() {
    return fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => data.ip)
      .catch(() => null);
  }

  // Function to get user's country via API
  function getCountry() {
    // Using a free API to get country info based on IP
    return fetch('https://ifconfig.co/json')
      .then(response => response.json())
      .then(data => data.country)
      .catch(() => null);
  }

  // Main function to check ban
  async function checkBanStatus(config) {
    try {
      const ip = await getUserIP();
      const country = await getCountry();

      if (config.bannedCountries && country) {
        if (config.bannedCountries.includes(country)) {
          window.location.href = banRedirectUrl;
          return;
        }
      }

      if (config.bannedIPs && ip) {
        if (config.bannedIPs.includes(ip)) {
          window.location.href = banRedirectUrl;
          return;
        }
      }
    } catch (e) {
      console.error('Error checking ban status:', e);
    }
  }

  // Check if script is active from JSON config
  function isScriptActive(config) {
    return config.active === true;
  }

  // Initialize
  fetch(configUrl).then(config => {
    if (isScriptActive(config)) {
      checkBanStatus(config);
    }
  });
})();