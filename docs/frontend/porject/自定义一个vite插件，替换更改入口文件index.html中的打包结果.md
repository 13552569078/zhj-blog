## 背景

vite项目部署，我们为了避免多服务器频繁打包部署，抽离了共有变量到public中的settings.js，

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19584f46f20e4581a712f365056c2e90~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=795&h=311&s=27508&e=png&b=1c1c1c)

`settings.js`结构如下，
```js

const defaultSettings = {
  baseApi: "/api", // 接口的base路径 开发为/api 生产可替换/ragapi
  token: "Bearer XXXXXXXXXXXXXX",
  appFrontBase:"http://baidu.com/", // 智能应用前端根路径
  maxFileSize: 900, // 最大的上传文件
  title:'项目名称',
};

```
代码中可直接使用：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f277939f36f454a98001cda4c7e9705~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=761&h=282&s=20223&e=png&b=1f1f1f)

现: 我们build 项目到服务器后，更改了`settings.js`，中的部分字段，由于缓存的存在，更新完成后settings.js请求到的数据仍然为未更新过的（当然，浏览器会一定时间后，自动更新静态文件缓存。你可以清空缓存并加载），但我们想每次部署后，再次刷新浏览器就可以看到最新的`settings.js`


## 解决办法
我们自定义一个vite插件，实现每次build后，将

```js
<script src="/settings.js"></script>
```
加一个时间戳，更改为


```js
<script src="./settings.js?v=1718846778507"></script>
```

这样，每次build部署后，settings后会有时间戳，每次都不一样，可避免浏览器缓存


## vite插件及格式规则如下

Vite 插件是一种用于扩展 Vite 功能的工具，允许开发者自定义构建配置，以满足特定的开发需求。Vite 插件可以针对开发服务器和生产构建过程进行特定的操作和优化。自定义 Vite 插件通常遵循以下格式：

1.  **插件名称**：每个插件都应该有一个唯一的名称，通常带有 `vite-plugin-` 前缀，以便于识别和搜索。
1.  **钩子对象**：插件通过钩子（hooks）来扩展 Vite 的功能。钩子是一个具有特定生命周期的函数，可以在 Vite 的不同阶段执行自定义操作。例如，可以在配置解析后（`configResolved` 钩子）或在写入捆绑包时（`writeBundle` 钩子）执行操作。
1.  **apply 属性**：使用 `apply` 属性可以指定插件仅在开发（`'serve'`）或构建（`'build'`）模式中调用，从而实现按需应用。
1.  **插件注册**：在 `vite.config.js` 或 `vite.config.ts` 文件中，通过 `plugins` 数组注册插件。可以内联定义插件或引入外部插件。
1.  **插件的创建和分享**：创建插件时，可以将其内联到配置文件中，也可以将其分离到单独的文件或包中。创建完成后，可以考虑将插件发布到 NPM 并与社区分享，以促进 Vite 生态系统的发展。
1.  **插件的发布和共享**：发布插件时，应在 `package.json` 中包含 `vite-plugin` 关键字，并遵循 Vite 插件的命名约定。此外，建议将插件提交到社区资源如 Awesome-vite，以便其他开发者发现和使用4。
1.  **自定义查询**：Vite 还支持通过 `query` 选项提供对导入的自定义查询，供其他插件使用，这可以在导入时附加特定的查询参数。
1.  **配置选项**：Vite 配置文件（`vite.config.js`）中可以定义多种配置选项，如 `publicDir`、`cacheDir`、`resolve.alias` 等，这些选项可以与插件结合使用以实现更高级的自定义功能。

通过遵循这些格式和约定，开发者可以创建出功能丰富、高度自定义的 Vite 插件，以满足项目开发中的特定需求。


## 插件书写


