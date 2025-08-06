### 背景

我们前端代理 经常使用的是 `webpack` 或者`vite`的 `devServer proxy`来代理本地开发， 最近被安利了`whistle`，此不仅仅可以设置代理，也可以进行抓包分析，手机端抓包等等，下面就介绍下`whistle`的安装配置 及场景

[文档地址](https://wproxy.org/whistle/)

### 安装

#### 安装并启动

`whistle`是基于 `node`的 所以你要先下载 `node`并全局安装 `whistle`

```js
npm install -g whistle  // 全局安装
w2 start // 启动whistle
```

此时启动成功则展示

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/3b090438124e43409a1452a985c940bd~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=gU%2B6uxIP3Mi8RVmcbNYX%2Bxmgz50%3D)

我们打开对应的链接  `http://127.0.0.1:8899/` 即可打开 `whistle`的配置页面

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/bc1f7c48f6ee4d979cd143180cab6462~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=IlMHtBf%2BPBp7RD4D2y%2Fc1Nu7S8A%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/387a2e3286c54fe7949a5d07e646248a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=5u7f43afbQjZqkjLA8cNRM0dsIs%3D)

#### 安装https证书

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b621273138c84dc9867c54aa6d133f6a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=59dUeh%2B6X9N1B3zG%2FJhuXIQIViM%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a49daf79458746739ef272ea650d60c0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=flKQKcCkQN9HoZb25b%2BUoBnGk3s%3D)

下载并双击运行

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/f9788b79d98c427db28b3ed70f45695f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=1x9wZ3M%2FPklXQwr0MsI%2BvM1KPfw%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/3f40319659af47a2a972c07bec25ce72~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=bBE0zm%2B%2BDFkrHTkbidVg9KwyRiw%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/4c4e27d0c79447a18c129dcbb734159e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=HQGip%2FCRQ2q9XQB4osoVc0XUJSs%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/46d2462fecf6439e9b73d1fe3bb005ba~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=ZExQKcb1yJ8J5FAXKZQhuEZhohs%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/9c23db3783dd4760a1d8b145217bf15c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=sefcM3E8Q1hzwE73GYXaAzj4F3s%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/0bc601afa9414e51884867f8daf12998~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=wpfq6dI2cKs17QKCpZiCv575Wec%3D)

#### 谷歌浏览器为例 安装 proxy SwitchyOmega 插件

你可以谷歌浏览器插件安装(科学上网)，也可以解压完成后 手动安装，手动安装下载地址如下[ 插件地址](https://chrome.zzzmh.cn/info/padekgcemlokbadohgkifijomclgjgif)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/2aa2b1c4848f4442af7f5d99e85b1752~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=EjBq4tuGayzPpqLFU3nl5HN6gwE%3D) 下载解压后 导入谷歌浏览器插件即可 ，导入成功

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a302b76bbc72486d8dd306626e77a789~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=4ebV%2Bv0RPsMllKsU%2Fnc%2Bm2YhZYo%3D)

#### proxy SwitchyOmega 插件 设置代理

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/ad920f1558b24cc2992307ee9795e133~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=RSeoztRnfxsz26ELCnfB3Cj7B94%3D)

设置代理配置 这里就`whistle` 的启动代理地址

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a0f63b226614458dbf7b859c935d8c26~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=PzO483azrVON0qRZ8oIyVTMtqRo%3D)

应用代理

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/3b34478ffdf74da3868ee2dec3b387de~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=8a1YCd2Uy%2FgkmWnhf3XpXQVUus8%3D)

#### 应用此配置

点击浏览器的插件 ，你可以固定此插件到标签栏，选择 `whistle`运行（没有出来的话 多点击几次 或者重启电脑浏览器）

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/7cff0b80642f4d96acdd8816a74876c7~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=lIqb2OEo1Z5H8mTnVF6N3P18X%2BI%3D)

#### 配置成功 抓包测试

此时我们都配置成功了，现在我们使用 `whistle`插件，所有的浏览器访问 都会经过我们的 启动的  `whistle`服务地址 `127.0.0.1：8899`进行转发， 我们可以在浏览器打开`http://baidu.com` ，看下是否能抓包,

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/00bda623799645098fbc0436cc2ea98e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=vlHmSWwVKa9KiQ7ce2ngR4SaOk0%3D)

### 使用场景

#### 1前端跨域处理

简单写一个后端模拟接口 我们后端端口在`3000`， 写个模拟接口

```js
const express = require('express');
const app = express();

app.get('/list', (req, res) => {
  res.send({
    code:200,
    data: [
      {id: 1, name: 'apple'},
      {id: 2, name: 'banana'},
      {id: 3, name: 'orange'}
    ]
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
```

查看本地的ip 打开此接口 如我得本地IP和接口地址如下  `http://10.56.181.203:3000/list` 打开可以显示接口数据

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/cc284fbf4f57409bbf2a277ba4659b6f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=ZHuYz%2Bpdn1KBYc%2BGjPKdBIZbTig%3D)

你可以 `cmd  ipconfig`查看本地ip

如果我们的前端服务地址是 5173端口，请求这个地址就会跨域

