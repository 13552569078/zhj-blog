### 背景
最近有朋友要搭建一个vue3+ts的项目，本着帮一把的原则，搭建了一个，仅仅作为参考，市场很多成熟框架如admin等。好记性不如烂笔头记录下，目录如下 后面不在重复提及 

![微信截图_20240417163427.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6912c02bfb4241ceb40b79ad6171e2e9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=347&h=531&s=50370&e=jpg&b=1a1a1a)
### 项目搭建
采用`vite `  `vue3`  `ts`  `eslint` ` pinia`  `tailwindcss`  `element-plus` 等搭建项目，下面分布记录下

### vite初始化项目

```js
npm create vite
```

![微信截图_20240417161623.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65afdb01654248309ff1b8e8a74b8bd8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=466&h=150&s=16762&e=jpg&b=0c0c0c)

输入文件名称，回车即可，默认名称为`vite-project`



![微信截图_20240417161951.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e4212cce87d46ee863b3193ccd98ad2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=607&h=324&s=66121&e=jpg&b=0c0c0c)

选择`vue` `ts` 回车 创建成功   


```js
cd vite-tets-work
  npm install
  npm run dev
```

安装依赖 dev项目启动成功， 默认`http://localhost:5173/`端口

### 安装sass

```js
 npm i -D sass
```
### 安装@types/node
解决vite.config.ts的  `import path from "node:path";` ts报错问题

```js
npm i @types/node -D
```

### 设置别名和sever 设置代理及端口设置
`vite.config.ts`文件做以下修改,此时端口已更改且默认打开浏览器


```js
import { defineConfig } from 'vite'
import path from "node:path";
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue()
  ],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // 配置代理
  server: {
    host: "0.0.0.0",
    port: 8861,
    open: true,
    proxy: {
      "/api": {
        target: "***********",
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      }
    },
    cors: true,
  },
})
```
`tsconfig.json` 做以下修改

```js
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    // @设置
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue", "src/**/*.d.ts"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

```

### router路由


```js
npm i vue-router -S
```
创建`router`文件夹，内部创建`index.ts`

```js
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import TestRoutes from '@/views/test/routes';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/test',
    name: 'test',
    children: [...TestRoutes],
    meta: {
      sort: 1,
      icon: 'FillSet',
      title: '测试带单',
      menu: true
    }
  }
];
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
  history: createWebHistory(),
  routes
});

router.beforeEach((to: any, from, next) => {
  next();
});

export default router;

```
创建`views`文件夹，下一级创建`login` `test`文件夹。目录如下，请自行创建对应文件

![微信截图_20240417163757.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fe30e4e7cfc40d58352e0d6da1bf978~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=326&h=162&s=14437&e=jpg&b=191919)

`test` 中的 `routes.ts`如下

```js
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: 'test1',
    name: 'test1',
    component: () => import('@/views/test/test1.vue'),
    meta: {
      title: '测试1'
    }
  },
  {
    path: 'test2',
    name: 'test2',
    component: () => import('@/views/test/test2.vue'),
    meta: {
      title: '测试2'
    }
  }
];

export default routes;

```

`main.ts` 引用路由

```js
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// routes
import router from "./router/index";

const app = createApp(App);
app.use(router);
app.mount("#app");

```

`app.vue`文件引入 `<router-view/>`

```js
<template>
  <div>
    <router-view/>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

```

此时如果报ts `找不到模块“vue-router”或其相应的类型声明`重新打开下vscode即可

重新 `npm run dev` 默认`http://localhost:8861/login` 打开你的login组件，  `http://localhost:8861/test/test1`会打开test下的test1组件。

