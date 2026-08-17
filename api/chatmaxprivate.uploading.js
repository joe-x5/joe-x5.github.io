// upload button 
const uploadButton = document.getElementById('uploadButton');

// Notification Div
const notificationDiv4634 = document.getElementById('uploadnotic453445');

//const messageInput = document.getElementById('messageInput');

// Create the overlay element dynamically
const uploadOverlay6454 = document.createElement('div');
uploadOverlay6454.id = 'uploadOverlay64546446';
uploadOverlay6454.style.cssText = `
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  font-weight: bold;
`;
uploadOverlay6454.innerText = 'Uploading processing...';
document.body.appendChild(uploadOverlay6454);

// Ensure notificationDiv4634 is hidden by default
notificationDiv4634.style.display = 'none';

uploadButton.addEventListener('click', () => {
  // Hide the notification initially
  notificationDiv4634.style.display = 'none';

  // Show the overlay
  uploadOverlay6454.style.display = 'flex';

  // Create an input element for file selection
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'video/*';

  // When a file is selected
  fileInput.onchange = () => {
    const file = fileInput.files[0];
    if (!file) {
      // Hide overlay if no file selected
      uploadOverlay6454.style.display = 'none';
      return;
    }

    // Keep overlay visible during upload
    // Show notificationDiv4634 (set display to block)
    notificationDiv4634.style.display = 'block';
    notificationDiv4634.innerHTML = '';

    // Prepare FormData
    const formData = new FormData();
    formData.append('file', file);

    // Create XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '//x0team.c0m.in/tools/files-saver-db/api.php', true);

    // Handle upload completion
    xhr.onload = () => {
      // Hide overlay after upload completes
      uploadOverlay6454.style.display = 'none';

      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText);
          if (response.status === 'success') {
            if (response.fileUrl) {
              const linkHTML = `<a href="${response.fileUrl}" target="_blank" style="padding: 2px; border-radius: 2px; border: 2px dotted red; color: green; font-weight: bold; box-shadow: 2px 2px 4px black;">View uploaded file 🗃️</a>`;
              // Assuming messageInput exists
              if (typeof messageInput !== 'undefined') {
                messageInput.value = linkHTML;
              }
              notificationDiv4634.innerHTML = '<div style="color: green;">Upload successful!</div>';
            } else {
              notificationDiv4634.innerHTML = '<div style="color: red;">Upload succeeded but no file URL received.</div>';
            }
          } else {
            notificationDiv4634.innerHTML = '<div style="color: red;">Upload failed: ' + (response.message || 'Unknown error') + '</div>';
          }
        } catch (e) {
          notificationDiv4634.innerHTML = '<div style="color: red;">Error parsing server response.</div>';
        }
      } else {
        notificationDiv4634.innerHTML = '<div style="color: red;">Upload failed with status ' + xhr.status + '</div>';
      }
    };

    xhr.onerror = () => {
      // Hide overlay on error
      uploadOverlay6454.style.display = 'none';
      notificationDiv4634.innerHTML = '<div style="color: red;">An error occurred during the upload.</div>';
    };

    xhr.send(formData);
  };

  // Trigger the file chooser
  fileInput.click();
});