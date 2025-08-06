## 产品需求，将一个带有纵向滚动得区域，保存为图片并下载
经过调研
1：借助html2canvas，将dom转为图片，借助a标签下载<br />
2：纵向滚动只能将目前可视区域转为图片，隐藏部分无法转义。解决办法：创建两个dom，一个dom有纵向滚动，用于页面展示；另一个dom用于html2canvas转义，需要将此dom 设置隐藏于本页面可视区域，采用css即可

```js
position: fixed; 
z-index: -100;
right: -1000px
```
## 安装html2canvas

```js
npm i html2canvas -S 
```
或者
```js
yarn add html2canvas
```
## 创建utils.ts 文件（公用函数抽离封装）

```js
import html2canvas from 'html2canvas';
/**
 * dom转为图片并下载
 * @param 
   dom:需要转移得DOM节点，如"#charts"
   Filename： 下载图片得名称
 */

const saveAsImgLoad = async(dom: string = '#charts', Filename: string = '统计') => {
  return html2canvas(document.querySelector(dom)!).then(canvas => {
    const imgUrl = canvas.toDataURL('image/jpeg');
    const image = document.createElement('img');
    image.src = imgUrl;
    const a = document.createElement('a');
    a.href = imgUrl;
    // 自定义图片的名称
    a.download = Filename;
    a.click();
  });
};
export { saveAsImgLoad }
```

## 组件使用

```js
import { saveAsImgLoad } from '@/utils.ts';

const load = async() => {
  await saveAsImgLoad('#chart', '分析统计');
};
```
注意，此处得#chart 为 需要html2canvas转义得无纵向滚动dom


