## 背景
在Web开发中，由于隐私和用户体验的考虑，现代浏览器对自动播放视频有诸多限制，尤其是当视频包含声音时。这些限制通常要求视频在页面上可见（即位于视口内），并且页面与用户有足够的交互（如用户已经与页面进行了点击或键盘交互）。


## 解决方案

1.  **确保视频静音自动播放**：  
    大多数浏览器允许静音视频自动播放。你可以在`<video>`标签中添加`muted`属性和`autoplay`属性来实现这一点。
1.  **通过用户交互触发播放**：  
    如果视频需要声音，你可能需要在用户与页面交互后（如点击一个按钮）再播放视频。
1.  **使用JavaScript监听页面交互**：  
    可以通过JavaScript监听页面上的点击或键盘事件，然后在这些事件发生时播放视频。

## 增加交互方案实现代码

我们借用`play()`方法会返回一个`Promise`对象，该对象会被`rejected`来动态显示友情提示，监听友情提示的操作来自动播放



```js

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
</head>

<body>
    <video id="myVideo" width="320" height="240" controls>
        <source src="movie.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
    <div id="playPrompt" style="display:none; color:red;">请点击播放视频。</div>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            var video = document.getElementById("myVideo");
            var playPrompt = document.getElementById("playPrompt");

            // 尝试自动播放视频  
            video.play()
                .then(() => {
                    // 如果视频成功自动播放，隐藏提示  
                    playPrompt.style.display = 'none';
                    console.log('Video is playing automatically.');
                })
                .catch(error => {
                    // 如果自动播放失败（通常是因为浏览器策略），显示提示  
                    playPrompt.style.display = 'block';
                    console.error('Failed to play video automatically:', error);

                    // 可以添加一个事件监听器，让用户点击提示来播放视频  
                    playPrompt.addEventListener('click', function () {
                        video.play()
                            .then(() => {
                                playPrompt.style.display = 'none'; // 视频播放后隐藏提示  
                            })
                            .catch(error => {
                                console.error('Failed to play video on click:', error);
                            });
                    });
                });

            // 注意：这里的自动播放尝试可能立即失败，因为大多数现代浏览器不允许在页面加载时自动播放带有声音的视频  
            // 除非视频是静音的，或者用户已经与页面进行了某种形式的交互（如点击）  
        });
    </script>
</body>

</html>
```

## 优化思路 
可以创建一个长度为`0`的音频或者视频小文件，动态创建播放标签，这样不至于每次都加载大视频，借助此判断整个网页是否可以自动播放，再根据逻辑展示友情提示即可

