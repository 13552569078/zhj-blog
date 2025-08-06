##### 1：采用h5新增API navigator.clipboard.write来写入剪贴板
##### 2：本api设计到权限较大，所以部署只允许是https才可使用，当然本地环境可以调

##### 3：简单的复制文字
`navigator.clipboard.writeText('Linr Text to be copied')`
##### 4：复制图片  赋值图片目前我仅支持png类型，所以其他类型得图片需要转为png类型，本文章仅仅实现jpg文件转为png
##### 实现思路 1）：使用fetch 获取文件得bold流（如果服务器不支持fetch获取图片，请运维配置下ngnix

`location ^~ / {
            root   html;
            index  index.html index.htm;
        add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods 'GET,POST';
    add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
        }`
        
##### 5：如果是png则直接复制，如果不是则转为png
##### 6：写入剪贴板navigator.clipboard.write
##### 7：完整代码如下

`<script>
      copyImg = async url => {
        const src = url;
        const img = await fetch(src);
        const imgBlob = await img.blob();
        if (src.endsWith(".jpg") || src.endsWith(".jpeg")) {
          convertToPng(imgBlob);
        } else if (src.endsWith(".png")) {
          copyToClipboard(imgBlob);
        } else {
          console.error("Format unsupported");
        }
      };

      convertToPng = imgBlob => {
        const imageUrl = window.URL.createObjectURL(imgBlob);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const imageEl = createImage({ src: imageUrl });
        imageEl.onload = e => {
          canvas.width = e.target.width;
          canvas.height = e.target.height;
          ctx.drawImage(e.target, 0, 0, e.target.width, e.target.height);
          canvas.toBlob(copyToClipboard, "image/png", 1);
        };
      };

      createImage = options => {
        options = options || {};
        const img = Image ? new Image() : document.createElement("img");
        if (options.src) {
          img.src = options.src;
        }
        return img;
      };
      // 文本
      createTextBlob = text => {
        return new Blob([text], { type: "text/plain" });
      };

      copyToClipboard = pngBlob => {
        console.log(pngBlob);
        // const textBlob = createTextBlob("大家好222");
        try {
          navigator.clipboard.write([
            new ClipboardItem({
              [pngBlob.type]: pngBlob,
              // [textBlob.type]: textBlob
            })
          ]);
          console.log("Image copied");
        } catch (error) {
          console.error(error);
        }
      };
      // 复制图片
      copyImg(
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1089874897,1268118658&fm=26&gp=0.jpg"
      );
    </script>`
        