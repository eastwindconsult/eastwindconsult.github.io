
let btn = document.querySelector("#capture")

btn.addEventListener("click", async function () {
   
  let stream = await navigator.mediaDevices.getDisplayMedia({
    video: true
  })
  
  let mediaRecorder = new MediaRecorder(stream, {
      mimeType: "video/webm"
  })

  let chunks = []
  mediaRecorder.addEventListener('dataavailable', function(e) {
      chunks.push(e.data)
  })

  mediaRecorder.addEventListener('stop', function(){
    let video = document.querySelector("video")
    video.src = URL.createObjectURL(new Blob(chunks, {
        type: chunks[0].type
    }))
    let a = document.createElement('a')
    a.href = video.src
    a.download = "forecast.webm"
    a.click()
  })

  mediaRecorder.start()
  
})
