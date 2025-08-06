### 背景
公司一个项目，会部署多台服务器，如演示环境、预生产、开发环境等等，总之环境个数很多，我们不能每次部署都 npm run build一次，我们需要抽出一个配置项，打包一次，交给运维，运维部署只需要修改配置项中的对应key即可

### 何为前端配置项
举个例子，比如系统的title、系统请求的根路径baseAPI、 文件服务器的根路径、地图服务路径、演示的模拟用户信息等，如下

```js
const defaultSettings = {
  minioBase: "http://baidu.com/minio/cestc-xingzhi-bucket", // minio路径
  baseApi: "/api", // 接口的base路径 开发为/api 生产可替换
  title:'测试的系统',
  defaultUser:'张三',
  mapUrl:'地图服务'
};
```

我们现在做的，就是将系统配置项抽离出来成单独文件，打包一次后，要运维修改对应配置，就可以部署多台服务器

### 以VITE为例，vue react均适用
首先我们在public 目录下，创建settings.js 并写入配置项 如上方defaultSettings，在index.html中引入
代码结构如下

![微信截图_20240322164234.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d8b6886d5314365aea661ca3c8a5785~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=556&h=774&s=122922&e=jpg&b=1b1b1b)

![微信截图_20240322164313.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0259b23848e340f890a9d57dd5c7dc9d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=939&h=356&s=78818&e=jpg&b=1d1d1d)

![微信截图_20240322164344.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d36d798c97c04c25b997fb77dfe8523a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1152&h=622&s=179158&e=jpg&b=1d1d1d)

### 代码中如何使用配置项
直接使用即可
![微信截图_20240322164519.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae4cb8b7d6564fd38a41e4e78ac3f744~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1026&h=450&s=184539&e=jpg&b=1f1f1f)

如果使用ts报错，可根目录增加global.d.ts文件，并写好类型

![微信截图_20240322164727.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76180e699b5b4cd78adcb89fd58ed3af~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1114&h=574&s=121551&e=jpg&b=1d1d1d)

如果此时ts仍然报错，查看tsconfig.json是否包含此类型文件

![微信截图_20240322164821.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c42a0125b3384a3a90d87e87bce8d69a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1112&h=715&s=203544&e=jpg&b=1c1c1c)

### settings.js替换为生产配置
如果频繁部署某一个环境，开发环境使用settings.js配置，生产配置的配置项有区别，不能频繁修改打包好的setting.js，这是我们创建一个settings-prod.js，每次build的时候写一个脚本，将setting.js中的内容替换为settings-prod.js的，（当然这是一个实现思路，也可以ngnix配置，做代理，每次访问setting.js映射到服务器的系统配置路径）<br />

现在public创建settings-prod.js，和根目录创建replace-settings.js，replace-settings.js为执行脚本，代码结构如下

![微信截图_20240322165258.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a01c636e38e549f987b285c36068b32e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=934&h=817&s=265318&e=jpg&b=1c1c1c)

replace-settings.js中代码脚本如下，作用是替换settings中的内容

```js
// replace-settings.ts
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const settingsProdPath = path.join(__dirname, "public", "settings-prod.js");
const settingsPath = path.join(__dirname, "public", "settings.js");

async function replaceSettings() {
  try {
    const data = await readFile(settingsProdPath, "utf8");
    await writeFile(settingsPath, data, "utf8");
    console.log("replaced");
  } catch (err) {
    console.error("no replaced", err);
  }
}

replaceSettings();

```

最后配置下package.json，每次build需要先替换文件内容，在打包

```js
"scripts": {
    "dev": "vite",
    "prebuild": "node replace-settings.js",
    "build": "npm run prebuild && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "preinstall": "npx only-allow pnpm"
  },
```

