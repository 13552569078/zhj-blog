## 为什么使用http-server
1：有时候我们打开一个文档使用file协议打开的时候，不能发送ajax请求，只能使用http协议才能请求资源，所以此时我们需要在本地建立一个http服务，通过IP加端口号，来访问资源，此时就用到了http-server<br />
2：搭建本地的文档库环境，解决github io翻墙
## 如何使用
1)确保已有Node环境<br />
2)全局安装http-server

```js
npm install http-server -g
```
3)生成bat文件 http-server E:/dist -p 本地运行端口号

```js
http-server E:/dist -p 3000
```

![微信截图_20230209194103.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bbed5a0e32da4e4183755fd4e9129cc9~tplv-k3u1fbpfcp-watermark.image?)<br />
服务会启动，打开对应的环境即可<br />
4)在E:/dist 创建dist目录，dist中创建文件夹，文件中加入静态文件即可访问

如http://10.32.73.78:3000/hongluan/#/zh-CN/guide/overview