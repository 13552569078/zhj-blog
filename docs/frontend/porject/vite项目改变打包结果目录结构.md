## 前言

**有些是工作总结，有些是技术文档搬运，有些是某视频刷到的，均会经过实践，留作总结，按需取舍。**

## 场景

我们在部署项目或公司有特定化规定时，需要针对打包文件名称及打包路径做些更改，如我们初始化项目`vite`项目`build`的打包目录如下。默认打包文件目录是 入口文件`index.html`和资源文件`assets`，且`assets`中包含了全部的`js` `css` 以及 `svg`等文件

![微信截图\_20240829095908.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/9226b964e3fb405cba136a9043d42845~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755072158&x-orig-sign=gaDpstmVWMR8uRPhh8zVmbzMuGE%3D)

## 实现目标

我们将`svg` `js` `svg`等分类存放，不全部都集中在 `assets`中

## 实现流程

#### 1：创建项目，依次安装依赖，启动项目

```js
npm init vite@latest build-vite --template vue
```

#### 2：将 `assets`中添加超过`4kb`的`svg`文件，并项目中使用（或者直接替换`vue.svg`）

`vite`打包中，小于`4kb`的`svg`等资源文件，会直接打包成`base64`格式，不会出现在打包资源文件中

#### 3：执行`npn run build`查看默认打包路径文档结构，是否如上图所示

#### 4：查找配置项

`vite`官方文档并没有找到配置打包路径修改选项，`vite`打包是继承了`rollup`打包，且`vite`中`rollupOptions`配置自定义底层的 Rollup 打包配置。这与从 Rollup 配置文件导出的选项相同[rollupOptions文档](https://cn.vitejs.dev/config/build-options.html#build-rollupoptions)

我们可借助 `rollup`来更改打包结构[rollup文档](https://rollup.nodejs.cn/configuration-options/#output-entryfilenames)

#### 5：修改配置项

`vite.config.ts`中增加配置如下

```js
build: {
    rollupOptions: {
      output: {
        entryFileNames: "js/[name]-[hash].js", // js入口文件配置，仅仅入口文件不包括分包及懒加载的js [name][hash]占位符 [ext]后缀
        chunkFileNames: "js/[name]-[hash].js", // 打包后每个chunk的文件名
        // assetFileNames: "assets/[name]-[hash].[ext]" // 打包后每个资源文件的文件名 可以传入字符串（静态资源均在assets中包括css svg等） 可传入函数
        assetFileNames(assetInfo) {
          // 自定义资源文件的命名
          if (assetInfo.name?.endsWith("css")) {
            return `css/[name]-[hash][extname]`;
          }
          // 定义图片后缀
          const imgExts = [".png", ".jpg", ".jpeg", ".gif", ".svg"];
          if (imgExts.some(imgExt => assetInfo.name?.endsWith(imgExt))) {
            return `images/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    }
  },
```

此时执行`npm run build`打包结果目录如下

![微信截图\_20240829103258.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/41fae20b41604f5582a003f1fe698856~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755072158&x-orig-sign=iM8LMzpnxy%2FtuRbhzqIABpz5gIo%3D)

## 再次提醒

**有些是工作总结，有些是技术文档搬运，有些是某视频刷到的，均会经过实践，留作总结，按需取舍。**
