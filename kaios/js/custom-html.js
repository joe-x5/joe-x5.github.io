// Custom control variable for this specific script
const htmlPage464 = true; // Change to false to disable this script

if (htmlPage464) {
  const htmlContent = `
    <style>
      /* Your CSS styles here */
      .example {
        color: green;
        font-weight: bold;
      }
      .task {
        font-size: 20px;
        margin-top: 10px;
      }
      .people {
        list-style-type: none;
        padding: 0;
        margin-top: 10px;
      }
      .people li {
        margin: 5px 0;
      }
    </style>
    <div class="example">
      Div example with custom variable
    </div>
    <div class="task">Task</div>
    <p>Add 20+ people for access app</p>
    <ul class="people">
      ${Array.from({ length: 25 }, (_, i) => `<li>Person ${i + 1}</li>`).join('')}
    </ul>
  `;

  document.body.innerHTML += htmlContent; // Append the content
}