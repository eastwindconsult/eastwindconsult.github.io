let btn = document.querySelector("#capture");

btn.addEventListener("click", async function () {
    // Load FFmpeg
    const { createFFmpeg, fetchFile } = FFmpeg;
    const ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();

    // Capture screen
    let stream = await navigator.mediaDevices.getDisplayMedia({
        video: true
    });

    // Record in webm format
    let mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm"
    });

    let chunks = [];
    mediaRecorder.addEventListener("dataavailable", function (e) {
        chunks.push(e.data);
    });

    mediaRecorder.addEventListener("stop", async function () {
        let video = document.querySelector("video");
        let blob = new Blob(chunks, { type: "video/webm" });
        let webmUrl = URL.createObjectURL(blob);
        video.src = webmUrl;

        // Convert webm to mp4 using FFmpeg
        const webmFile = new File([blob], "recording.webm");
        await ffmpeg.FS("writeFile", "recording.webm", await fetchFile(webmFile));

        await ffmpeg.run("-i", "recording.webm", "output.mp4");
        const mp4Data = ffmpeg.FS("readFile", "output.mp4");

        // Create a downloadable mp4 link
        const mp4Blob = new Blob([mp4Data.buffer], { type: "video/mp4" });
        const mp4Url = URL.createObjectURL(mp4Blob);
        const a = document.createElement("a");
        a.href = mp4Url;
        a.download = "recording.mp4";
        a.click();
    });

    // Start recording
    mediaRecorder.start();
});
