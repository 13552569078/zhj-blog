### 背景
对于一些演示项目，或者公司内部没有流水线的情况下，我们前端项目部署问题，需要频繁额`ssh` `unzip`等等操作极其麻烦，或者使用`xftp`等传出工具，也需要频繁打开客户端 或者频繁的上传拖动打包文件。

基于此，我们前端项目有没有直接再没有流水线的情况下，直接直接执行 `npm run build:deploy`或者 `npm run build` 再次 `npm run deploy`就直接更新服务器资源了，

以上适用用`nginx`部署的前端服务，每次部署完文件 不需要reload 或者 重启镜像的情况

### 实现 

#### 安装依赖


```js
npm i scp2 -S
```

#### `package.json` 中增加命令 


```js
 "deploy": "node deploy.js",
  "build:deploy": "npm run build && npm run deploy",
```

#### 根目录增加
`deploy.js`文件，你需要修改的就是 服务器的信息 以及部署的目录


```js
import scpClient from 'scp2'
import path from 'path'
import fs from 'fs'

// 服务器配置
const serverConfig = {
  host: '172.11.111.222',    // 服务器IP
  port: 111,                 // 端口
  username: 'root',          // 用户名
  password: '******',  // 密码
  path: '/aaa/bb'          // 部署路径
}

const localDistPath = path.join(process.cwd(), './dist')

if (!fs.existsSync(localDistPath)) {
  console.error('错误：dist目录不存在，请先执行构建命令')
  process.exit(1)
}

console.log(`开始上传dist文件夹到 ${serverConfig.host}:${serverConfig.path}...`)

scpClient.scp(
  localDistPath,
  serverConfig,
  (err) => {
    if (err) {
      console.error('上传失败:', err)
      process.exit(1)
    } else {
      console.log('✅ dist文件夹已成功上传到服务器!')
      process.exit(0)
    }
  }
)

```

#### 更安全的**SFTP**


```js
import Client from 'ssh2-sftp-client'
import path from 'path'
import fs from 'fs'

// 服务器配置
const serverConfig = {
  host: '172.11.111.222',    // 服务器IP
  port: 111,                 // 端口
  username: 'root',          // 用户名
  password: '******',  // 密码
  path: '/aaa/bb'          // 部署路径
}

const localDistPath = path.join(process.cwd(), './dist')

if (!fs.existsSync(localDistPath)) {
  console.error('错误：dist目录不存在，请先执行构建命令')
  process.exit(1)
}

console.log(`开始上传 dist 文件夹到 ${serverConfig.host}:${serverConfig.path}...`)

const sftp = new Client()

sftp.connect({
  host: serverConfig.host,
  port: serverConfig.port,
  username: serverConfig.username,
  password: serverConfig.password
})
  .then(() => {
    return sftp.uploadDir(localDistPath, serverConfig.path)
  })
  .then(() => {
    console.log('✅ dist文件夹已成功上传到服务器!')
    process.exit(0)
  })
  .catch((err) => {
    console.error('上传失败:', err)
    process.exit(1)
  })
  .finally(() => {
    sftp.end() // 关闭SFTP连接
  })
```

### 安全优化
服务器信息不应该写死，且不应该传递到 仓库中，可以自己创建 环境变量写入，并忽略提交

#### 根目录创建 `.env.deploy`环境配置文件


```js
# .env.deploy
VITE_SFTP_HOST=172.11.111.222
VITE_SFTP_PORT=111
VITE_SFTP_USERNAME=root
VITE_SFTP_PASSWORD=******
VITE_SFTP_REMOTE_PATH=/aaa/bb
```

#### `package.json`做更改


```js
 "build:deploy": "vite build && node --env-file=.env.deploy deploy.js",
    "deploy": "node --env-file=.env.deploy deploy.js",
```

####  `.gitignore`修改 

增加 `.env.deploy` 忽略提交

####  deploy.js更改


```js
import Client from 'ssh2-sftp-client'
import path from 'path'
import fs from 'fs'

// 从环境变量获取配置
const serverConfig = {
  host: process.env.VITE_SFTP_HOST,
  port: parseInt(process.env.VITE_SFTP_PORT || '22'),
  username: process.env.VITE_SFTP_USERNAME,
  password: process.env.VITE_SFTP_PASSWORD,
  path: process.env.VITE_SFTP_REMOTE_PATH
}


const localDistPath = path.join(process.cwd(), './dist')

if (!fs.existsSync(localDistPath)) {
  console.error('错误：dist目录不存在，请先执行构建命令')
  process.exit(1)
}

console.log(`开始上传 dist 文件夹到 ${serverConfig.host}:${serverConfig.path}...`)

const sftp = new Client()

sftp.connect({
  host: serverConfig.host,
  port: serverConfig.port,
  username: serverConfig.username,
  password: serverConfig.password
})
  .then(() => {
    return sftp.uploadDir(localDistPath, serverConfig.path)
  })
  .then(() => {
    console.log('✅ dist文件夹已成功上传到服务器!')
    process.exit(0)
  })
  .catch((err) => {
    console.error('上传失败:', err)
    process.exit(1)
  })
  .finally(() => {
    sftp.end() // 关闭SFTP连接
  })
```

#### 执行
1:完整流程：

1.  先运行 `vite build` 构建项目
1.  如果构建成功，自动运行部署脚本
1.  部署脚本会读取 `.env.deploy` 中的敏感信息（服务器账号等）
1.  将 `dist` 目录上传到服务器


2:也可在直接一键式部署 


```js
npm run build:deploy
```







