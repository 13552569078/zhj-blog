# 背景

我们做大模型应用的时候，往往需要处理大模型流式输出，一般是`md`格式的数据，不论是流式输出还是整体输出，我们需要呈现`md`格式文档。有些许的难点及痛点需要解决，比如

1.  如何展示`markdown`的格式
2.  如何美化`markdown`的格式
3.  如何在`markdown`中展示 `html` 结构
4.  如何在`markdown`中展示 `html` 结构，且触发对应的事件
5.  如何展示类似于`echarts`类似的图表

下面我们一一的展示，并给出实际的应用`demo`

## 初始化react 项目 并引入 Tailwind CSS

### vite 搭建react 项目

```js
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev
```

## 引入tailwindcss

### 安装依赖

```js
npm install tailwindcss@3 postcss autoprefixer -S
```

我使用的 `tailwindcss`版本是 `tailwindcss": "^3.4.17"`

###  初始化 Tailwind CSS

在项目根目录下运行以下命令来创建一个 `tailwind.config.js` 文件, 根目录多出 `postcss.config.js` 和`tailwind.config.js`两个文件

```js
npx tailwindcss init -p
```

### 配置 Tailwind CSS

`tailwind.config.js` 配置如下

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 配置 PostCSS

`postcss.config.js` 配置：

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

###  在项目中引入 Tailwind CSS

在你的 `src/index.css` 或相应的 CSS 文件中引入 Tailwind CSS：

```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```

###  使用 Tailwind CSS 类名

`app.jsx`使用 Tailwind CSS 的工具类

```js
function App() {
  return (
    <div className="bg-blue-500 text-white p-4 rounded">Hello, World!</div>
  );
}
```

### 运行你的项目

可以看见引入成功效果

```js
npm run dev
```

效果如下：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/22a53c730667465e9e5054fd31bbd2af~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071717&x-orig-sign=l%2B2qRkSY74Z50S6iibmEtJKxSno%3D)

项目搭建完成
也可以直接clone [项目地址](https://gitee.com/zhanghongjie1111/react-markdown.git) `master`分支

## react-markdown

### 引入并初步展示`md`文档

```js
npm i react-markdown -S
```

```js
import React from 'react';
import ReactMarkdown from 'react-markdown';

// 定义包含丰富 Markdown 元素的内容
const richMarkdownContent = `
# 一级标题：Markdown 丰富示例

## 二级标题：文本样式

这里展示了 **加粗**、*斜体* 和 ***加粗斜体*** 的文本样式。

## 二级标题：列表

### 无序列表
- 无序列表项 1
- 无序列表项 2
  - 子列表项 2.1
  - 子列表项 2.2
- 无序列表项 3

### 有序列表
1. 有序列表项 1
2. 有序列表项 2
   1. 子有序列表项 2.1
   2. 子有序列表项 2.2
3. 有序列表项 3

## 二级标题：超链接
这是一个 [指向百度的超链接](https://www.baidu.com)。

## 二级标题：表格
| 表头 1 | 表头 2 | 表头 3 |
| ---- | ---- | ---- |
| 单元格 1 | 单元格 2 | 单元格 3 |
| 单元格 4 | 单元格 5 | 单元格 6 |

### 三级标题：嵌套结构示例
可以在表格里嵌套列表，例如：

| 列表嵌套 | 详情 |
| ---- | ---- |
| 无序列表 | - 子项 1<br>- 子项 2 |
| 有序列表 | 1. 子项 A<br>2. 子项 B |
`;

const App = () => {
  return (
    <div>
      <h1>使用 react - markdown 渲染丰富 Markdown 内容</h1>
      <ReactMarkdown>
        {richMarkdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default App;
```

我们可以看见对应的`md`展示，效果如下

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/997a5774a9f14185b91bf4b8c32e8a3f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071717&x-orig-sign=EwMSihYYzvmo%2FYBV6sBR%2BuvmJ%2Bc%3D)
仅仅对于基础的做了展示，`表格 Ul ol 超链接`等 并不能很好的回显

### 样式美化

```js
npm install github-markdown-css -S
在包裹元素设置class类名 className="markdown-body" 必须设置
```

```js
import React from 'react';
import ReactMarkdown from 'react-markdown';
import "github-markdown-css"

// 定义包含丰富 Markdown 元素的内容
const richMarkdownContent = `
# 一级标题：Markdown 丰富示例

## 二级标题：文本样式

这里展示了 **加粗**、*斜体* 和 ***加粗斜体*** 的文本样式。

## 二级标题：列表

### 无序列表
- 无序列表项 1
- 无序列表项 2
  - 子列表项 2.1
  - 子列表项 2.2
- 无序列表项 3

### 有序列表
1. 有序列表项 1
2. 有序列表项 2
   1. 子有序列表项 2.1
   2. 子有序列表项 2.2
3. 有序列表项 3

## 二级标题：超链接
这是一个 [指向百度的超链接](https://www.baidu.com)。

## 二级标题：表格
| 表头 1 | 表头 2 | 表头 3 |
| ---- | ---- | ---- |
| 单元格 1 | 单元格 2 | 单元格 3 |
| 单元格 4 | 单元格 5 | 单元格 6 |

### 三级标题：嵌套结构示例
可以在表格里嵌套列表，例如：

| 列表嵌套 | 详情 |
| ---- | ---- |
| 无序列表 | - 子项 1<br>- 子项 2 |
| 有序列表 | 1. 子项 A<br>2. 子项 B |
`;

const App = () => {
  return (
    <div className="markdown-body">
      <h1>使用 react - markdown 渲染丰富 Markdown 内容</h1>
      <ReactMarkdown>
        {richMarkdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default App;
```

此时效果如下

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/e6fe365c23a24c53a04cfe9f8148f812~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071717&x-orig-sign=UTYE1t%2BqqTg6SQZtMGI12V0yZAs%3D)

可见`md`格式样式出现了，但是部分元素 如表格啥的还是无法展示

### 引入 remark-gfm

```js
npm i remark-gfm -S
```

```js
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import "github-markdown-css"

// 定义包含丰富 Markdown 元素的内容
const richMarkdownContent = `
# 一级标题：Markdown 丰富示例

## 二级标题：文本样式

这里展示了 **加粗**、*斜体* 和 ***加粗斜体*** 的文本样式。

## 二级标题：列表

### 无序列表
- 无序列表项 1
- 无序列表项 2
  - 子列表项 2.1
  - 子列表项 2.2
- 无序列表项 3

### 有序列表
1. 有序列表项 1
2. 有序列表项 2
   1. 子有序列表项 2.1
   2. 子有序列表项 2.2
3. 有序列表项 3

## 二级标题：超链接
这是一个 [指向百度的超链接](https://www.baidu.com)。

## 二级标题：表格
| 表头 1 | 表头 2 | 表头 3 |
| ---- | ---- | ---- |
| 单元格 1 | 单元格 2 | 单元格 3 |
| 单元格 4 | 单元格 5 | 单元格 6 |

### 三级标题：嵌套结构示例
可以在表格里嵌套列表，例如：

| 列表嵌套 | 详情 |
| ---- | ---- |
| 无序列表 | - 子项 1<br>- 子项 2 |
| 有序列表 | 1. 子项 A<br>2. 子项 B |
`;

const App = () => {
  return (
    <div className="markdown-body">
      <h1>使用 react - markdown 渲染丰富 Markdown 内容</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {richMarkdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default App;
```

效果如下：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a8f400beb77e46fa8a0f4fef4d03d8cf~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071717&x-orig-sign=kyZE9%2FztflBsXaGZ1gFzkdj29ig%3D)

表格已经展示，

### 展示 html结构

我们将代码做以下修改

```js
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import "github-markdown-css"

// 定义包含丰富 Markdown 元素的内容
const markdownContent = `
# 这是一个标题

这是一段包含 <span style="color: red;">HTML 标签</span> 的文本。
`;

const App = () => {
  return (
    <div className="markdown-body">
      <h1>使用 react - markdown 渲染丰富 Markdown 内容</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default App;
```

展示如下：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/0b78d9c97d4d46e486cf0a919668b0c8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071717&x-orig-sign=7L4jtHzYgXeZoa7XdAgRVxrE944%3D)

