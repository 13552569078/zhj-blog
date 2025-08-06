#### vitrpress是什么
不同于vuepress是基于Webpack构建，vitepress基于vite搭建，启动更快，配置更少，热更新更快，更适合于结合vue3快速搭建文档库或者博客，本文章适用于新入手vitePress搭建者，至于如何发布自己的组件库或者如何在组件库中搭建发布文档，则在后续文章提供。
#### 要我们开始吧
##### 首先创建一个项目
1. `mkdir vitepress-starter && cd vitepress-starter`
2. `npm init`
3. `npm i --dev vitepress vue`
4. `mkdir docs && echo '# Hello VitePress' > docs/index.md`

以上我们创建了一个vitepress-starter文件夹，在vitepress-starter文件夹下面创建了docs文件，docs文件创建了index.md的md文档并输入了一个标题hello vitepress

`package.json`添加以下scripts

```js
{
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:serve": "vitepress serve docs"
  }
}
```
启动文档网站的本地服务器
`npm run docs:dev`

VitePress 将在 `http://localhost:5173` 启动一个本地开发服务器。

此时项目结构为
![2.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4a8f047db874a28bc1b159e7c7f12c2~tplv-k3u1fbpfcp-watermark.image?)

预览为

![1.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b6a1d3e7e944dc7a925cd2211f1e471~tplv-k3u1fbpfcp-watermark.image?)

##### 我们做下配置，自定义站点
vitepree的所有配置均在.vitepress中，放置所有 VitePress 特定文件的地方，首先在docs文件下创建.vitepress文件夹，.vitepress文件夹下创建config.js，config.js配置文件，所有定制化均在此文件
。`.vitepress/config.js`，它应该导出一个 JavaScript 对象
##### 自定义标题

```js
export default {
    themeConfig: {
        siteTitle: 'My Custom Title'
    }
  }
```
此时文档的标题已经替换，如未替换重启下项目

![3.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2cfb04b24f84473b3b1a8bdb0b508df~tplv-k3u1fbpfcp-watermark.image?)

##### 自定义icon
docs文件夹下创建public文件夹，此public文件夹是存放所有静态文件的地方，添加一个logo.png，

```js
export default {
    themeConfig: {
        siteTitle: 'My Custom Title',
        logo: '/logo.png', 
    }
  }
```
注意：`logo: '/logo.png', ` '/'开头 路径为public路径，

此时logo在文档库已经添加

![4.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/254754b3518740e6868c2d3983ab4d05~tplv-k3u1fbpfcp-watermark.image?)

##### 创建nav bar，创建顶部导航
顶部导航同样需要在`.vitepress/config.js`设置，我们我们单独将nav抽离出来，方便维护，在.vitepress下创建`nav.js`文件

```js
export const nav = [
    { text: 'Javascript', link: '/Javascript/', activeMatch: '/Javascript' }, // 匹配Javascript文件夹下面index.md
    { text: 'Html', link: '/Html/' , activeMatch: '/Html'}, // 匹配Html文件夹下面index.md
    { text: 'Baidu', link: 'https://baidu.com/' }, // 第三方链接
    {text:'css' , items: [{ text: 'css3', link: '/css3/' }]} // 可嵌套二级导航
]
```
含义：
text为nav导航的文案

link为链接地址，绝对路径会跳转第三方，/Javascript/会在doc为根目录查找对应文件夹下的index.md

导航可多层嵌套注意嵌套格式
由于link到docs对应文件夹目录下面的index.md，我们在docs创建对应的文件夹及index.md，目前文档结构为

![5.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b259f29bb73b4350b470a1524a768632~tplv-k3u1fbpfcp-watermark.image?)

`config.js`配置nav导航

```js
import { nav } from "./nav"

export default {
    themeConfig: {
        siteTitle: 'My Custom Title', // 标题
        logo: '/logo.png', // logo
        nav: nav, // 顶部导航 可多层嵌套 
    }
  }
```
此时文档预览已有nav导航，（未变化重启项目，后面不再赘述）
此时预览为

![6.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6478d0b3db4d444c880b9098af2fd231~tplv-k3u1fbpfcp-watermark.image?)

##### 创建sidebar 导航，我们的需求是根据nav导航，对应展示不同的sidebar
`.vitepress/config.js`创建`sidebar.js`

