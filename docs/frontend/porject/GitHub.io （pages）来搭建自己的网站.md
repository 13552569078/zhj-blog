## 1：什么是GitHub.io，它能干什么
GitHub.io 就是GitPage,可以展示你的项目及项目网站的托管工具，可以理解为免费的阿里云等服务器，可以展示网站（比如你想搭建一个自己的博客，项目文档等）
## 2：如何使用GitHub.io
1> 首选需要有一个github账号，[没有的话可以去注册](https://github.com/signup)<br/>
2> 登录github 进入主页面<br/>

![1.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d022b910ed404f19b10fdc4e551230c7~tplv-k3u1fbpfcp-watermark.image?)<br>
3> 创建项目 在主页找到Your repositories,新建仓库

![微3.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d7fa8aace1244a492486d3763af28ad~tplv-k3u1fbpfcp-watermark.image?)
4> 仓库名称必须是【username.github.io】,用户名跟Owner的名称需要保持一致，注意英文大小写，均小写即可

![4.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ed6297924eb40849b43b5eb193e4bd4~tplv-k3u1fbpfcp-watermark.image?)

5> 进入项目将项目clone都本地
`git clobe 项目地址`

6> clone都本地后，在项目中添加二级文件夹（英文名称）我添加的是hongluan-ui文件夹

![5.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fba3db46cb724bd79698f79afed5fd21~tplv-k3u1fbpfcp-watermark.image?)

7> hongluan-ui文件夹中 增加index.html静态文件(可以引入css img等)，可以是打包后的项目，我的是打包后的文档，

8> push代码（git提交流程省略，不会的自己查资料）

9> 一段时间后 浏览器输入 https://username.github.io 查看项目，usename是hub登录名 ,我的访问地址是https://13552569078.github.io/hongluan-ui/