`html`结构没有展示

### 引入 rehype-raw

```js
npm i rehype-raw -S
```

代码做如下修改

```js
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "github-markdown-css"

// 定义包含丰富 Markdown 元素的内容
const markdownContent = `
# 这是一个标题

这是一段包含 <span style="color: red;">HTML 标签</span> 的文本。
`;

const App = () => {
  return (
    <div className="markdown-body">
      <h1>使用 react - markdown 渲染丰富 Markdown 内容</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default App;
```

效果如下：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/9cc394fd06c145caa75c0b9559fbcd53~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071717&x-orig-sign=SF5cvaeP2lQHUdOeJdJY28myJqo%3D)

## 总结

至此 我们基于 `react-markdown` 并引用 `remark-gfm` `rehype-raw` `github-markdown-css`来处理复杂`md`格式，处理`html`标签 和美化样式，以上是基础功能展示，分支是`dev1`，可以自行下载。后期的所有复杂功能 都基于此来实现

## 扩展

以下是 `react-markdown`、`remark-gfm`、`rehype-raw` 和 `github-markdown-css` 这几个库和插件的作用：

### 1. `react-markdown`

`react-markdown` 是一个用于在 React 应用中渲染 Markdown 内容的库。Markdown 是一种轻量级标记语言，使用简单的文本格式来创建富文本内容，例如标题、列表、链接等。`react-markdown` 可以将 Markdown 字符串转换为 React 组件，使得在 React 应用中显示 Markdown 内容变得非常方便。

### 2. `remark-gfm`

`remark-gfm` 是一个 `remark` 插件，用于支持 GitHub Flavored Markdown（GFM）。GFM 是 GitHub 对标准 Markdown 的扩展，增加了一些额外的功能，如表格、任务列表、自动链接等。

#### 作用

当你使用 `react-markdown` 渲染 Markdown 内容时，默认情况下可能不支持这些 GFM 特性。通过引入 `remark-gfm` 插件，可以让 `react-markdown` 能够正确解析和渲染这些扩展的 Markdown 语法。

### 3. `rehype-raw`

`rehype-raw` 是一个 `rehype` 插件，用于处理 Markdown 中的原始 HTML 内容。在 Markdown 中，有时会嵌入一些 HTML 标签，例如 `<div>`、`<span>` 等。默认情况下，`react-markdown` 可能会过滤掉这些原始 HTML 内容，以确保安全性。

#### 作用

使用 `rehype-raw` 插件可以让 `react-markdown` 解析并渲染这些原始 HTML 标签，使得 Markdown 中嵌入的 HTML 内容能够正常显示。

### 4. `github-markdown-css`

`github-markdown-css` 是一个 CSS 文件，它提供了与 GitHub 上 Markdown 内容相同的样式。当你在自己的应用中渲染 Markdown 内容时，使用这个 CSS 文件可以让渲染结果看起来与 GitHub 上的 Markdown 样式一致，包括标题、列表、代码块等的样式。

#### 作用

通过引入 `github-markdown-css`，可以让你的 Markdown 内容在视觉上更加美观和专业，同时保持与 GitHub 风格的一致性。

## 未完待续。。。 （自定义标签，事件触发，报表展示等等）