```js
export const sidebar = {
    '/Javascript': [
        {
          text: 'Javascript',
          items: [
            // This shows `/Javascript/index.md` page.
            { text: 'Javascript1', link: '/Javascript/' }, // /Javascript/index.md
            { text: 'Javascript2', link: '/Javascript/index2' }
          ]
        },
      ],
      '/Html': [
        {
          text: 'Html',
          items: [
            // This shows `/Html/index.md` page.
            { text: 'Html1', link: '/Html/' }, // /config/index.md
            { text: 'Html2', link: '/Html/index2' },
          ]
        }
      ],
      '/css': [
        {
          text: 'css',
          items: [
            { text: 'css3', link: '/css3/' },
          ]
        }
      ]
}
```
根据sidebar.js对应的文档结构，在docs创建对应的文档，否则404

`config.js`配置sidebar导航

```js
import { nav } from "./nav"
import { sidebar } from "./sidebar"

export default {
    themeConfig: {
        siteTitle: 'My Custom Title', // 标题
        logo: '/logo.png', // logo
        nav: nav, // 顶部导航 可多层嵌套 
        sidebar: sidebar, // 侧边栏 数组对象两种方式 对象根据顶部导航显隐  数组则全部展示
    }
  }
```
此时文档可根据nav导航，切换对应的sidebar导航，sidebar同样会链接到不同md文档。

**此时基础的文档已经形成接下来我们完善下**

##### 修改home页面，
vitepress提供了三种页面布局doc page home,

`docs index.md`文件做以下修改

```js
---
layout: home

hero:
  name: VitePress
  text: Vite & Vue powered static site generator.
  tagline: Lorem ipsum...
  image:
    src: /logo.png
    alt: VitePress
  actions:
    - theme: brand
      text: Get Started
      link: /guide/what-is-vitepress
    - theme: alt
      text: View on GitHub
      link: https://github.com/vuejs/vitepress

features:
  - icon: ⚡️
    title: Vite, The DX that can't be beat
    details: Lorem ipsum...
  - icon: 🖖
    title: Power of Vue meets Markdown
    details: Lorem ipsum...
  - icon: 🛠️
    title: Simple and minimal, always
    details: Lorem ipsum...
---
```
此时首页已发生变化，（点击Logo可返回首页），此时首页预览为

![7.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d27a6f46abab4a79b8f2c9f27a092fdb~tplv-k3u1fbpfcp-watermark.image?)

首页我们已经优化，接下来可进行md文档优化，现在仅仅是输出文案，md语法可以掌握下
我们在`javascript index.md`增加下md语法
##### 链接

```js
[首页](/) <!-- 点击跳转到 根目录的 index.md -->

[Html](/Html/) <!-- 点击跳转到 Html 目录的 index.html -->
```
##### 表格

```js
| aa        | bb           | cc  |
| ------------- |:-------------:| -----:|
|11      | 44 | 66 |
| 222      | 44      |   666 |
| 333 | 444      |    666 |
```
##### 标题

```js
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to view the code
```js
console.log('Hello, VitePress!')
```
[其余可参考md语法](https://vitejs.cn/vitepress/guide/markdown.html)

##### 其余配置

```js
import { nav } from "./nav"
import { sidebar } from "./sidebar"

export default {
    themeConfig: {
        siteTitle: 'My Custom Title', // 标题
        logo: '/logo.png', // logo
        nav: nav, // 顶部导航 可多层嵌套 
        sidebar: sidebar, // 侧边栏 数组对象两种方式 对象根据顶部导航显隐  数组则全部展示
        // lastUpdatedText: '上次更新时间', //最后更新时间文本 根据git提交具体时间 展示时间更新信息
        markdown: {
            lineNumbers: true
          },
        docFooter: {  //上下篇文本 文案修改
            prev: '上一篇',
            next: '下一篇'
        },
        editLink: { // 在 github 上编辑此页
            pattern: 'https://github.com/XXXXXXXXXX',
            text: '在 github 上编辑此页'
        },
        footer: { // 首页底部 文案
            copyright: 'Copyright © 2021-present Younglina'
        },
        socialLinks: [     // 信息栏展示社交信息 链接博客地址等
            { icon: 'github', link: "https://github.com/XXXXXXXXXX" },
        ]
    }
  }
```

参考文档[中文文档](https://vitejs.cn/vitepress/)





