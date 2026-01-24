
window.onload = function() {
    // Function to request camera and microphone access
    function requestMediaAccess() {
        // Check for mediaDevices API support
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Modern browsers
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(function(stream) {
                    console.log('Permissions granted - stream obtained.');
                    // You can attach the stream to a video element if needed
                    // var video = document.querySelector('video');
                    // if (video) {
                    //     video.srcObject = stream;
                    //     video.play();
                    // }
                })
                .catch(function(error) {
                    console.error('Error accessing media devices.', error);
                });
        } else if (navigator.getUserMedia) {
            // Legacy browsers
            navigator.getUserMedia({ video: true, audio: true },
                function(stream) {
                    console.log('Permissions granted (legacy API).');
                },
                function(error) {
                    console.error('Error accessing media devices (legacy API).', error);
                }
            );
        } else if (navigator.webkitGetUserMedia) {
            // WebKit browsers
            navigator.webkitGetUserMedia({ video: true, audio: true },
                function(stream) {
                    console.log('Permissions granted (WebKit).');
                },
                function(error) {
                    console.error('Error accessing media devices (WebKit).', error);
                }
            );
        } else if (navigator.mozGetUserMedia) {
            // Firefox browsers
            navigator.mozGetUserMedia({ video: true, audio: true },
                function(stream) {
                    console.log('Permissions granted (Firefox).');
                },
                function(error) {
                    console.error('Error accessing media devices (Firefox).', error);
                }
            );
        } else {
            alert('getUserMedia not supported in this browser/device.');
        }
    }

    // Call the function on page load
    requestMediaAccess();
};
