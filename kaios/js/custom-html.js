const htmlPage353 = true; // Set to true to activate

if (htmlPage353) {
  document.addEventListener('DOMContentLoaded', () => {
    // Create and add CSS styles
    const styleContent = `    `;
    
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styleContent;
    document.head.appendChild(styleTag);

    // Create overlay div
    const overlayDiv = document.createElement('div');
    overlayDiv.id = 'customPage353';

    // Inner container for content
    overlayDiv.innerHTML = `
      <div class="customContainer">
      	
      <style>
      	
      
            /* Style for overlay with id 'customPage353' */
      #customPage353 {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        overflow: auto;
        background: none;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      

            
      /* Inner container styles */
      .customContainer {
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        width: 85%;
        border: 2px solid red;
        box-shadow: 2px 2px 10px rgba(0,0,0,0.3);
      }

</style>
      
<h1> Add 20+ People for access Apps</h1>
<p># share apps with 20+ people and Visit on <a href="http://x0.rf.gd">http://x0.rf.gd</a> Or Try to Connect on X0 Support.</p>
      </div>
    `;

    // Append overlay to body
    document.body.appendChild(overlayDiv);
  });
}


