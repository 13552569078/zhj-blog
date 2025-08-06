### 背景

react项目中，开发单页面应用，`reactRouter`免不了使用，今天记录下路由的配置及使用规范，版本为"react-router-dom": "^6.26.0"

### 创建测试项目

```js
npm create vite@latest react-test
```

选择react 即可，按提示安装依赖并启动，我这里选择ts开发

### 安装路由

```js
npm install react-router-dom -S
```

创建`pages`及`routers`文件夹，分别放置页面及路由文件

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/6ae134cc7b96453a93fe133b2740e9a9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755072352&x-orig-sign=B3qKVMT9DSbOrB1rDZ%2BamKnc81s%3D)
`routers`创建`index.ts`配置路由

```js
// 导入创建路由的函数
import { createBrowserRouter } from 'react-router-dom';
import NoMatch from "../pages/no-match";
import Login from "../pages/login";

// 创建router路由实例对象，并配置路由对应关系（路由数组）
const router = createBrowserRouter([
    {
        // 匹配不到路由
        path: '*',
        Component: NoMatch,
    },
    {
        // 默认路由
        path: '/',
        Component: Login,
    },
    {
        // 登录
        path: '/login',
        Component: Login,
    }
]);

export default router;

```

在`app.tsx`中引入路由即可

```js
import { RouterProvider } from "react-router-dom";
import './App.css'

import router from "./routers";
  

// 渲染应用  
function App() {  
  return (  
    <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
  );  
}  

export default App

```

此时启动项目，可打开登录页，路由匹配不到可到未匹配页面，后面的例子再此项目上实践

### 路由跳转

#### 申明式导航  `link`

登陆组件 `login` `index.tsx`代码引入，路由做对应的配置，创建对应测试文件，可实现跳转

```js

import { Link } from 'react-router-dom';  
const Login: React.FC = () => {
  return (
    <div>
      <h2>我是登录页面</h2>
      <Link to="/test1">test1</Link><br></br>
      <Link to="/test2">test2</Link><br></br>
    </div>
  );
};

export default Login;

```

#### 编程式导航  `navigate`

```js
import { Link, useNavigate } from "react-router-dom";
const Login: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>我是登录页面</h2>
      {/* <Link to="/test1">test1</Link><br></br>
      <Link to="/test2">test2</Link><br></br> */}
      <button onClick={() => navigate("/test1")}>test1</button>
      <button onClick={() => navigate("/test2")}>test2</button>
    </div>
  );
};

export default Login;

```

### 路由传参

#### 直接传入路径字符串及接收

```js
import { Link, useNavigate } from "react-router-dom";
const Login: React.FC = () => {
  const navigate = useNavigate();

  const goTest2 = () => {
    navigate("/test2", { state: { a:10 } });
  };

  return (
    <div>
      <h2>我是登录页面</h2>
      {/* <Link to="/test1">test1</Link><br></br>
      <Link to="/test2">test2</Link><br></br> */}
      <button onClick={() => navigate("/test1?param1=value1&param2=value2'")}>
        test1
      </button>
      <button onClick={goTest2}>test2</button>
    </div>
  );
};

export default Login;

```

```js
import { Link,useSearchParams  } from 'react-router-dom';  
const Test1: React.FC = () => {

  const [params] = useSearchParams();

  return (
    <div>
      <h2>Test1</h2>
      <Link to="/">首页</Link><br></br>
      <p>传参：{params.get('param1')}</p>
    </div>
  );
};

export default Test1;

```

```js
<button onClick={() => navigate("/test1?param1=value1&param2=value2'")}>
        test1
      </button>
```

字符串传参，直接在`navigate`拼接即可，`useSearchParams`来接收参数

#### **Location State**

```js
import { Link, useLocation } from "react-router-dom";
const Test2: React.FC = () => {
  const { state } = useLocation();

  return (
    <div>
      <h2>Test2</h2>
      <Link to="/">首页</Link>
      <br></br>
      <p>接收参数：{state.a}</p>

    </div>
  );
};

export default Test2;

```

```js
const goTest2 = () => {
    navigate("/test2", { state: { a:10 } });
  };
```

`goTest2`使用`Location State`传参， `useLocation`来接收参数

### 路由嵌套

*   在一级路由中又内嵌了其他路由，这种关系就叫做**嵌套路由**；
*   嵌套至一级路由内的路由又称为**二级路由**

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/f0fac317d9704c3d8e81c527730d1f8e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755072352&x-orig-sign=%2F1VRhvZWb82qo%2FGhDASi7ysL%2Ftk%3D)

*   使用 **`children`属性** 配置 **路由 嵌套关系**；

*   使用  **`<Outlet />`组件** 配置 **二级路由 渲染位置**（二级路由出口）；

    *   这个组件在哪里，二级路由渲染的位置就在哪里；

```js
// 导入创建路由的函数
import { createBrowserRouter } from "react-router-dom";
import NoMatch from "../pages/no-match";
import Login from "../pages/login";
import Test2 from "../pages/test2";
import Test1Layout from "../pages/test1/test-layout";
import Test1 from "../pages/test1";
import Test11 from "../pages/test1/test1-1";

// 创建router路由实例对象，并配置路由对应关系（路由数组）
const router = createBrowserRouter([
  {
    // 匹配不到路由
    path: "*",
    Component: NoMatch,
  },
  {
    // 默认路由
    path: "/",
    Component: Login,
  },
  {
    // 登录
    path: "/login",
    Component: Login,
  },
  // {
  //     // 测试1
  //     path: '/test1',
  //     Component: Test1,
  // },
  {
    path: "/test1layout",
    Component: Test1Layout,
    children: [
      // 二级路由默认路由
      { index: true, Component: Test1 },
      {
        path: "test1",
        Component: Test1,
      },
      {
        path: "test11",
        Component: Test11,
      },
    ],
  },
  {
    // 测试2
    path: "/test2",
    Component: Test2,
  },
]);

export default router;


```

```js
import { Outlet } from "react-router-dom";
const Test1Layout: React.FC = () => {
  return (
    <div>
      <h2>Test1 layout</h2>
      <Outlet />
    </div>
  );
};

export default Test1Layout;

```

# naviagte传参 及 useLocation 获取参数

```js
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const params = {
      id: 1,
      name: "Example Knowledge",
    };
    navigate("/knowlegeBase", { state: params });
  };

  return (
    <div>
      <button onClick={handleClick}>Go to Knowledge Base</button>
    </div>
  );
};

export default Home;    
```

```js
import React from "react";
import { useLocation } from "react-router-dom";

const KnowledgeBase = () => {
  const location = useLocation();
  const params = location.state;

  return (
    <div>
      <h1>Knowledge Base</h1>
      {params && (
        <div>
          <p>ID: {params.id}</p>
          <p>Name: {params.name}</p>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBase;    
```
