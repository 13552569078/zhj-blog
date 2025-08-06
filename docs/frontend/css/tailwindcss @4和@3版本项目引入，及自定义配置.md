## 背景

`tailwindcss`已经升级到@4版本，并且已经成为了默认的版本，较于`@3版本`引用及自定义配置均有了变化，下面我们就对比下这两个版本的引用不同点

本文已 `vue3 vite`框架来做试验

## vue3 vite  tailwindcss\@3 版本

### 初始化项目

```js
npm create vite@latest  --template vue
cd vue
npm install
npm run dev
```

### 安装tailwindcss\@3 和 postcss 引入

```js
npm install -D tailwindcss@3  postcss autoprefixer 
// 初始化引用
npx tailwindcss init -p
```

以上配置后，会在根目录生成 `postcss.config.js` `tailwind.config.js`,src目录下创建`index.css` `tailwind.css`

`postcss.config.js`配置如下

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

`tailwind.config.js`配置如下

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

`tailwind.css`配置如下

```js
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

```

`index.css`配置如下

```js
@import url('tailwind.css');
```

`main.ts引入 index.css`

```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 注意此处
import "./index.css"

createApp(App).mount('#app')

```

在`app.vue`中 写入tailwindcss 类名 即可，可以看见效果  如

```js
<div class="flex justify-center text-red-400">11111111</div>
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/78650da7cbb544b9acb1ecd31e192b80~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755070946&x-orig-sign=jN7txGB9b7XXr2meccXiEmRC9Uo%3D)

### 自定义tailwindcss配置

`tailwind.config.js`配置如下

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 自定义宽度类
      width: {
        ...Array.from({ length: 300 }, (_, i) => i + 1).reduce((acc, num) => {
          acc[num] = `${num}px`;
          return acc;
        }, {})
      },
      // 自定义高度类
      height: {
        ...Array.from({ length: 300 }, (_, i) => i + 1).reduce((acc, num) => {
          acc[num] = `${num}px`;
          return acc;
        }, {})
      },
      // 自定义 padding 类
      padding: {
        ...Array.from({ length: 150 }, (_, i) => i + 1).reduce((acc, num) => {
          acc[num] = `${num}px`;
          return acc;
        }, {})
      },
      // 自定义 margin 类
      margin: {
        ...Array.from({ length: 100 }, (_, i) => i + 1).reduce((acc, num) => {
          acc[num] = `${num}px`;
          return acc;
        }, {})
      },
      // 自定义 font-size 类
      fontSize: {
        ...Array.from({ length: 50 }, (_, i) => i + 1).reduce((acc, num) => {
          acc[num] = `${num}px`;
          return acc;
        }, {})
      }
    },
  },
  plugins: [],
};
```

以上配置 我们将`fontSize margin` 等改为了固定宽度，此时安装 `postcss-px-to-viewport`可以进行适配

```js
npm install postcss-px-to-viewport
```

`postcss.config.js`配置如下

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-px-to-viewport": {
      unitToConvert: "px", // 要转化的单位
      viewportWidth: 750, // UI设计稿的宽度
      unitPrecision: 6, // 转换后的精度，即小数点位数
      propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
      fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
      selectorBlackList: [], // 指定不转换为视窗单位的类名，
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      // replace: true, // 是否转换后直接更换属性值
      exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
      landscape: false // 是否处理横屏情况
    }
  },
}
```

我们写入css类别 ,查看适配已经配置完成

```js
  <div class="flex justify-center text-red-400 mr-20 w-100">11111111</div>
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/ab930680bf4f45b48264e939b67e957a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755070946&x-orig-sign=Wqv3BeqmyFsLtT4rGYUUVhvRS7U%3D)

## vue3 vite  tailwindcss\@4 版本

### 初始化项目

```js
npm create vite@latest  --template vue-2
cd vue
npm install
npm run dev
```

### 4版本采用插件安装

```js
npm install tailwindcss @tailwindcss/vite
```

`vite.config.ts配置如下`

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
});

```

`src`常见 `index.css`  并index.js 引入
`index.css` 配置如下

```js
@import "tailwindcss";
```

`app.vue`写入类名，效果如下已经引入

```js
<span class="flex text-red-400">tailwindcss4</span>
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/52d73da2e0ed4e14bac0c7c2f679d22c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755070946&x-orig-sign=yHGjRWyfz5Hsjs3TnMhij7yI3ho%3D)

### 自定义样式

`index.css`

```js
@import "tailwindcss";

@config "../tailwind.config.js";

```

添加 `tailwind.config.js` 配置如下

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 自定义宽度类
      width: {
        ...Array.from({ length: 300 }, (_, i) => i + 1).reduce((acc, num) => {
          acc[num] = `${num}px`;
          return acc;
        }, {})
      },
      // 自定义高度类
      height: {
        ...Array.from({ length: 300 }, (_, i) => i + 1).reduce((acc, num) => {
          acc[num] = `${num}px`;
          return acc;
        }, {})
      },
      // 自定义 padding 类
      padding: {
        ...Array.from({ length: 150 }, (_, i) => i + 1).reduce((acc, num) => {
          acc[num] = `${num}px`;
          return acc;
        }, {})
      },
      // 自定义 margin 类
      margin: {
        ...Array.from({ length: 100 }, (_, i) => i + 1).reduce((acc, num) => {
          acc[num] = `${num}px`;
          return acc;
        }, {})
      },
      // 自定义 font-size 类
      fontSize: {
        ...Array.from({ length: 50 }, (_, i) => i + 1).reduce((acc, num) => {
          acc[num] = `${num}px`;
          return acc;
        }, {})
      }
    },
  },
  plugins: [],
};
```

```js

  <span class="flex text-red-400 w-100">tailwindcss4</span>
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/318207b6a4354da8bb7a2f257b995209~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755070946&x-orig-sign=%2BO%2FHyurj2WHrY%2FJsP%2F045v5tfZw%3D)

postcss适配可以自行引入
