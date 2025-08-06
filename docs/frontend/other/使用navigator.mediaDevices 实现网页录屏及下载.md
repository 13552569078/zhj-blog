## 借用navigator.mediaDevices前端网页录屏（全部录屏）及自动下载
##### html结构
1：navigator.mediaDevices.getDisplayMedia 来捕获屏幕或者窗口，如果是多屏幕会要你自行选择

2：浏览器兼容处理

3：mediaRecorder会分模块分流把录制视频返回，监听dataavailable事件，存储全部录制视频

4：监听stop事件，模拟下载视频

5：全部代码如下：
```
let btn = document.querySelector(".record-btn")

btn.addEventListener("click", async function () {
  let stream = await navigator.mediaDevices.getDisplayMedia({
    video: true
  })

  // 需要更好的浏览器支持
  const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9") 
             ? "video/webm; codecs=vp9" 
             : "video/webm"
    let mediaRecorder = new MediaRecorder(stream, {
        mimeType: mime
    })

    let chunks = []
    mediaRecorder.addEventListener('dataavailable', function(e) {
        chunks.push(e.data)
    })

   mediaRecorder.addEventListener('stop', function(){
      let blob = new Blob(chunks, {
          type: chunks[0].type
      })
      let url = URL.createObjectURL(blob)

      let video = document.querySelector("video")
      video.src = url

      let a = document.createElement('a')
      a.href = url
      a.download = 'video.webm'
      a.click()
  })


    // 必须手动启动
    mediaRecorder.start()
})
```



