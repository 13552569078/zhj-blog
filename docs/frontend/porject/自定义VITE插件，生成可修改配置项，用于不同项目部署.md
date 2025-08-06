## 背景

我们做产品开发，经常遇见部署不同的项目，尤其是部署项目后后期免不了也要修改配置项，如果我们都写入环境变量中，每次都需要 前端 `npm run build:XXX`发版

此文章基于`vite` ，就是解决这个痛点的，方法如下
1：我们根据不同的项目，创建不同的打包命令，在`package.json`中增加不同项目的打包命令 如下

```js
"scripts": {
    "dev": "vite",
    "start": "vite --mode zhongyuan",
    "build:130": "vite build --mode 130",
    "build:182": "vite build --mode 182",
    "build:zhongyuan": "vite build --mode zhongyuan",
    "build:deyang": "vite build --mode deyang",
    "build:sjz": "vite build --mode sjz",
  },
```

`"build:130"` 和 `"build:182"` 等 就是不同项目的环境变量

2: 根目录创建 对应的环境变量配置文件 如 `.env.130`  `.env.182`, 如下

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/eb8d7a7daf674e53bd80f00a8a3945f5~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071611&x-orig-sign=781XYmtzAxeRuy9mbxhXEUZlz9k%3D)

3: `vite`打包生成 `setting.json`,默认值就是上述的环境变量

4: 在页面初始化(我得是在axios实例中，get请求这个`setting.json`，修改全局配置)

为了实现上述功能需要以下步骤来实现

## 创建vite插件，生成 `setting.json`

基于你已经在`package.json`中增加不同项目的打包命令，也创建了不同的`.env`环境配置

## 创建  `global-api.ts` 用于获取全环境配置

```js

// 定义 Indexable 类型
type Indexable<T> = {
  [key: string]: T;
};

// 定义 GlobalAPI 对象
const GlobalAPI: Indexable<any> = {
  config: {}, // 用于存储环境变量
};

const devConfig: Indexable<any> = {};
for (const key in import.meta.env) {
  if (key.startsWith("VITE_")) {
    devConfig[key] = import.meta.env[key];
  }
}
GlobalAPI.config = devConfig;

export { GlobalAPI };

```

## 其他组件使用 `GlobalAPI`

```js
import { GlobalAPI } from "@/constants"; // 换成你得暴露地址
document.title = GlobalAPI?.config?.VITE_SYSTEM_TITLE || "政务知识助手";
```

## 创建 `vite-plugin-generate-settings.js` vite插件

```js
// vite-plugin-generate-settings.js
import fs from 'fs';
import path from 'path';
import { loadEnv } from 'vite';

/**
 * @param {object} options
 * @param {string} options.mode - Vite build mode
 * @param {string} options.envDir - Directory where .env files are located
 * @param {string | string[]} [options.prefixes=['VITE_']] - Prefixes to filter
 * @returns {import('vite').Plugin}
 */
function generateSettingsPlugin(options) { // 接收一个 options 对象
  const { mode, envDir, prefixes = ['VITE_'] } = options; // 解构参数

  if (!mode || !envDir) {
     // 在配置阶段就进行检查，确保必要参数已提供
     throw new Error('[Generate Settings] Missing required options: mode and envDir');
  }

  let viteConfig;
  let settings = {};

  return {
    name: 'vite-plugin-generate-settings',
    apply: 'build',

    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
      // 使用传入的 mode 和 envDir
      const env = loadEnv(mode, envDir, '');

      settings = {};
      const VITE_PREFIXES = Array.isArray(prefixes) ? prefixes : [prefixes];

      for (const envKey in env) {
        if (VITE_PREFIXES.some(prefix => envKey.startsWith(prefix))) {
          settings[envKey] = env[envKey];
        }
      }
       console.log('\n[Generate Settings] Filtered settings:', settings);
    },

    writeBundle(options) {
       // ... (writeBundle 逻辑保持不变)
       if (!viteConfig) {
         console.error('[Generate Settings] Vite config not resolved.');
         return;
       }
       if (Object.keys(settings).length === 0) {
         console.warn('[Generate Settings] No variables starting with VITE_ found. settings.json will be empty or not generated.');
       }

      const outDir = options.dir || viteConfig.build.outDir || 'dist';
      const filePath = path.resolve(outDir, 'setting.json');

      try {
        if (!fs.existsSync(outDir)) {
          fs.mkdirSync(outDir, { recursive: true });
        }
        fs.writeFileSync(filePath, JSON.stringify(settings, null, 2));
        console.log(`\n[Generate Settings] Successfully generated setting.json at: ${filePath}`);
      } catch (error) {
        console.error(`[Generate Settings] Error writing setting.json: ${error}`);
      }
    }
  };
}

export default generateSettingsPlugin;
```

