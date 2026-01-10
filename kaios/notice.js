// script.js

// Function to fetch notice from notice.json
function fetchNotice() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://joe-x5.github.io/kaios/notice.json', true);

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            const noticeData = JSON.parse(xhr.responseText);
            // Display notice in a prompt or a custom alert
            alert(noticeData.notice);
        } else {
            console.error('HTTP error! status:', xhr.status);
            alert('Failed to fetch the notice. Please try again later.');
        }
    };

    xhr.onerror = function() {
        console.error('Error fetching the notice');
        alert('Failed to fetch the notice. Please try again later.');
    };

    xhr.send();
}

// Call the function to fetch and display the notice
fetchNotice();
