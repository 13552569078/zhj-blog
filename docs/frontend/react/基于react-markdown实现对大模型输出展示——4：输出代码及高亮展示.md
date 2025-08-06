## 背景

我们实现了基础的`md`展示，自定义标签，自定义图表的展示，接下来我们学习下如何展示代码

## 基础代码展示

```js
import React, { useEffect, useRef } from 'react';
import ReactMarkdown from'react-markdown';
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "github-markdown-css";
import * as echarts from 'echarts';

// 添加大段代码示例
const codeExample = `
function add(a, b) {
    return a + b;
}

const result = add(5, 3);
console.log(result);
`;

const richMarkdownContent = `
# 一级标题：Markdown 丰富示例 [[1,'我是1的id']]

## 二级标题：Markdown 丰富示例 [[2,'我是2的id']]

### 三级标题：Markdown 丰富示例 [[3,'我是3的id']]

### 代码示例
\`\`\`javascript
${codeExample}
\`\`\`
`;

const replaceReferences = (str) => {
    // 定义正则表达式
    const regex = /\[\[(\d+),'(.*?)'\]\]/g;

    // 使用 replace 方法进行全局替换
    return str.replace(regex, (match, num, id) => {
        return `<sup className="text-blue-600 cursor-pointer" data-supid="${id}">[${num}]</sup>`;
    });
}

const regStr = replaceReferences(richMarkdownContent);

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

展示效果如下

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/ff4af69b6a7c4bc496e315ca01957d8b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071819&x-orig-sign=8SWSFx5rxa%2FXb8aROwfFPCnwPdk%3D)
可见支持基本的代码展示

## 大段代码，高亮展示

```js
npm install highlight.js -S
npm install rehype-highlight -S
```

```js
import React from 'react';
import ReactMarkdown from'react-markdown';
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from 'rehype-highlight';
import "github-markdown-css";
import 'highlight.js/styles/github.css';

// 增加大段代码示例
const codeExample = `
// 定义一个复杂的 JavaScript 类
class ComplexNumber {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    // 加法方法
    add(other) {
        return new ComplexNumber(
            this.real + other.real,
            this.imaginary + other.imaginary
        );
    }

    // 减法方法
    subtract(other) {
        return new ComplexNumber(
            this.real - other.real,
            this.imaginary - other.imaginary
        );
    }

    // 乘法方法
    multiply(other) {
        return new ComplexNumber(
            this.real * other.real - this.imaginary * other.imaginary,
            this.real * other.imaginary + this.imaginary * other.real
        );
    }
}
`;

const richMarkdownContent = `
# 一级标题：Markdown 丰富示例 [[1,'我是1的id']]
### 代码示例
\`\`\`javascript
${codeExample}
\`\`\`
`;

const replaceReferences = (str) => {
    // 定义正则表达式
    const regex = /\[\[(\d+),'(.*?)'\]\]/g;

    // 使用 replace 方法进行全局替换
    return str.replace(regex, (match, num, id) => {
        return `<sup className="text-blue-600 cursor-pointer" data-supid="${id}">[${num}]</sup>`;
    });
}

const regStr = replaceReferences(richMarkdownContent);

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
            <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeRaw, rehypeHighlight]} 
                components={components}
            >
                {regStr}
            </ReactMarkdown>
        </div>
    );
};

export default App;
```

效果如下：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/38081ac0596f49999a72ecc60d54079a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071819&x-orig-sign=Rc2heZrxkCOnMk%2BlNWCjtAM5MBk%3D)

## 自定义复制 主题切换等功能

```js
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { 
  materialLight,
  materialOceanic
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button, Popover, Space } from 'antd';
import { CopyOutlined, BulbOutlined, BulbFilled } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// 代码块组件
function CodeBlock({ code, language = '' }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: 'relative', margin: '16px 0' }}>
      <div style={{ 
        position: 'absolute',
        right: 8,
        top: 8,
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 4,
        padding: 4
      }}>
        <Space>
          <Button
            type="text"
            size="small"
            icon={isDarkTheme ? <BulbFilled /> : <BulbOutlined />}
            onClick={() => setIsDarkTheme(!isDarkTheme)}
          />
          <Popover open={copied} content="已复制！" trigger={[]}>
            <CopyToClipboard text={code} onCopy={handleCopy}>
              <Button type="text" size="small" icon={<CopyOutlined />} />
            </CopyToClipboard>
          </Popover>
        </Space>
      </div>

      <SyntaxHighlighter
        language={language.toLowerCase()}
        style={isDarkTheme ? materialOceanic : materialLight}
        customStyle={{
          padding: '40px 20px 20px',
          borderRadius: 8,
          fontSize: 14,
          overflowX: 'auto'
        }}
        PreTag="div"
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}

// Markdown 渲染器组件
export default function MarkdownCodeBlock({ content }) {
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <CodeBlock
          code={String(children).replace(/\n$/, '')}
          language={match[1]}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
}
```

```js
import MarkdownCodeBlock  from './CodeBlock';

const App = () => {
    const markdown = `
  ## 示例代码
  \`\`\`js
  console.log('Hello World');
  \`\`\`
  
  \`\`\`css
  .container {
    padding: 20px;
  }
  \`\`\`
  `;

  return (
    <div className="doc-container" style={{ maxWidth: 800, margin: '0 auto' }}>
      <MarkdownCodeBlock content={markdown} />
    </div>
  );
};

export default App;
```

效果展示

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/d51601e0e95140578f50950b3e100129~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071819&x-orig-sign=mye0Z1CogShQSuRDZIfIPPjetx8%3D)

## 总结

基于大模型的输出 几乎也就这么点功能 大差不差，有更好的实现方式 可以分享，源码项目 地址你也可以下载项目[项目地址 ](https://gitee.com/zhanghongjie1111/react-markdown) `dev4`分支
