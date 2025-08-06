npm对于已有的包更新和新的包发布，认为原先的npm登录密码安全性太差，增加了2FA校验，[npm给出的官方文档地址为：](https://docs.npmjs.com/configuring-two-factor-authentication)https://docs.npmjs.com/configuring-two-factor-authentication

## 1：如何开启2FA
1> 登录到npm官网，地址[https://www.npmjs.com/](https://www.npmjs.com/)，输入账号密码

![1.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a98a0a3e27a44959ae2a9d3af477be66~tplv-k3u1fbpfcp-watermark.image?)

![2.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9572a289cacb45858d73a185a1ca29d0~tplv-k3u1fbpfcp-watermark.image?)

2> 手机应用商店下载Authenticator App

![5.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e19bad4aba3a4a4ca70167af399d7c12~tplv-k3u1fbpfcp-watermark.image?)

3> npm 中选择QE登录，用下载的Authenticator App 扫码关联，这样Authenticator App 可关联到你的npm账户

4> npm 源切换到npm官方路径

5>npm login输入账号密码

6>npm notice Please use the one-time password (OTP) from your authenticator application 提示时输入一次性校验密码

7：npm publish 发布时候 需要增加上动态密码 npm publish --opt=六位动态密码

提示：开启2FA校验后 发布和更新 均需要一次性密码，当然 你也可以在account中 关闭掉一次密码登录