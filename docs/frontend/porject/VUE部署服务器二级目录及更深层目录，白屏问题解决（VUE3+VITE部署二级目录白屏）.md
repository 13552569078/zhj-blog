### 背景
本文主要介绍 项目如何放到nginx二级目录，或者ngnix部署多个站点，大致3点<br />
1：路由base设置<br />
2: vite或webpack的base设置<br />
3：nginx配置<br />

#### 技术栈
采用的vue3+vite+ts构建的，当然，技术栈不重要，重要的是解决方式，vue3+webpack的方式，放在文章最后解决

### vite
##### 1：根目录新建.env.development文件，环境便令必须‘VITE_’开头

```js
NODE_ENV='development'
VITE_BASE_PATH='/'
```
##### 2：根目录新建.env.production文件，'front-test'为部署服务器的二级目录名称，注意名称统一

```js
NODE_ENV='production'
VITE_BASE_PATH=/front-test/
```
##### 3：package.json 修改，--mode传入 环境变量

```js
"scripts": {
    "dev": "vite --mode development",
    "build": "vue-tsc && vite build --mode production",
    "preview": "vite preview"
  },
```
##### 4：router中，设置base，由于vue-router@4.0以上版本，base字段取消，具体修改如下

```js
// 路由
const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_PATH),
    routes
})
```
`import.meta.env.VITE_BASE_PATH`，可取到环境变量，设置base
##### 5：vite.config.ts
由于vite项目的启动顺序，`import.meta.env.VITE_BASE_PATH`无法在`vite.config.ts`中直接获取，但是提供了`loadEnv(mode, process.cwd())`来获取，具体操作如下,设置vite的base

```js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { UserConfig, ConfigEnv } from 'vite'


// 配置@别名
import { resolve } from "path";

// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite"
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from 'unplugin-vue-components/vite';
// emenet-ui
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_BASE_PATH,
    plugins: [
      vue(),
      AutoImport({
        //安装两行后你会发现在组件中不用再导入ref，reactive等
        imports: ['vue', 'vue-router'],
        //存放的位置
        dts: "src/auto-import.d.ts",
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        // 引入组件的,包括自定义组件
        // 存放的位置
        dts: "src/components.d.ts",
        resolvers: [ElementPlusResolver()]
      }),
    ],
    resolve: {
      // ↓路径别名
      alias: {
        "@": resolve(__dirname, "./src")
      },
    }
  }
})

```
仅仅关注`base`字段设置即可，`plugins`，`resolve`不影响
##### 6：npm run build 把 dist打包好的文件，直接复制到二级目录下，访问即可

### nginx配置

nginx配置，如服务器目录为 `ai-chat-room-h5`，nginx得root默认为html文件夹，可以更改root指向，我这里就不更改了，ng需要对应配置


```js
# 配置前端访问
        location /ai-chat-room-h5/ {
            #二级路由时需要使用别名alias，不用root
            alias html/ai-chat-room-h5/;
            index  index.html;
            #若不配置try_files，刷新会404 history模式
            try_files $uri $uri/ /ai-chat-room-h5/index.html;
        }
```
接口代理 `proxyAiApis`，意思为遇见`proxyAiApis`做代理，为了解决跨域，如：遇见`proxyAiApis`给我代理到 `https://test-zdzk.com`上面<br />
`proxyAiManApis/api/counselling/findSessionId?` 会被代理成`https://test-zdzk.com/api/counselling/findSessionId?`

```js
 location /proxyAiManApis/ {
                proxy_send_timeout 600s;
                proxy_read_timeout 600s;
                proxy_pass http://10.56.180.64:8091/;
        }
```

此时vite.config.js可做同样配置


```js
 '/proxyAiManApis': {
        target: 'http://10.56.180.64:8091',
        changeOrigin: true,
        pathRewrite: {
          '^/proxyAiManApis': ''
        }
      }
```

关于nginx的斜杠问题 可以 参考[nginx斜杠使用](url)

### webpack解决方式
##### 1： `.env.development`  `.env.production` `package.json` 修改雷同，不重复书写
##### 2：router设置base

```js
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
  history: createWebHistory(`/${process.env.PROD_PREFIX}`),
  routes
});
```
`PROD_PREFIX`为webpack中的环境变量名称，可以自行命名，`process.env`在webpack中获取环境变量，注意于vite区分
##### 3：vue.config.js   publicPath

```js
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  publicPath: isProduction ? `/${process.env.PROD_PREFIX}` : '/',
  }
``` 
webpack配置base字段为 `publicPath`，注意于VITE的`base字段区分`

## 三级及更多目录
如项目具体需求，部署的目录不在二级，二级更深的层级，如目录如下，

```js
safety/midscr/zdldzhpc/pc/video-list
```
则需要把

```js
VITE_BASE_PATH=/safety/midscr/zdldzhpc/pc/video-list
```
主意，带不带"/"的问题，只要确保router和publicPath字段拼接成功有"/"开头即可。VITE_BASE_PATH不带"/"则保router和publicPath要拼接"/"；如VITE_BASE_PATH带“/”则不需要拼接，直接取用
