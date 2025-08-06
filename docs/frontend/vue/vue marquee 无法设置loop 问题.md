#### 1：vue项目 使用marquee 文字轮播 设置loop="1"时无效，渲染为loop="1"
`<marquee loop="1">测试得数据</marquee>`
html渲染为

![微信截图_20210419102038.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f11dd90a555a41dd8f68ad1ea5d2d7e3~tplv-k3u1fbpfcp-watermark.image)

可见loop呗=渲染为loop 致使loop="1"失效
# 2：解决 vue ref修改loop

![微信截图_20210419102347.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d91e1dbd24c441c6bb7851e1cfd6679d~tplv-k3u1fbpfcp-watermark.image)

html渲染为

![微信截图_20210419102417.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e59066717db4fe6bc54efc4504f4224~tplv-k3u1fbpfcp-watermark.image)

问题解决