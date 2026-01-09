// script.js

// Function to fetch notice from notice.json
async function fetchNotice() {
    try {
        const response = await fetch('https://joe-x5.github.io/kaios/notice.json');
        
        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const noticeData = await response.json();
        
        // Display notice in a prompt
        alert(noticeData.notice);
        
    } catch (error) {
        console.error('Error fetching the notice:', error);
        alert('Failed to fetch the notice. Please try again later.');
    }
}

// Call the function to fetch and display the notice
fetchNotice();
