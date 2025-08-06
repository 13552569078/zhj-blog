## 背景

大模型如火如荼，作为公司的边角料，一个不起眼得小渣渣前端切图仔，我们如何在不启动后端服务得情况下，快如入门调用大模型，本文就是来扫盲的，文章末尾有源码可以自行查看

## 技术栈

我制作的demo比较简陋，也就不到半天时间，基于 `react@18`  `tailwindcss@3`  `vite`   `ract-marndown`等来搞的，代码简单，主要是熟悉流程，先看实现的截图及视频，如果不满足要求，可以直接关闭文章，免得浪费时间

## demo功能介绍

1.  流式调用deeepseek v3
2.  增加会话历史主页面等布局
3.  支持`md`文本展示
4.  支持`table` `ul` `link`等特殊 `md`展示
5.  支持`html`结构回显
6.  封装了包括`chat-input` `用户问答` `AI回复` `md展示`等组件
7.  优化了支持`html`的空白间隙问题
8.  代码的 `copy` 功能
    话不多说，看下面的截图及视频展示

## demo展示

![微信截图\_20250415094058.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/ff4c82047d484eecaa739daca04f929d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071525&x-orig-sign=jz2gIIH5Npku28ADah%2FzvvNdNRg%3D)

<hr />

![微信截图\_20250415094108.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/eac749cc8dea43afab4d69255c1939f1~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071525&x-orig-sign=w%2F%2F%2FcmKe8rs47CZywZscOHfLa8o%3D)

<hr />

![微信截图\_20250415094120.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/15417ebb5e39450597c4178f68c98619~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071525&x-orig-sign=XhEVTw52v9vrK09L%2BQET%2FhwqAOc%3D)

<hr />

## 实现步骤

### 注册deepseek api key

[deepseek API开放平台 ](https://www.deepseek.com/)

### 充值至少十块钱

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/492bb852a2214c98a373f97889f2bc08~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071525&x-orig-sign=%2BJ%2BtwXfttFPRWnFZIDjgwIW0YtE%3D)

### 写入api key

`clone`代码后，将 `.env`文件 的 `VITE_DEEPSEEK_KEY` 替换成你自己的

### 项目启动

```js
npm i
npm run dev
```

### 测试问答

你可以在问答框输入以下问题 看支持的情况如何

1.  你是什么模型 （测试md纯文本的）
2.  写一段js去重的代码
3.  帮我生成一个三行三列的表格，用于计算姓名和成绩

## 提示

`deepseek`有提示

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a624745545a843e5b58b9bf3e1fd8299~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071525&x-orig-sign=7z3AroWTNQCGE2%2BbJZbEzosbvgI%3D)，请创建后，很好的保存你得key，不要外泄

## 核心代码介绍

### openai SDK

任何大模型 的接口都兼容 `openai`的规范，我们可以借助 `openai sdk`来实现deepseek的模型请求，打开 `dangerouslyAllowBrowser`属性，可以在浏览器中调用，这种做法仅作demo，后期实际项目需要后端去调用，纯前端调用 api key会暴露

```js
import OpenAI from "openai";
 const initOpenAI = () => {
        openaiRef.current = new OpenAI({
            baseURL: "https://api.deepseek.com",
            apiKey: GlobalAPI.config?.VITE_DEEPSEEK_KEY,
            dangerouslyAllowBrowser: true,
        });
    };
```

### markdown-ai.tsx组件

```js
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeHighlight from 'rehype-highlight'; // 代码高亮
import 'highlight.js/styles/github.css';

 <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeHighlight, removeExtraWhitespace]}
        components={components as any}
      >
        {markdownstr}
      </ReactMarkdown>
```

采用`react-markdown`及配套实现了样式，md文本，table，html标签等支持，详情请看具体代码

### 代码copy组件

借助`react-markdown`自定义标签的方式，自定义了`<pre>`标签，借助 `rehype-highlight` `copy-to-clipboard`来实现代码的高亮及复制

```js
import PreWithCopy from "./copycode.tsx"
// 自定义渲染器
  const components = {
    pre: PreWithCopy,
  };
  
   <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeHighlight, removeExtraWhitespace]}
        components={components as any}
      >
        {markdownstr}
      </ReactMarkdown>
  
```

### html渲染空白行处理

`react-markdown`开启 `rehypePlugins rehypeRaw`的时候，大多数情况由于模型返回的`\n`太多，页面会间距过大，尤其是表格等，我们需要单独空白行处理下

```js
 // 消除空格的 解决html 渲染的问题
  const removeExtraWhitespace = () => {
    return (tree: any) => {
      const removeWhitespace = (node: any) => {
        if (node.tagName === "pre") {
          return;
        }
        if (node.type === "text") {
          node.value = node.value.replace(/\s+/g, " ");
        }
        if (node.children) {
          node.children = node.children.filter((child: any) => {
            if (child.type === "text") {
              return child.value.trim() !== "";
            }
            removeWhitespace(child);
            return true;
          });
        }
      };
      removeWhitespace(tree);
      return tree;
    };
  };
```

## 总结

以上就是`demo`版本的主要功能和技术实现细节，详情请查看代码 [gitee仓库地址 ](https://gitee.com/zhanghongjie1111/chat-deepseek)

我是基于react写的，如果需要`vue`版本的，可以留言，抽时间做一套`vue`的。