```js
<template>
  <div>
    <h1>用户信息</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const user = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('http://127.0.0.1:3000/list');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    // 可以在这里将数据赋值给 user 变量
    // user.value = data;
  } catch (error) {
    console.error('请求出错:', error);
  }
});
</script>
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/40fd251ce56941ccab29080d16802459~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=g9RuRBJltojjZ9FIevIz%2FBcN0RU%3D)

我们打开 `http://127.0.0.1:8899/#rules`面板配置

```js
http://10.56.181.203:3000/list resCors://*   //这是设置了access-control-allow-origin: * 允许跨域
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/3f86b79a366f4e27a9140cab28196f52~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=sWre25tNVyr8l%2BppEIAG5Olc1xE%3D)
保存 并且再次执行 刷新页面

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/324bd74f4c304664900f47c1c76e8a48~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=S0SW%2BJs14PA2faSr7SkyDoikBls%3D)

接口已经不再跨域

也可以设置enable，解决跨域

```js
http://10.56.181.203:3000/list resCors://enable  
```

依然可以整个端口设置 而不是某一个接口

```js
http://10.56.181.203:3000 resCors://*
```

以上介绍了 前端如何利用 whistle解决跨域， 是否比vite webpack更有好些呢，如果不想使用此代理插件了 ，记得点击

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/bb09a154327848a6a7d5ae4029cd1264~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=XNfAvfTsGqZYdK%2BBuRoW7nqPdz0%3D)

如果上述例子不成功，请打开f12 清空缓存并硬性加载

#### 2更改接口返回  使用本地文件  mock数据

我们可以增加配置 如上方的接口地址 我们配置 返回的结果可以是自己自定义本地文件 如下

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/2b23cd6394f549268efbbac888ca9bcf~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=%2FTURJIJD8A6Nmo0HN1h28CdREVs%3D)

将此接口的返回数据 改为自己本地自定义的文件格式

```js
http://10.56.181.203:3000/list C:\Users\Administrator\Desktop\wh\test.json
```

重新请求接口看返回如下，这是我自己本地的json文件，基于此我们可以进行自定义的mock数据

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/d143c1a0ceef4ee7bae47738d445af18~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=zI%2BWJYbV4okLS6ewKr6r2gDmsPs%3D)

#### 3替换线上的文件，本地文件替换线上环境

加入我们有一个文件上线报错，我们无法线上调试，可以将线上的文件 替换为本地文件，在本地调试

如既可以找任何一个线上的js 替换为本地js 我找的是百度地址的任意一js，我们本地创建一个 alert

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/c5866b2c8e804ca7ad655b59e6195e8e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=SPwBnFbDQN5UsIE%2Fh6QnJNGs9XM%3D)

```js
https://pss.bdstatic.com/static/superman/js/lib/esl-d776bfb1aa.js C:\Users\Administrator\Desktop\wh\test.js
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/4547c7c4bf3c4fc683dc016045f32133~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=AcV80C%2B4GTmZnVen9%2BEF%2B9GBhKE%3D)

可以看到 线上的js已经替换为本地的 你可以修复查找问题

#### 4线上环境注入本地资源

我们可以为线上环境注入资源 如我们注入本地的css 改变线上的地址，可以本地开发 线上的时候直接看效果，方便生产环境部署
为百度诸如一个css 颜色设置为绿色

```js
//color.css

*{
    color: green!important;
}
```

```js
https://www.baidu.com css:///Users\Administrator\Desktop\wh\color.css
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/9ce4fe09fd40425eae0aad325cba6b29~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=hOcnefPgQbmvD084zkpD1Aq7Fb0%3D)

#### 5请求转发

跟场景1效果类同  可以做代理转发 也可以做IP转发
我访问`http://aaa.com` 会被转发到  ` http://www.baidu.com`,可借助此实现跨域代理

```js
http://aaa.com http://www.baidu.com
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/cc4d6a2d42054a27ac2329438e46c5db~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=jQPQjHJyDpS7bXhP54c1x7rOry4%3D)

#### 6线上环境注入代码 如移动端注入 vconsole

首先 values 创建引入及执行的代码段

`vconsle.js`是源码

`newconsole.js`实例化

```js
new VConsole();
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/c0a1a56e437341929a1bc64070b51a66~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=nw1NT90JXR%2FJ40%2FK4yVyuxNAaKc%3D)

rules做如下配置

```js
https://www.baidu.com jsPrepend://{vconsole.js} # 本地引入
https://www.baidu.com jsPrepend://{newconsole.js} # 实例化
```

执行 可以看见 我给百度增加了 vconsole

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b544dcf6a437415789b14813f9a3475d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=BGDF3fGyXCP6%2F1MGE5PyMWfyfbo%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/10a994a290d249d69d711388f3f77608~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=gM9YKeV%2FY7EfglHD9ilCVNOXoyo%3D)

借助此你可以很方便的调试线上及移动端

#### 7打印日志  利用抓包调试请求

出了上面的注入vconsole 我们可以开启日志功能  我们可以在whistle看见所有的请求，也起到了线上移动端调试功能

```js
https://www.baidu.com log://
```

可在newwork查看到 请求 console也可以打印出来

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/02787e96ac5246d9a12ab3abb74d1aa3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=PvLH9P7GWWCRXASi62mX1ZnhgUs%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/249afdafee214e9fbe227e486ff46f4b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071469&x-orig-sign=JpX2Mf41IG9PMIozj0UuJodJfuk%3D)

### 总结

我们介绍了如何安装 `whistle` 特介绍了使用场景，如设置代理 诸如资源等等，
