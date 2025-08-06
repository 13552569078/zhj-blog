## 背景

上一篇文章 我们基于 `react-markdown` 并引用 `remark-gfm` `rehype-raw` `github-markdown-css`来处理复杂`md`格式，处理`html`标签 和美化样式，本篇章我们来实现自定义标签和事件触发

## 场景

举例：例如后端跟我们约定，他们流式返回数据，我们接到后拼装展示，但是有一些特殊标识，比如说**引用**，类似于参考文献，一般是右上角上标，点击会跳转详情或者其他操作

这里我们就需要，自定义标签，并需要触发事件，暂定 我们约定 后端返回的数据特殊格式如下， 第一个是引用的顺序，第二个是引用的id

```js
[[1,'引用1的id']]
```

我们需要判定此格式，转为 `sup`标签，并自定义样式，点击的时候，需要将id传过去，触发事件

## 实现方案

### 1：原始效果及展示

以上规则，demo代码及展示如下

```js
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "github-markdown-css"

const richMarkdownContent = `
# 一级标题：Markdown 丰富示例 [[1,'我是1的id']]

## 二级标题：Markdown 丰富示例 [[1,'我是1的id']]

### 三级标题：Markdown 丰富示例 [[1,'我是1的id']]
`;

const App = () => {
  return (
    <div className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {richMarkdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default App;
```

效果：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/e38982a8698f486cad69e454a0db1cd4~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071753&x-orig-sign=wAqmNKizXqX9JSxVwEdK2lwIyw0%3D)

如果我们不处理，则按照字符串展示

现在我们按需截取特殊约定字符

### 2: 正则截取

正则截取，我们将顺序回显，id作为自定义属性添加到元素上，借助`rehype-raw`渲染出来自定义的标签，注意自定义属性data-supid

```js
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "github-markdown-css"

const richMarkdownContent = `
# 一级标题：Markdown 丰富示例 [[1,'我是1的id']]

## 二级标题：Markdown 丰富示例 [[1,'我是1的id']]

### 三级标题：Markdown 丰富示例 [[1,'我是1的id']]
`;

const replaceReferences = (str)=> {
  // 定义正则表达式
  const regex = /\[\[(\d+),'(.*?)'\]\]/g;

  // 使用 replace 方法进行全局替换
  return str.replace(regex, (match, num, id) => {
      return `<sup className="text-active cursor-pointer" data-supid="${id}">[${num}]</sup>`;
  });
}

const regStr = replaceReferences(richMarkdownContent)

const App = () => {
  return (
    <div className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {regStr}
      </ReactMarkdown>
    </div>
  );
};

export default App;
```

此时效果如下，

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/d441d4c08dbe4fdab00252eadb08e16b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071753&x-orig-sign=5CwFWwaOZQ3PObEzdJrNSFmWMCY%3D)

### 3：美化样式

对于创建的元素，可以使用tailwindcss 修改样式，或者其他自定义样式均可，和普通`html`样式样式无异

```js
const replaceReferences = (str)=> {
  // 定义正则表达式
  const regex = /\[\[(\d+),'(.*?)'\]\]/g;

  // 使用 replace 方法进行全局替换
  return str.replace(regex, (match, num, id) => {
      return `<sup className="text-blue-600 cursor-pointer" data-supid="${id}">[${num}]</sup>`;
  });
}
```

注意`text-blue-600`颜色设置，现在效果展示如下

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/c59c8ce5770e401780cc984b33314fc8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071753&x-orig-sign=OarHb3q%2FG8i%2BTWLEpOSukvK%2FkDk%3D)

### 4：自定义事件触发

借助`react-markdown`的 `components`来自定义标签

```js
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "github-markdown-css"

const richMarkdownContent = `
# 一级标题：Markdown 丰富示例 [[1,'我是1的id']]

## 二级标题：Markdown 丰富示例 [[2,'我是2的id']]

### 三级标题：Markdown 丰富示例 [[3,'我是3的id']]
`;

const replaceReferences = (str) => {
  // 定义正则表达式
  const regex = /\[\[(\d+),'(.*?)'\]\]/g;

  // 使用 replace 方法进行全局替换
  return str.replace(regex, (match, num, id) => {
    return `<sup className="text-blue-600 cursor-pointer" data-supid="${id}">[${num}]</sup>`;
  });
}

const regStr = replaceReferences(richMarkdownContent)

// 自定义渲染器
const components = {
  sup: ({ children, ...rest }) => {
    return (
      <sup className="text-active" onClick={(event) => handleSupClick(event)} {...rest}>
        {children}
      </sup>
    );
  },
};

// 点击事件处理函数
const handleSupClick = (event) => {
  const supid = event.target.dataset.supid;
  console.log("Clicked sup data-supid:", supid);
  // 你可以在这里进行其他操作，比如将内容传递给父组件等
};

const App = () => {
  return (
    <div className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
        {regStr}
      </ReactMarkdown>
    </div>
  );
};

export default App;
```

1.  **`components` 对象中的 `sup` 组件**：

    *   在 `onClick` 事件处理函数中，将事件对象 `event` 传递给 `handleSupClick` 函数。
    *   使用扩展运算符 `...rest` 传递其他属性，确保 `data-supid` 属性被正确传递。

2.  **`handleSupClick` 函数**：

    *   通过 `event.target.dataset.supid` 获取自定义属性 `data-supid` 的值。

    *   打印获取到的值，你可以在这里进行其他操作，比如将内容传递给父组件等。

这样，当你点击 `sup` 元素时，就可以获取到自定义属性 `data-supid` 的值了。

此时的展示及展示效果如下

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/26c42f76769e4989a1938413829d293d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071753&x-orig-sign=eDqOjtqgNS2p6sy0Rwrni2tKad4%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b57607eab71b4deebee3b91089145b2d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071753&x-orig-sign=s0GzsRN%2BKjvsFF1mm%2FoaIeortEc%3D)

## 总结

这篇文章 我们基于自定义的`sup`标签，借助自定义`components`，结合正则来实现了文章前期的需求，可以发现功能很强大，对于多数其他标签有更特殊的需求，可以自己来实现，一家之言，有需要的按需取舍，你也可以下载项目[项目地址 ](https://gitee.com/zhanghongjie1111/react-markdown) `dev2`分支

## 未完待续。。。