```js
export const vitePluginAddScriptVersion = {
  name: "vite-plugin-add-script-version",
  transformIndexHtml(html) {
    const version = new Date().getTime();
    // 注意这里我们移除了 \s+ 来匹配没有空格的情况，并且使用了 . 来匹配任何字符（除了换行符）
    const regex = /<script\s+src="\.\/settings\.js"([^>]*)>/g;
    // 使用函数作为第二个参数来确保我们只替换没有查询参数的 URL
    const replacedHtml = html.replace(
      regex,
      (_, attrs) => `<script src="./settings.js?v=${version}"${attrs}>`
    );
    return replacedHtml;
  },
};


```

代码含义解释：

1.  **插件定义**：

    -   `name`: 插件的名称，这里是 `"vite-plugin-add-script-version"`。
    -   `transformIndexHtml(html)`: 这是一个方法，用于在 Vite 构建过程中转换 HTML 文件的内容。它接受一个参数 `html`，即原始的 HTML 字符串。

1.  **生成版本号**：

    -   `const version = new Date().getTime();`: 使用当前时间的时间戳作为版本号。这确保每次构建时，版本号都是唯一的。

1.  **定义正则表达式**：

    -   `const regex = /<script\s+src="./settings.js"([^>]*)>/g;`:

        -   这是一个全局的正则表达式（由于 `g` 标志），用于匹配所有的 `<script>` 标签，其 `src` 属性指向 `"./settings.js"`。
        -   注意，这里的正则表达式稍微有些问题。由于它使用了 `([^>]*)` 来匹配任何不是 `>` 的字符，这实际上会包括 `src` 属性后面的任何属性或注释。这可能不是预期的行为，尤其是当 HTML 中有注释或其他属性位于 `<script>` 标签内部时。
        -   但基于你的注释，它似乎有意地匹配了包括空格在内的任何字符（除了换行符），这可能是为了匹配一些可能有额外空格或属性的情况。

1.  **替换 HTML 中的 `<script>` 标签**：

    -   使用 `html.replace(regex, (_, attrs) => ...)` 方法来替换所有匹配的 `<script>` 标签。

        -   第一个参数 `regex` 是上面定义的正则表达式。
        -   第二个参数是一个函数，它接受匹配到的完整字符串（这里用 `_` 表示，因为它在函数内部没有被使用）和捕获组（这里是 `attrs`，表示 `src` 属性后面的任何内容）。
        -   函数返回一个新的 `<script>` 标签字符串，其中 `src` 属性被修改为 `"./settings.js?v=${version}"`，并且保留了原始标签中的其他所有属性（如果有的话）。

1.  **返回替换后的 HTML**：

    -   最后，`transformIndexHtml` 方法返回替换后的 HTML 字符串。


## 插件使用
`vite-plugin-add-script-version`文件目录和`vite.config.ts`平级 

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41392322028e46d5a7f9d16c977395a4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=552&h=220&s=11832&e=png&b=191919)

`vite.config.ts`引用配置

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ebdd52658b449cba7d69b59630806f5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=620&h=274&s=20903&e=png&b=1f1f1f)






## 结果：

最终打包后的`index.html` 结构如下 


```js
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="./logo.ico" />
  <script src="./settings.js?v=1718846778507"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script type="module" crossorigin src="./assets/index-DQDZevpy.js"></script>
  <link rel="stylesheet" crossorigin href="./assets/index-CKmqFZ2w.css">
</head>

<body>
  <div id="root" class="h-[100vh]"></div>

</body>

</html>
```

可见已有版本号，每次部署更新 刷新浏览器即可

```js
  <script src="./settings.js?v=1718846778507"></script>
```


## webpack中如何解决如此问题

在 webpack 的构建过程中，特别是当与一些模板引擎（如 html-webpack-plugin）结合使用时，你会看到这样的语法。这里的 `<%= ... %>` 是模板引擎的插值语法，用于将某些变量或表达式的值插入到 HTML 文件中。可借助webpack的模板语法来实现


```js
<script src="<%= BASE_URL %>config/config.js?v=<%=new Date().valueOf() %>"></script>

```

