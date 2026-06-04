document.addEventListener("DOMContentLoaded", function() {
    // Use runBannedCountry99 to control the script execution
    var runBannedCountry99 = true; // Set to true to enable the script

    if (!runBannedCountry99) {
      // If runBannedCountry99 is false, do not proceed
      return;
    }

    // Function to perform geolocation check
    function checkUserLocation() {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "https://ipapi.co/json/", true); // Using ipapi.co for geolocation
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          try {
            var response = JSON.parse(xhr.responseText);
            var country = response.country_code;

            if (country === "PK" || country === "BD") {
              // If from Pakistan or Bangladesh
              window.location.href = "https://joefunx.blogspot.com/2026/04/banned.html";
            }
            // No other redirects
          } catch (e) {
            // Handle errors if needed
          }
        }
      };
      xhr.send();
    }

    checkUserLocation();
  });
