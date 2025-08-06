## 背景
我们在大模型聊天回复中，常借助 `SSE` 来实现流式询问回复，返回的格式以`md`格式为主，我们如何流式得输出`md`格式，借助 可轻松过实现，本文先用定时器模拟流式，如想真实后端请求数据流，文末也会给出相应代码, 最终效果如下
[jvideo](https://www.ixigua.com/7416645149986325032)

## 伪流式代码如下


```js
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useImmer } from "use-immer";

// const markdownstr =
//   "北京是中国的首都，也是全国的政治、文化、科技创新和国际交往中心。北京的经济情况非常发达，是中国经济的重要组成部分。以下是对北京经济情况的详细介绍：\n\n### 1. 经济总量\n北京的经济总量在全国排名前列。根据北京市统计局的数据，2022年北京市的地区生产总值（GDP）达到了约3.6万亿元人民币，同比增长约6.1%。这一数据表明北京的经济持续稳定增长。\n\n### 2. 产业结构\n北京的产业结构以服务业为主，特别是金融、信息传输、软件和信息技术服务、科学研究和技术服务等行业。这些行业的发展带动了北京经济的快速增长。同时，北京也是全国科技创新中心，拥有众多的高新技术企业和研发机构。\n\n### 3. 对外贸易\n北京的对外贸易也非常活跃。北京是中国重要的国际贸易中心，拥有北京首都国际机场和北京大兴国际机场，这两个机场是全球最繁忙的机场之一。北京的对外贸易额持续增长，与世界各地的经济联系日益紧密。\n\n### 4. 城市建设\n北京的城市建设也在不断推进。北京正在建设成为国际一流的和谐宜居之都，城市基础设施不断完善，生态环境持续改善。北京的城市规划和建设注重可持续发展，致力于提升居民的生活质量。\n\n### 5. 人口与就业\n北京的人口众多，就业机会丰富。北京吸引了大量的国内外人才，为经济发展提供了强大的人力资源支持。同时，北京的就业市场也非常活跃，提供了多样化的就业机会。\n\n### 6. 政策支持\n北京的经济发展得到了政府的大力支持。政府出台了一系列的政策和措施，鼓励创新、支持企业发展、优化营商环境，为北京的经济发展提供了良好的政策环境。\n\n### 7. 未来展望\n北京的经济未来发展前景广阔。随着京津冀协同发展战略的深入实施，北京将与天津、河北等地形成更加紧密的经济联系，共同推动区域经济的协调发展。同时，北京将继续加强科技创新，推动经济结构的优化升级，实现高质量发展。\n\n综上所述，北京的经济情况非常良好，不仅在国内具有重要地位，也在国际上具有一定的影响力。北京的经济发展将继续保持稳定增长的态势，为中国的经济发展做出重要贡献。";

const markdownstr = `
大模型的参数量随着技术的不断进步和研究的深入而不断增加。目前，参数量最多的大模型之一是**Grok-1**，它是一款由xAI团队开发的混合专家模型，参数量达到了3140亿，被公认为“迄今为止全球参数量最大的开源大语言模型”。这一数字相较于其他知名大模型，如OpenAI的GPT-3（参数量为1750亿）有显著的提升。

接下来，我们可以对几个著名大模型的参数量进行对比：

| 模型名称 | 参数量（亿） | 备注/特点                           |
|----------|-------------|-------------------------------------|
| GPT-3    | 1750        | OpenAI推出，自然语言处理领域表现优异 |
| T5       | 11          | Google Brain推出，语言生成能力优秀    |
| BERT     | （未具体提及，但远小于GPT-3） | 基于Transformer的双向语言模型，NLP领域代表作 |
| Grok-1   | 3140        | 迄今为止全球参数量最大的开源大语言模型 |

需要注意的是，虽然大模型的参数量是衡量其规模和复杂度的一个重要指标，但并不意味着参数量越多的模型在所有任务上的表现都一定更好。模型的性能还受到训练数据、算法设计、计算资源等多种因素的影响。

此外，随着技术的不断发展和创新，未来大模型的参数量有可能会继续增加，同时也会出现更多在特定任务上表现更优的模型。因此，在选择和使用大模型时，需要根据具体任务的需求和场景进行综合考虑。
`;

function Test() {
  const [targetString, setTargetString] = useImmer<string>("");

  const streamString = (source: string, index = 0) => {
    if (index < source.length) {
      // 将当前字符添加到目标字符串
      setTargetString((darf: string) => {
        return darf + source[index];
      });

      // 递归调用，延迟一定时间（例如100毫秒）
      setTimeout(() => {
        streamString(source, index + 1);
      }, 10); // 这里的100毫秒是模拟的“流速”
    }
  };

  useEffect(() => {
    streamString(markdownstr, 0);
  }, []);

  return (
    <div
      style={{ whiteSpace: "pre-wrap", width: "60%" }}
      className="markdown-body"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{targetString}</ReactMarkdown>
    </div>
  );
}
export default Test;

```
## 样式
部分`md`格式得样式 如表格没有展示出来对应的格式，我们可以写一套样式，并在首页引入

```js
import "@/styles/index.css";
```


```js
.markdown-body {
  padding: 16px 4%;
  word-break: break-word;
  line-height: 1.75;
  font-weight: 400;
  font-size: 16px;
  overflow-x: hidden;
  color: #252933;
  table {
    display: inline-block !important;
    font-size: 12px;
    width: auto;
    max-width: 100%;
    overflow: auto;
    border: 1px solid #f6f6f6;
    text-indent: initial;
    unicode-bidi: isolate;
    border-spacing: 2px;
    //   border-collapse: collapse;
    thead {
      background: #f6f6f6;
      color: #000;
      text-align: left;
      display: table-header-group;
      vertical-align: middle;
      unicode-bidi: isolate;
      border-color: inherit;
    }
    tr {
      display: table-row;
      vertical-align: inherit;
      unicode-bidi: isolate;
      border-color: inherit;
    }
    td {
      min-width: 120px;
      border: 1px solid #f6f6f6;
    }
    td,
    th {
      padding: 12px 7px;
      line-height: 24px;
    }
    tbody {
      display: table-row-group;
      vertical-align: middle;
      unicode-bidi: isolate;
      border-color: inherit;
    }
  }
}

```


## 代码解释

这段代码定义了一个React组件`Test`，它使用了一些现代React技术和库来展示一个Markdown字符串，并通过一种模拟的“流式”方式（即逐字符地）将其内容添加到页面上。下面是详细的解释：

### 组件结构和依赖

- **React**: 基础的React库，用于构建用户界面。
- **ReactMarkdown**: 一个React组件，用于将Markdown字符串渲染为HTML。
- **remarkGfm**: 一个插件，用于`ReactMarkdown`，支持GitHub Flavored Markdown（GFM）语法。
- **useImmer**: 一个自定义Hook，基于Immer库，提供了一种方便的方式来处理不可变状态。Immer允许你以可变的方式编写代码，但实际上会返回一个新的不可变状态。

### 组件逻辑

1. **状态管理**: 使用`useImmer`自定义Hook来管理一个名为`targetString`的状态，初始值为空字符串。这个状态用于存储要渲染的Markdown字符串的当前部分。

2. **流式渲染**: 定义了一个名为`streamString`的函数，该函数接受一个源字符串`source`和一个索引`index`。它递归地调用自身，每次调用都将源字符串的下一个字符添加到`targetString`中，并使用`setTimeout`来模拟字符添加的“流速”（这里设置为10毫秒，但注释中写的是100毫秒，可能是个笔误）。

3. **副作用**: 使用`useEffect`Hook来在组件挂载后（即依赖数组为空时）调用`streamString`函数，开始流式渲染Markdown字符串。由于`useEffect`的依赖数组为空，这个副作用只会在组件首次渲染时执行一次。

4. **渲染Markdown**: 使用`ReactMarkdown`组件来渲染`targetString`中的Markdown内容。通过`remarkPlugins`属性传入`remarkGfm`插件，以支持GFM语法。

5. **样式**: 渲染Markdown的`<div>`元素被赋予了一些内联样式（`whiteSpace: "pre-wrap"`和`width: "60%"`）和一个类名（`"markdown-body"`），这些可能用于控制文本的换行和容器的宽度。

### 注意事项

- **性能**: 虽然这种流式渲染的方式在视觉上可能很有趣，但它并不是处理大量文本或实时更新的高效方式。每次更新状态都会触发组件的重新渲染，这可能会导致性能问题，尤其是在处理长文本时。

- **代码优化**: 注释中提到的时间间隔（100毫秒）与代码中实际使用的时间间隔（10毫秒）不一致，这可能是一个笔误。此外，`setTimeout`的递归调用可能会导致调用栈过深，尽管在JavaScript中这通常不是问题，因为`setTimeout`会将回调放入事件循环的宏任务队列中，而不是直接递归调用。

- **Immer的使用**: 在这个例子中，`useImmer`的使用可能有些过度，因为每次只添加一个字符到字符串中。对于更复杂的状态管理，Immer的不可变性和简化状态更新的能力会更有用。

- **Markdown字符串**: 示例中包含了两个Markdown字符串的注释，但只有一个（关于大模型参数量的）被实际使用。


## 流式输出 
我们一般使用 `@microsoft/fetch-event-source`,支持`post`请求，自定义`header`等，有失败重试机制


```js
import { fetchEventSource } from "@microsoft/fetch-event-source";
const ctrl = new AbortController();
 fetchEventSource(url, {
      method: "POST",
      // 自定义请求头
      headers: {
        "Content-Type": "application/json",
        Accept: ["text/event-stream", "application/json"] as unknown as string,
        Authorization: userInfo.token,
      },
      // 自定义传参
      body: JSON.stringify({
        user_id: userInfo.id,
        kb_ids: [paramsQuery.kbid],
        history: [], // 历史记录传递最后三项
        question: q,
        streaming: true,
      }),
      openWhenHidden: true, // 页面失活仍然输出
      signal: ctrl.signal, // 取消请求
      onopen(e: any) {
        if (e.ok && e.headers.get("content-type") === "text/event-stream") {
         // 流式链接成功
        } else if (e.headers.get("content-type") === "application/json") {
          return e
            .json()
            .then((data: any) => {
             // 失败的处理逻辑
            })
            .catch(() => {
               // 失败的处理逻辑
            });
        }
      },
      onmessage(msg: { data: string }) {
        // 流式输出的，可再次处理业务逻辑 如拼接字符串
      },
      onclose() {
        // 链接关闭 
      },
      onerror(err: any) {
        // 报错处理 
      },
    });
```


