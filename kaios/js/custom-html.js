<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Custom Overlay Example</title>
</head>
<body>

<script>
const htmlPage353 = true; // Set to true to activate

if (htmlPage353) {
  document.addEventListener('DOMContentLoaded', () => {
    // Create and add CSS styles
    const styleContent = `
      /* Style for overlay with id 'customPage353' */
      #customPage353 {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background-color: rgba(255, 255, 255, 0.8);
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      /* Inner container styles */
      .customContainer {
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        max-width: 600px;
        width: 90%;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
      }
      /* Custom classes styles */
      .customExample {
        color: green;
        font-weight: bold;
        font-size: 24px;
        margin-bottom: 10px;
      }
      .customTask {
        font-size: 20px;
        margin-top: 10px;
        font-weight: bold;
      }
      .customPeople {
        list-style: none;
        padding: 0;
        margin-top: 10px;
      }
      .customPeople li {
        margin: 5px 0;
      }
    `;
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styleContent;
    document.head.appendChild(styleTag);

    // Create overlay div
    const overlayDiv = document.createElement('div');
    overlayDiv.id = 'customPage353';

    // Inner container for content
    overlayDiv.innerHTML = `
      <div class="customContainer">
        <div class="customExample">Div example with custom variable</div>
        <div class="customTask">Task</div>
        <p>Add 20+ people for access app</p>
        <ul class="customPeople">
          ${Array.from({ length: 25 }, (_, i) => `<li>Person ${i + 1}</li>`).join('')}
        </ul>
      </div>
    `;

    // Append overlay to body
    document.body.appendChild(overlayDiv);
  });
}
</script>

</body>
</html>