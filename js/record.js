// Options for MediaRecorder with MP4 support
const mediaRecorderOptions = {
  mimeType: 'video/mp4;codecs=h264,aac',
  videoBitsPerSecond: 2500000, // 2.5 Mbps
  audioBitsPerSecond: 128000   // 128 kbps
};

// Fallback options if MP4 is not supported
const fallbackOptions = [
  'video/webm;codecs=h264',
  'video/webm',
  'video/mp4'
];

// Get supported mime type
function getSupportedMimeType(options) {
  for (const type of options) {
    if (MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }
  return null;
}

let btn = document.querySelector("#capture");
btn.addEventListener("click", async function () {
  try {
    // Request screen capture
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        cursor: "always",
        frameRate: 30
      },
      audio: true
    });

    // Get supported mime type
    const mimeType = getSupportedMimeType([mediaRecorderOptions.mimeType, ...fallbackOptions]);
    
    if (!mimeType) {
      throw new Error('No supported mime type found for video recording');
    }

    // Initialize MediaRecorder with options
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: mimeType,
      videoBitsPerSecond: mediaRecorderOptions.videoBitsPerSecond,
      audioBitsPerSecond: mediaRecorderOptions.audioBitsPerSecond
    });

    const chunks = [];

    mediaRecorder.addEventListener('dataavailable', function(e) {
      chunks.push(e.data);
    });

    mediaRecorder.addEventListener('stop', async function() {
      // Stop all tracks
      stream.getTracks().forEach(track => track.stop());

      // Create blob and determine file extension
      const fileExtension = mimeType.includes('mp4') ? 'mp4' : 'webm';
      const blob = new Blob(chunks, { type: mimeType });
      
      // Create video preview
      const video = document.querySelector("video") || document.createElement("video");
      video.controls = true;
      video.src = URL.createObjectURL(blob);

      // Create download link
      const a = document.createElement('a');
      a.href = video.src;
      a.download = `forecast.${fileExtension}`;
      a.click();

      // Clean up
      URL.revokeObjectURL(video.src);
    });

    // Start recording
    mediaRecorder.start(1000); // Capture data in 1-second chunks

    // Add recording indicator
    const indicator = document.createElement('div');
    indicator.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: red;
      padding: 10px;
      border-radius: 5px;
      color: white;
      z-index: 9999;
    `;
    indicator.textContent = 'Recording...';
    document.body.appendChild(indicator);

    // Remove indicator when recording stops
    mediaRecorder.addEventListener('stop', () => indicator.remove());

  } catch (error) {
    console.error('Error during recording:', error);
    alert('Failed to start recording: ' + error.message);
  }
});
