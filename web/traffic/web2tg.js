 // Your existing sendTelegramMessage function
  function sendTelegramMessage(text) {
    const botToken = '8909535161:AAF4d-hVXgpcYqaB1rA6ylGiZjzILLbOB7U';
    const chatId = '-1004454187572';
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}&parse_mode=HTML`;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Telegram message sent:', xhr.responseText);
        } else {
          console.error('Error sending Telegram message:', xhr.statusText);
        }
      }
    };
    xhr.send();
  }

  window.onload = function() {
    // Check multiple keys for username
    var userName =
      localStorage.getItem('userName') ||
      localStorage.getItem('username') ||
      localStorage.getItem('USERNAME') ||
      localStorage.getItem('UserName') ||
      'Unknown User';

    // Get current website URL
    var websiteUrl = window.location.href;

    // Create XMLHttpRequest to get IP
    var ipXhr = new XMLHttpRequest();
    ipXhr.open("GET", "https://api.ipify.org?format=json", true);
    ipXhr.onreadystatechange = function() {
      if (ipXhr.readyState === 4) {
        if (ipXhr.status === 200) {
          var response = JSON.parse(ipXhr.responseText);
          var userIp = response.ip;
          // Construct the message including website URL
          const message = `👤 : ${userName}\n📍: ${userIp}\n🌐: ${websiteUrl}\n<b>#Website User 🌐</b>`;
          // Send the message
          sendTelegramMessage(message);
        } else {
          console.error('Error fetching IP:', ipXhr.statusText);
          // Fallback if IP fetch fails
          const message = `👤 : ${userName}\n📍: IP not available\n🌐: ${websiteUrl}\n<b>#Website User 🌐</b>`;
          sendTelegramMessage(message);
        }
      }
    };
    ipXhr.send();
  };