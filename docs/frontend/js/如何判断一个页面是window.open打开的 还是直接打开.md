## 背景
我们做需求，有时候会遇见特殊的需求，比如我们一个系统A点击某些操作可以跳转到另一个系统B，此时B系统需要知晓，如果是其他系统跳转过来的，我们展示有功能（OPRATION1）,单独打开的没有(OPRATION1)功能，可以看成按钮等一类的特殊操作

## 实现
我们可以借助 `window.opener`来判断是否是跳转过来的，按`vue3`举例


```js
const fromOpen = ref(window.opener && window.opener !== window);
```

且不论在此系统进行路由跳转，还是强制刷新页面 `fromOpen`永远是`true`即从外部系统跳转过来的


![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/565a5b7be8a24ab59e1e9c0fac3cc9de~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755072279&x-orig-sign=la3ILLtH6OUif1b6l2j5rCDlR%2FU%3D)


## 注意事项
-   **刷新与复制URL**：

    -   即使通过`window.open`打开的页面被刷新（如F5），`window.opener`属性仍然会存在。
    -   但是，如果将该页面的URL复制后在新的浏览器标签页或窗口中打开，则新页面的`window.opener`将是`null`或`undefined`，因为它不是通过`window.open`打开的。

-   **浏览器差异**：

    -   尽管大多数现代浏览器都遵循相似的行为，但始终建议在不同浏览器中测试以确保兼容性。

-   **安全策略**：

    -   需要注意的是，浏览器的弹窗拦截功能可能会阻止`window.open`的调用，从而影响到`window.opener`的预期行为。确保在允许弹窗的上下文中测试相关功能。

-   **其他打开方式**：

    -   除了`window.open`，还有其他方式可以打开新窗口或标签页（如通过用户点击带有`target="_blank"`属性的链接），但这些方式不会设置`window.opener`属性。

通过上述步骤和注意事项，可以较为准确地判断一个页面是通过`window.open`打开的还是直接在当前页面打开的。