### 安装pinia
[pinia](http://pinia.cc/docs/introduction.html)

```js
 npm i pinia -S
 npm i pinia-plugin-persistedstate -S
```

`pinia-plugin-persistedstate`为了持久化pinia<br />
创建 `store`文件夹，内部创建 `use-user.ts`，内容如下


```js
// src/stores/counter.ts
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useUserInfoStore = defineStore(
  'userInfo',
  () => {
    const user = reactive({
      name: '',
      age: '',
      sex: ''
    });

    const setUserInfo = (data: { name: string, age: string, sex: string }) => {
      Object.assign(user, data);
    };

    return { user, setUserInfo };
  },
  {
    persist: true,
  }
);

```
`login` 中的`index.vue`修改为

```js
<template>
  <div>
    <span class="text-[#ff0000]">{{ user }}</span>
    <button @click="addStore">点击</button>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useUserInfoStore } from "@/store/use-user";

const userInfoStore = useUserInfoStore();

const { user } = storeToRefs(userInfoStore);

const addStore = () => {
  userInfoStore.setUserInfo({
    name: "张三",
    age: Math.random() * 100 + "",
    sex: "男"
  });
};
</script>

```

`test`中的 `test1.vue`修改为

```js
<template>
    <hl-group class="empty" align="items-center items-middle" dir="vertical" gap="var(--md)">
      {{ JSON.stringify(user) }}
    </hl-group>
  </template>

<script lang="ts" setup>
import { useUserInfoStore } from '@/store/use-user';
import { storeToRefs } from 'pinia';

const userInfoStore = useUserInfoStore();

const { user } = storeToRefs(userInfoStore);
</script>

```

`main.ts`中引入`pinia`


```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

//routes
import router from "./router/index";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app= createApp(App)

app.use(pinia);
app.use(router);
app.mount('#app');

```

此时`login`组件操作，可修改`pinia`， `test1`组件会获取到`pinia`状态， 此时ts 报错 `store找不到`重启vscode即可

### 安装element-plus @element-plus/icons-vue 及动态导入
[element-plus](https://element-plus.org/zh-CN/component/overview.html)
`unplugin-vue-components`  `unplugin-auto-import`自动导入插件，可以按需引入不用此插件

```js
npm i element-plus @element-plus/icons-vue -S
npm install unplugin-vue-components unplugin-auto-import -D
```
`vite.config.ts`做更改

```js
import { defineConfig } from 'vite'
import path from "node:path";
import vue from '@vitejs/plugin-vue'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/vite';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: "src/components.d.ts",
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: "src/auto-import.d.ts",
    })
  ],
  base: "./",
  // base: "/rag",
  // 配置别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // 配置代理
  server: {
    host: "0.0.0.0",
    port: 8861,
    open: true,
    proxy: {
      "/api": {
        target: "***********",
        changeOrigin: true,
        secure: false,
      }
    },
    cors: true,
  },
})
```

`login`组件做更改

```js
<template>
  <div>
    <span>{{ user }}</span>
    <button @click="addStore">点击</button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useUserInfoStore } from "@/store/use-user";

const userInfoStore = useUserInfoStore();

const { user } = storeToRefs(userInfoStore);

const addStore = () => {
  userInfoStore.setUserInfo({
    name: "张三",
    age: Math.random() * 100 + "",
    sex: "男"
  });
};
</script>
```
可见`element-plus`已经引入，button组件展示

### 安装tailwindcss
[tailwindcss](https://tailwind.nodejs.cn/)

```js
npm install -D tailwindcss postcss autoprefixer
```


```js
npx tailwindcss init -p
```

两步骤操根目录生成 `postcss.config.js`

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```
`tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}


```
有次两步文件及初始化成功，创建`styles`文件夹 下级创建`index.css` `tailwind.css`  

`index.css`

```js
@import url('tailwind.css');
```

`tailwind.css`

```js
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`main.ts` 引入 `tailwindcss`


```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import "@/styles/index.css";

//routes
import router from "./router/index";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app= createApp(App)

app.use(pinia);
app.use(router);
app.mount('#app');

```

`tailwind.config.js` 做如下更改


```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  corePlugins: {
    preflight: false
  },
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        title: "#202020",
        secondTitle: "#8A8A8A",
        normal: "#4b4b4b",
        light: "#dddddd",
        active: "#2C54D1",
        disabled: "#aaaaaa",
      },
      fontSize: {
        20: "20px",
        18: "18px",
        16: "16px",
        14: "14px",
      },
    },
  },
  plugins: [],
}


```

`login` 中的 `index.vue`试用下 `tailwindcss` `class="text-[#ff0000]"` 样式已生效

```js
<template>
  <div>
    <span class="text-[#ff0000]">{{ user }}</span>
    <button @click="addStore">点击</button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useUserInfoStore } from "@/store/use-user";

const userInfoStore = useUserInfoStore();

const { user } = storeToRefs(userInfoStore);

const addStore = () => {
  userInfoStore.setUserInfo({
    name: "张三",
    age: Math.random() * 100 + "",
    sex: "男"
  });
};
</script>
```

此时如果 `tailwind.css` 报错 `Unknown at rule @tailwindcss(unknownAtRules)`，在跟目录创建`.vscode`下级`settings.json` ，可消除报错

```js
{
    "css.lint.unknownAtRules": "ignore"
  }
  
```
#### 适配原理
我们可以看到`tailwindcss`尺寸都是基于rem的 如下

![微信截图_20240510171000.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50815d6800d44ce7b22701f2fa5b0fd8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=734&h=497&s=80316&e=jpg&b=ffffff)

![微信截图_20240510171011.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/696e4c0af83b46509d7e11a761c3b802~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=827&h=571&s=80769&e=jpg&b=ffffff)

谷歌浏览器的`html` 的`font-size: 16px`，所以`1rem 对应16px`,基于此我们可以更具屏幕宽度对应根文字大小，tailwindcss可基于`html` 的`font-size`来适配<br>
在html文件中增加如下代码。默认1920是16px，动态计算宽度来适配，

```js
<script>
    window.addEventListener("resize", () => {
      const screenWidth = window.innerWidth;
      const baseFontSize = 16; // 当屏幕宽度为1920px时的字体大小
      const baseScreenWidth = 1920;

      const fontSize = (screenWidth / baseScreenWidth) * baseFontSize;

      // 假设你想要改变的是body元素的字体大小
      document.documentElement.style.fontSize = `${fontSize}px`;
    });

    // 初始设置
    window.dispatchEvent(new Event("resize"));
  </script>
```
#### 安装postcss-pxtorem 插件，将px转为rem

`npm i postcss-pxtorem -S`
`postcss.config.js`更改为


```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 16, // (Number | Function) 表示根元素字体大小或根据input参数返回根元素字体大小
      unitPrecision: 5, // （数字）允许 REM 单位增长到的十进制数字
      propList: ["*"], // 可以从 px 更改为 rem 的属性 使用通配符*启用所有属性
      selectorBlackList: [], // （数组）要忽略并保留为 px 的选择器。
      replace: true, // 替换包含 rems 的规则，而不是添加回退。
      minPixelValue: 0, // 最小的转化单位
      exclude: /node_modules/i, // 要忽略并保留为 px 的文件路径
    },
  },
};

```
这样可以按照标准设计稿1920对应的尺寸来开发了 如设计稿`120px` 可 写为 `tailwindcss`的 `w-[120px]`

### eslint 
恰逢eslint@9 及扁平化配置出来，技术有限，配置了半天没搞定扁平化配置，还是使用非扁平化的配置方式，
`package.json`中`devDependencies`增加如下依赖 [eslint](https://eslint.org/)，哪位大佬搞出扁平化配置了，踢我一脚

```js
"@typescript-eslint/parser": "^7.7.0",
"@vue/eslint-config-standard": "^8.0.1",
"@vue/eslint-config-typescript": "^13.0.0",
"eslint": "^8.57.0",
"eslint-plugin-import": "^2.29.1",
"eslint-plugin-node": "^11.1.0",
"eslint-plugin-promise": "^6.1.1",
"eslint-plugin-vue": "^9.25.0",
"vite-plugin-eslint": "^1.8.1",
"prettier-eslint": "^16.3.0",
```
重新` npm i` 安装依赖

根目录创建`.eslintignore`

```js
**/iconfont.js
**/flexable.js
src/apis/modules/*
src/apis/**/model.ts
node_modules

```
`.eslintrc.cjs`

```js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "@vue/standard",
    "@vue/typescript/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  ignorePatterns: [
    "*.config.*",
    "dist/*",
    "build/*",
    "public/*",
    "src/apis/modules/**",
  ],
  rules: {
    "no-console": "error"
  },
  globals: {
    uap: "readonly",
    uni: "readonly",
    regist: "readonly",
    defineProps: "readonly",
    defineOptions: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
  },
};

```

打开vscode 安装 `eslint` 插件，打开保存即可

![微信截图_20240417171924.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3fc3602f35fb4b1aa8db3f7bc05d463f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1241&h=299&s=142616&e=jpg&b=1e1e1e)

![微信截图_20240417172003.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8832a0272674d79a4a3107044d39e9f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=869&h=705&s=244476&e=jpg&b=1c1c1c)


![微信截图_20240417172018.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2fc1488ff95472794776715ebef5212~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1116&h=812&s=185361&e=jpg&b=202020)

在`test` `test1.vue` 写一句`console.log(1111)` `eslint已经生效`

![微信截图_20240417173002.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f268fbc4f7748469b3f3dac3035ae7c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=724&h=374&s=78459&e=jpg&b=202020)

### 安装axios


```js
npm i axios -S
```
关于 `axios` 一个封装请求，尅要根据自己业务需要特定的封装，官方文档如下 [axios](https://www.baidu.com/link?url=Zuwad2Hr5w6sIfnUsGZHUlHCZTf_buooUwzq7qn_bC1wrIlNZZ5yRupJRFDrTue9&wd=&eqid=c71938650001e8eb00000003661f973e)

### 结尾

好了 结束 