此插件的作用就是，获取当前的环境变量已 `VITE_`开头的，并且生成对用的 `setting.json`

## `vite.config.ts 引用此插件`

```js
export default defineConfig(({ command, mode }) => {
  const root = process.cwd();
  return {
    plugins: [
      generateSettingsPlugin({
        mode: mode,               // 传递当前的 mode
        envDir: root,             // 显式传递 env 文件目录 (通常是项目根目录)
     })
    ],
  }
})
...你的其余配置
```

## 执行 `npm run build:xxx`

执行 `npm run build:xxx` 默认会在`dist`文件目录中生成， `setting.json`

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/17901b567d7d431fbcacf2a7dcd2b4a4~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071611&x-orig-sign=o8OHWG%2FABROGjUJ7EGrGhnxbFaI%3D)

```js
{
  "VITE_SYSTEM_TITLE1": "系统名称1",
  "VITE_SYSTEM_TITLE2": "系统名称2",
  "VITE_SYSTEM_TITLE3": "系统名称3",
  "VITE_SYSTEM_TITLE4": "系统名称4",
}
```

## 初始化的时候重新获取  `setting.json`更改配置 （我的是在axios中）

鉴于我们全局有请求接口，如获取用户信息的，我们在`axios`中，重新设置配置项

```js
class Request<R = any, D = any> {

constructor(config: InstanceRequestConfig<D, R>) {
    this.config = config;
    // 在此动态获取及配置
    if (config?.serverConfig && typeof config?.serverConfig === 'object') {
      const xhr = new XMLHttpRequest();
      // 此处注意路径
      xhr.open('get', `/setting.json`, false);
      xhr.onreadystatechange = () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
          const responseJson = JSON.parse(xhr.responseText);
          Object.assign(GlobalAPI?.config, responseJson);
        }
      };
      xhr.send();
    }
    this.instance = axios.create(config);
    this.registerInterceptors();
    config.generateRequestKey &&
      (this.generateRequestKey = config.generateRequestKey);
  }

}


// 应用class

const request = new Request<Service.RequestResult>({
  timeout: 300000, // 超时五分钟
  baseURL: import.meta.env.VITE_BASE_API,
  withCredentials: false,
  // 取消重复请求
  cancelDuplicateRequest: false,
  
  // 开发环境不设置仅用默认值   生产环境设置动态设置
  serverConfig: import.meta.env.DEV ? undefined: GlobalAPI.config,
  
  })
```

## 部署成功后，修改 `setting.json`,此时我们动态修改一个数据，刷新页面 页面的  `GlobalAPI`已经生效

## 总结

以上是适用于多个项目部署 以及部署后有修改配置需求的， 当然你也可以不自定义插件，将 `setting.json`存放于服务器的任何一个目录，动态请求即可，

注意： 请求`setting.json`的时机，对于静态的 `import` 极大概率在你获取到配置项之前就生效了，有好的交换`setting.json`时机，也可以在评论告知下，仅供参考
