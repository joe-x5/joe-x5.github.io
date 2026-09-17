// Your existing sendWeb2TelegramMessage function
function sendWeb2TelegramMessage(text) {
    const botToken = '8909535161:AAF4d-hVXgpcYqaB1rA6ylGiZjzILLbOB7U';
    const chatId = '-1003947121703';
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

    // Get User Agent
    var userAgent = navigator.userAgent;

    // Create XMLHttpRequest to get IP and location details
    var ipXhr = new XMLHttpRequest();
    ipXhr.open("GET", "https://ipapi.co/json/", true);
    ipXhr.onreadystatechange = function() {
      if (ipXhr.readyState === 4) {
        if (ipXhr.status === 200) {
          var response = JSON.parse(ipXhr.responseText);
          var userIp = response.ip;
          var city = response.city || 'Unknown';
          var region = response.region || 'Unknown';
          var country = response.country_name || 'Unknown';
          var isp = response.org || 'Unknown';
          
          // Construct the message with IP and location details
          const message = `👤 : ${userName}\n📍: ${userIp}\n🌆: ${city}, ${region}, ${country}\n🏢: ${isp}\n🌐: ${websiteUrl}\n📱 : ${userAgent}\n<b>#Website User 🌐</b>`;
          // Send the message
          sendWeb2TelegramMessage(message);
        } else {
          console.error('Error fetching IP:', ipXhr.statusText);
          // Fallback if IP fetch fails
          const message = `👤 : ${userName}\n📍: IP not available\n🌐: ${websiteUrl}\n📱 : ${userAgent}\n<b>#Website User 🌐</b>`;
          sendWeb2TelegramMessage(message);
        }
      }
    };
    ipXhr.send();
};