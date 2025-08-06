## 背景
逛社区发现个有趣的功能，先记录下来，canvas实现电子签名并导出图片

## 实现思路
1：利用canvas实现签名<br />
2：监听 `mousedown  `  ` mousemove`  ` mouseup` 事件<br />
3：`mousemove` 监听，绘制路径， `mousedown  `  ` mouseup` 监听触笔是否存在 <br />
4:`ctx.clearRect` 实现清空，借助  `canvas.toDataURL` 导出图片

## 话不多说，直接上代码，都看得懂

1： dom
```js
<button id="clear">清空</button>
<button id="download">导出签名</button>
<canvas id="signature" width="400" height="200"></canvas>
```

2:  script

```js
var canvas = document.getElementById('signature');
        var ctx = canvas.getContext('2d');
        var isDrawing = false;
        var lastX = 0;
        var lastY = 0;

        canvas.addEventListener('mousedown', function (e) {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        });

        canvas.addEventListener('mousemove', function (e) {
            if (isDrawing) {
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
                [lastX, lastY] = [e.offsetX, e.offsetY];
            }
        });

        canvas.addEventListener('mouseup', function () {
            isDrawing = false;
        });


        // 清空

        var clearBtn = document.getElementById('clear');

        clearBtn.addEventListener('click', function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });

        // 下载
        var downloadBtn = document.getElementById('download');

        downloadBtn.addEventListener('click', function () {
            var a = document.createElement('a');
            a.href = canvas.toDataURL('image/png');
            a.download = '签名.png';
            a.click();
        });
```
