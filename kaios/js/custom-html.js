// Create the custom div with a specific ID
const customDiv = document.createElement('div');
customDiv.id = 'custom-div453';

// Style the div for responsiveness and appearance
customDiv.style.position = 'relative';
customDiv.style.width = '80%'; // Responsive width
customDiv.style.maxWidth = '400px'; // Max width on larger screens
customDiv.style.height = 'auto'; // Auto height based on content
customDiv.style.border = '2px solid #333';
customDiv.style.backgroundColor = '#fafafa';
customDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
customDiv.style.zIndex = '10';
customDiv.style.margin = '20px auto'; // Center horizontally
customDiv.style.padding = '10px';
customDiv.style.boxSizing = 'border-box';

// Add content inside the div
customDiv.innerHTML = `
  <h3>Custom Div</h3>
  <p>This div is responsive and compatible with KaiOS devices.</p>
`;

// Append the div to the body
document.body.appendChild(customDiv);