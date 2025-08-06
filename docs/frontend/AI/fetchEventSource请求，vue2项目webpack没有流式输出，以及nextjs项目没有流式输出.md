## 背景

最近做类似`AI会话gpt`流式输出的效果，使用的是`@microsoft/fetch-event-source`组件，借助vue和react的数据响应，可轻松实现流式输出，在 `vue3+vite`  和 `react+vite` 的架构中，可以实现流式输出，今天同样功能特定客户需要`vue2+webpack`来实现，要我写个demo，代码逻辑迁移过去换个写法而已，简单。。 可是写完后发现无法流式输出，总是一下子全部返回数据，即使设置了流式返回

## 代码如下

```js
fetchEventSource("/******/local_application_chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: ["text/event-stream", "application/json"],
          Authorization: token,
        },
        body: JSON.stringify({
          user_id: user,
          application_id: appid,
          history: _this.questionList.slice(-3).map((item) => {
            return [item.question, item.answer];
          }), // 历史记录传递最后三项
          question: q,
          streaming: true,
        }),
        signal: ctrl.signal,
        onopen(e) {
          if (e.ok && e.headers.get("content-type") === "text/event-stream") {
            // _this.loading = false;
          } else if (e.headers.get("content-type") === "application/json") {
            return e
              .json()
              .then(() => {
                _this.$message.error("出错了,请稍后刷新重试1");
                _this.loading = false
                ctrl?.abort();
              })
              .catch(() => {
                // 取消加载框
                _this.loading = false
                _this.$message.error("出错了,请稍后刷新重试2");
                ctrl?.abort();
              });
          }
        },
        onmessage(msg) {
          const res = JSON.parse(msg.data);
          // 拼接answer
          if (res?.code === 200 && res?.response) {
            const addStr = _this.trimExceptNewlines(res?.response).replaceAll(
              "\n",
              "<br/>"
            );
            _this.questionList[_this.questionList.length - 1].answer = _this.questionList[_this.questionList.length - 1].answer + addStr
            // 滚动底部
            _this.goChatBottom();
            _this.loading = false;
          }
        },
        onclose() {
          // 取消加载框
          _this.loading = false
          ctrl.abort();
        },
        onerror(err) {
          console.log(err, "onerror");
          // 取消加载框
          _this.loading = false
          ctrl?.abort();
          _this.$message.error("出错了,请稍后刷新重试3");
        },
      });
```

代码逻辑 在`onmessage`中，我们会拿到返回的流式数据，动态拼接，但是总是一下统一返回渲染

## 解决方式

webpack中 默认开启了  `compress`，在 `vue.config.js` 设置为false，

```js
devServer: {
    host: "0.0.0.0",
    port: 5001,
    open: true,
    compress: false,
    proxy: {
      "/aaaaaa/": {
        // ngnix 代理了/ragapi
        target: "http://aaaaaaaaa/", // 线上地址
        changeOrigin: true,
        secure: false,
      },
    },
  },
```

此时可流式输出，vite中 `compress` 默认是 false 所以不用设置就可流式输出

## nginx配置

```js
location / {
	add_header Cache-Control no-cache;
	proxy_set_header Connection '';
	proxy_http_version 1.1;
	chunked_transfer_encoding off;
	proxy_buffering off;
	proxy_cache off;
}

```

## 参数解释

在 `vue.config.js` 文件中，`devServer` 是一个用于配置 Vue CLI 项目开发服务器的对象。当你设置 `compress: false` 时，你实际上是在告诉开发服务器不要对响应的内容进行压缩。

`compress` 选项的作用通常是控制开发服务器是否应该使用 gzip 或其他压缩算法来压缩发送给浏览器的响应内容。当设置为 `true` 时，服务器会尝试压缩响应，这通常可以减少传输的数据量，因为压缩后的内容通常比原始内容更小。但是，这也需要额外的 CPU 时间来进行压缩和解压缩操作。

在开发环境中，`compress: false` 可能有以下好处：

1.  **更快的响应速度**：由于不需要进行压缩和解压缩操作，服务器可以更快地发送响应给浏览器。
2.  **避免压缩相关的错误**：有时，压缩算法可能会与某些内容类型或代码不兼容，导致在浏览器中出现显示问题或错误。在开发环境中禁用压缩可以避免这些问题。
3.  **简化调试**：未压缩的响应内容更易于阅读和调试，特别是当你正在查看网络请求和响应时。

然而，在生产环境中，你通常会希望启用响应压缩（例如，通过设置 HTTP 头部 `Content-Encoding: gzip`），以减少网络传输的开销和提高用户体验。这通常是在 Web 服务器（如 Nginx、Apache）或 CDN 层面上配置的，而不是在应用程序的开发服务器中。

总之，`compress` 选项在 `vue.config.js` 的 `devServer` 配置中用于控制开发服务器是否应该对响应内容进行压缩。将其设置为 `false` 可以加快开发过程中的响应速度，并避免与压缩相关的潜在问题。

## 补充

最近修改`dify`源码，发现本地开发也没有流式输出，线上`docker`部署后是支持流式输出的，查找后原因和webpack 几乎一致，我们需要对应修改下 以下配置

`next.config.js` 文件做如下配置

```js
  compress: false,
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/123b4a051b4146b5942a4eb75bba61c9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755072723&x-orig-sign=7MAIlM5JZorXC5aToGMwy1qEKVA%3D)
