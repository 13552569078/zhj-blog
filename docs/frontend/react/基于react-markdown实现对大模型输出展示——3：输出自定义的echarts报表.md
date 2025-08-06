## 背景

上一边文章 我们学习了如何借助自定义 `components`来实现自定义的标签和事件，这篇文章我们更进一步，学习下如何渲染 `echarts`等报表，由浅入深

## 渲染一个报表

直接给出代码了，相信能看懂，下面有代码解释

```js
import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "github-markdown-css";
import * as echarts from 'echarts';

const richMarkdownContent = `
# 一级标题：Markdown 丰富示例 [[1,'我是1的id']]

## 二级标题：Markdown 丰富示例 [[2,'我是2的id']]

## 三级标题：Markdown 丰富示例 [[3,'我是3的id']]

<div id="echarts-container" style="width: 600px; height: 400px;"></div>
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
  const chartRef = useRef(null);

  useEffect(() => {
    // 获取 ECharts 容器元素
    const chartContainer = document.getElementById('echarts-container');
    if (chartContainer) {
      // 初始化 ECharts 实例
      const myChart = echarts.init(chartContainer);

      // 指定图表的配置项和数据
      const option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

      // 组件卸载时销毁 ECharts 实例
      return () => {
        myChart.dispose();
      };
    }
  }, []);

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

效果展示如下：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/be791f2fd6144abc94447cd352bb6499~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071787&x-orig-sign=JGxG8q8uuEFFTF%2B%2FJq4I73%2FEWAI%3D)

可见渲染了html标签，`useEffect`是可以获取到dom节点并且 画出来echarts的，

## 渲染多表格

```js
import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "github-markdown-css";
import * as echarts from 'echarts';

const richMarkdownContent = `
# 一级标题：Markdown 丰富示例 [[1,'我是1的id']]

## 二级标题：Markdown 丰富示例 [[2,'我是2的id']]

## 三级标题：Markdown 丰富示例 [[3,'我是3的id']]
<div style="display:flex">
<div id="echarts-container-1" style="width: 600px; height: 400px;"></div>
<div id="echarts-container-2" style="width: 600px; height: 400px;"></div>
</div>
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
    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);

    useEffect(() => {
        // 获取第一个 ECharts 容器元素
        const chartContainer1 = document.getElementById('echarts-container-1');
        if (chartContainer1) {
            // 初始化第一个 ECharts 实例
            const myChart1 = echarts.init(chartContainer1);

            // 第一个图表的配置项和数据
            const option1 = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line'
                }]
            };

            // 使用刚指定的配置项和数据显示第一个图表。
            myChart1.setOption(option1);

            // 组件卸载时销毁第一个 ECharts 实例
            return () => {
                myChart1.dispose();
            };
        }
    }, []);

    useEffect(() => {
        // 获取第二个 ECharts 容器元素
        const chartContainer2 = document.getElementById('echarts-container-2');
        if (chartContainer2) {
            // 初始化第二个 ECharts 实例
            const myChart2 = echarts.init(chartContainer2);

            // 第二个图表的配置项和数据
            const option2 = {
                xAxis: {
                    type: 'category',
                    data: ['A', 'B', 'C', 'D', 'E']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [300, 400, 200, 500, 100],
                    type: 'bar'
                }]
            };

            // 使用刚指定的配置项和数据显示第二个图表。
            myChart2.setOption(option2);

            // 组件卸载时销毁第二个 ECharts 实例
            return () => {
                myChart2.dispose();
            };
        }
    }, []);

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

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b4225916f6ce4a9593ce17864ccb0f73~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071787&x-orig-sign=lenYOwLDqJjcZvUojvhrrs1HOGY%3D)

## 总结

我们可以基于自定义标签来实现报表，可以借此实现特殊的交互，对于多数其他标签有更特殊的需求，可以自己来实现，一家之言，有需要的按需取舍，你也可以下载项目[项目地址 ](https://gitee.com/zhanghongjie1111/react-markdown)`dev3`分支

## 未完待续
