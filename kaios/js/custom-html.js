// Create the outer div
const outerDiv = document.createElement('div');
outerDiv.id = 'custom-div453';
outerDiv.style.width = '200px';
outerDiv.style.height = '200px';
outerDiv.style.border = '2px solid #333';
outerDiv.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
outerDiv.style.margin = '20px auto';
outerDiv.style.padding = '10px';
outerDiv.style.boxSizing = 'border-box';
outerDiv.style.backgroundColor = '#fafafa';

// Append the outer div to the body
document.body.appendChild(outerDiv);

// Create the inner container
const innerContainer = document.createElement('div');
innerContainer.id = 'inner-container';
innerContainer.style.width = '100%';
innerContainer.style.height = '100%';
innerContainer.style.overflow = 'auto';
innerContainer.style.border = '1px solid #666';
innerContainer.style.boxShadow = 'inset 0 0 5px rgba(0,0,0,0.2)';
innerContainer.style.backgroundColor = '#fff';

// Add some content to demonstrate overflow
innerContainer.innerHTML = `
  <p>Content inside container. Scroll to see overflow.</p>
  <p style="margin-top: 150px;">More content to make overflow visible.</p>
`;

// Append the inner container inside the outer div
outerDiv.appendChild(innerContainer);