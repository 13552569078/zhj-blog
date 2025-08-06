## 背景
[掘金上看到文章](https://juejin.cn/post/7278245697173405730#heading-1)很有意思，借助vudio.js来实现，查看了下vudio.js插件，[此插件的npm地址](https://www.npmjs.com/package/vudio.js)，但是打开demo无法查看效果。<br />
遂自己引入，写了一个demo，将使用方式记录下，我用的是vue3+vite+ts,搭建项目请自行查找
## 如何使用

```js
npm i vudio.js --save
import Vudio from 'vudio.js'
``` 
此时报需要`declare module 'vudio.js`的，再根目录下创建 xxx.d.tx 并申明

```js
declare module 'vudio.js'
```

## 具体代码如下

```js


<template>
  <div>
    <canvas width="256px" height="100px" id="canvas" ref="canvasObj"></canvas>
    <audio src="../assets/mp3/dujiajiyi.mp3" id="audio" controls autoplay />
    <button @click="play">播放</button>
  </div>
</template>
<script setup lang="ts">
import Vudio from 'vudio.js'

const play = () => {
  var audioObj = document.querySelector('#audio');
  var canvasObj = document.querySelector('#canvas');
  (audioObj as any).play();
  var vudio = new Vudio(audioObj, canvasObj, {
    effect: 'waveform', // 当前只有'waveform'这一个效果，哈哈哈
    accuracy: 128, // 精度,实际表现为波形柱的个数，范围16-16348，必须为2的N次方
    width: 256, // canvas宽度，会覆盖canvas标签中定义的宽度
    height: 100, // canvas高度，会覆盖canvas标签中定义的高度
    waveform: {
      maxHeight: 80, // 最大波形高度
      minHeight: 1, // 最小波形高度
      spacing: 1, // 波形间隔
      color: '#f00', // 波形颜色，可以传入数组以生成渐变色
      shadowBlur: 0, // 阴影模糊半径
      shadowColor: '#f00', // 阴影颜色
      fadeSide: true, // 渐隐两端
      horizontalAlign: 'center', // 水平对齐方式，left/center/right
      verticalAlign: 'middle' // 垂直对齐方式 top/middle/bottom
    }
  });

  // 调用dance方法开始得瑟吧
  vudio.dance();

}


</script>

```

## 效果

![微信截图_20230914170356.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/319138ed8fe044a6bca4b1af271e69a2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=965&h=394&s=12162&e=png&b=fffefe)

## 注意
1：MP3文件可以自行查找，如网易云就可以下载<br />
2：在button中触发播放，则是浏览器限制，需要手动触发，否则无法自动播放音频（当然 也可试试静音能否自动播放）<br />
3：可更改可视化的颜色<br />

```js
// 中途换个姿势得瑟也是可以的
vudio.setOption({
    waveform : {
        color : '#06f',
        verticalAlign: 'bottom'
    }
});
```


