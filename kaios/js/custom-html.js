const htmlPage353 = true; // toggle as needed

if (htmlPage353) {
  document.addEventListener('DOMContentLoaded', () => {
    // Create style element with all custom CSS
    const styleContent = `
      /* Overlay styles for id 'customPage353' */
      #customPage353 {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background-color: rgba(255, 255, 255, 0.8);
        overflow: auto;
      }
      /* Inner content styles */
      .customExample {
        color: green;
        font-weight: bold;
      }
      .customTask {
        font-size: 20px;
        margin-top: 10px;
      }
      .customPeople {
        list-style-type: none;
        padding: 0;
        margin-top: 10px;
      }
      .customPeople li {
        margin: 5px 0;
      }
    `;

    // Create style tag and add styles
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styleContent;

    // Create overlay div with id 'customPage353'
    const overlayDiv = document.createElement('div');
    overlayDiv.id = 'customPage353';

    // Set inner HTML content
    overlayDiv.innerHTML = `
      <div class="customExample">Div example with custom variable</div>
      <div class="customTask">Task</div>
      <p>Add 20+ people for access app</p>
      <ul class="customPeople">
        ${Array.from({ length: 25 }, (_, i) => `<li>Person ${i + 1}</li>`).join('')}
      </ul>
    `;

    // Append style and overlay to body
    document.body.appendChild(styleTag);
    document.body.appendChild(overlayDiv);
  });
}