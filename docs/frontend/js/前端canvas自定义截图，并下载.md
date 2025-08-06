### 背景
最近公司项目有一个需求，再一张图片上（这个图片可以是pdf，word等文件转义成的图片），用户可以自定义裁剪图片中的内容，前端将裁剪的图片传给后端，用于ocr识别，可以提取到此裁剪区域的文字等信息，用于下一步的业务流程（比如复制裁剪框中的文案等）

### 实现方案
借助canvas绘制图片和自定义裁剪框，保存为base64格式，也可以自定义下载，传给后端ocr。直接上代码了，注释的很详细，

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Canvas Screenshot</title>
    <style>
        canvas {
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <canvas id="myCanvas" width="500" height="500"></canvas>
    <img id="sourceImage" src="https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF" style="display: none;">

    <script>
        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');
        const sourceImage = document.getElementById('sourceImage');
        let startX, startY, isDragging = false;

        // 加载图片到Canvas  
        function loadImage() {
            sourceImage.onload = function () {
                ctx.drawImage(sourceImage, 0, 0, canvas.width, canvas.height);
            };
            // 处理下图片url
            const mysrc = 'https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF' + '?' + new Date().getTime();
            sourceImage.src = mysrc // 替换为你的图片URL  
            // 此操作是解决跨域 否则下一步的getImageData报错跨域
            sourceImage.setAttribute('crossOrigin', '');
        }

        // 监听鼠标事件  
        canvas.addEventListener('mousedown', function (e) {
            startX = e.offsetX;
            startY = e.offsetY;
            isDragging = true;
        });

        // 黄色内容均为黄色  两种截屏样式，自己采用合适的
        // canvas.addEventListener('mousemove', function (e) {
        //     if (!isDragging) return;
        //     ctx.clearRect(0, 0, canvas.width, canvas.height);
        //     ctx.drawImage(sourceImage, 0, 0, canvas.width, canvas.height);
        //      区域绘制成黄色
        //     ctx.globalAlpha = 0.5;
        //     ctx.fillStyle = 'yellow';
        //     ctx.fillRect(startX, startY, e.offsetX - startX, e.offsetY - startY);
        //     ctx.globalAlpha = 1;
        // });

        // 仅仅边框黄色 内容透明
        canvas.addEventListener('mousemove', function (e) {
            if (!isDragging) return;

            // 清除整个画布  
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 绘制原始图像  
            ctx.drawImage(sourceImage, 0, 0, canvas.width, canvas.height);

            // 设置填充样式为透明，绘制白色矩形覆盖选区内容  
            ctx.fillStyle = 'transparent';
            ctx.fillRect(startX, startY, e.offsetX - startX, e.offsetY - startY);

            // 设置边框样式  仅仅边框黄色 内容透明
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 2; // 边框宽度  

            // 绘制黄色边框，但仅在边缘，不覆盖整个选区  
            ctx.strokeRect(startX, startY, e.offsetX - startX, e.offsetY - startY);
        });

        canvas.addEventListener('mouseup', function (e) {
            if (!isDragging) return;
            isDragging = false;
            // 获取选择区域的图片  
            const selectionCanvas = document.createElement('canvas');
            const selectionCtx = selectionCanvas.getContext('2d');
            const imageData = ctx.getImageData(startX, startY, e.offsetX - startX, e.offsetY - startY);
            selectionCanvas.width = imageData.width;
            selectionCanvas.height = imageData.height;
            selectionCtx.putImageData(imageData, 0, 0);
            const selectionDataURL = selectionCanvas.toDataURL('image/png');

            // selectionDataURL是一个base 64格式的图片格式
            
            // 可下载，可传输后端， 
            
            // 创建一个用于下载的<a>标签  
            const downloadLink = document.createElement('a');
            downloadLink.href = selectionDataURL;
            downloadLink.download = 'screenshot.png'; // 设置下载文件名  

            // 为了防止页面跳转，阻止<a>标签的默认行为  
            downloadLink.style.display = 'none'; // 隐藏这个链接，因为我们不希望它在页面上可见  
            document.body.appendChild(downloadLink); // 将<a>标签添加到DOM中  

            // 模拟点击这个链接来触发下载  
            downloadLink.click();

            // 下载完成后，可以移除这个<a>标签  
            document.body.removeChild(downloadLink);
        });

        loadImage();  
    </script>
</body>

</html>
```