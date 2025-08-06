### 背景
最近公司某些项目需要vue迁移到react技术栈，技术调研react的状态管理工具zustand，相较于redux简便不少，具体的计较可以查看 [zustand官方文档](https://docs.pmnd.rs/zustand/getting-started/introduction)，下面主要讲解下zustand的基本用法。<br />
以下例子采用的是zustand@4.5.2版本

### 安装

```js
npm install zustand
```

### 基础类型
前提：在src目录下创建store文件夹用于统一管理状态，store创建useTest.ts文件，内容如下

```js
import { create } from "zustand";

interface Istore {
  testName: string;
  setTestName: (str: string) => void;
}

export const useTestStore = create<Istore>()((set) => ({
  testName: "",
  setTestName: (str: string) => set(() => ({ testName: str })),
}));

```

创建test.tsx主页面，和组件testA,testB组件，<br />

```js
import TestA from "./a";
import TestB from "./b";

const Test: React.FC = () => {
  return (
    <div>
      <TestA></TestA>
      <hr></hr>
      <TestB></TestB>
    </div>
  );
};

export default Test;

```

```js
import { useTestStore } from "@/store/useTest";

const TestA: React.FC = () => {
  const { testName, setTestName } = useTestStore();

  return (
    <div>
      <span>testName:{testName}</span>
      <button onClick={() => setTestName("testA")}>更改testName</button>
    </div>
  );
};

export default TestA;

```

```js testA
import { useTestStore } from "@/store/useTest";

const TestB: React.FC = () => {
  const { testName, setTestName } = useTestStore();

  return (
    <div>
      <span>testName:{testName}</span>
      <button onClick={() => setTestName("testB")}>更改testName</button>
    </div>
  );
};

export default TestB;

```
此时可见两组间共享状态，一个变动另一个自动刷新

![微信截图_20240327105211.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5004fa519fa04b3bbb446af16a0be3ea~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=436&h=120&s=14172&e=jpg&b=fefefe)

### 引用类型
useTest.ts
```js
import { create } from "zustand";

interface Iinfo {
  name: string;
  age: number;
}

interface Istore {
  testName: string;
  userInfo: Iinfo;
  setTestName: (str: string) => void;
  setUserInfo: (data: Iinfo) => void;
  setUserInfoName: (str: string) => void;
  setUserInfoAge: (str: number) => void;
}

export const useTestStore = create<Istore>()((set) => ({
  testName: "默认值",
  setTestName: (str: string) => set(() => ({ testName: str })),
  userInfo: {
    name: "张三",
    age: 18,
  },
  setUserInfo: (data: Iinfo) => set(() => ({ userInfo: data })),
  setUserInfoName: (name: string) =>
    set((state) => ({ userInfo: { ...state.userInfo, name } })),
  setUserInfoAge: (age: number) =>
    set((state) => ({ userInfo: { ...state.userInfo, age } })),
}));

```
testA组件

```js
import { useTestStore } from "@/store/useTest";

const TestA: React.FC = () => {
  const {
    userInfo,
    setUserInfo,
    setUserInfoName,
    setUserInfoAge,
    testName,
    setTestName,
  } = useTestStore();

  return (
    <div>
      <div>testName:{testName}</div>
      <div>userInfoName:{userInfo.name}</div>
      <div>userInfoAge:{userInfo.age}</div>
      <button onClick={() => setTestName("testA")}>更改testName</button>
      <button onClick={() => setUserInfo({ name: "更改了", age: 30 })}>
        更改userInfo
      </button>
      <button onClick={() => setUserInfoName("李四")}>更改testName</button>
      <button onClick={() => setUserInfoAge(90)}>更改testName</button>
    </div>
  );
};

export default TestA;


```

testB

```js
import { useTestStore } from "@/store/useTest";

const TestB: React.FC = () => {
  const { userInfo, testName, setTestName } = useTestStore();

  return (
    <div>
      <div>testName:{testName}</div>
      <div>userInfoName:{userInfo.name}</div>
      <div>userInfoAge:{userInfo.age}</div>
      <button onClick={() => setTestName("testB")}>更改testName</button>
    </div>
  );
};

export default TestB;

```

此时可见AB组件引用类型更新 


![微信截图_20240327110924.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c26453fd5b874ce589ddb9c15c06dddd~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=545&h=294&s=40182&e=jpg&b=fefefe)

### action中获取state
在入有个计数器，每次点击，store加一，需要在action获取state，用法没变化

```js
import { create } from "zustand";

interface Iinfo {
  name: string;
  age: number;
}

interface Istore {
  count: number;
  testName: string;
  userInfo: Iinfo;
  setTestName: (str: string) => void;
  setUserInfo: (data: Iinfo) => void;
  setUserInfoName: (str: string) => void;
  setUserInfoAge: (str: number) => void;
  setCount: () => void;
}

export const useTestStore = create<Istore>()((set) => ({
  testName: "默认值",
  setTestName: (str: string) => set(() => ({ testName: str })),
  userInfo: {
    name: "张三",
    age: 18,
  },
  setUserInfo: (data: Iinfo) => set(() => ({ userInfo: data })),
  setUserInfoName: (name: string) =>
    set((state) => ({ userInfo: { ...state.userInfo, name } })),
  setUserInfoAge: (age: number) =>
    set((state) => ({ userInfo: { ...state.userInfo, age } })),
  count: 0,
  setCount: () => set((state) => ({ count: state.count + 1 })),
}));

```
### 监听变动
A组件变更了count计数器，B组件需要监听count变动，回调函数， 监听全部的store变化和特定的count变化，B组件代码如下，组件下载调用取消监听。useTestStore.subscribe返回值为取消监听，调用即可取消监听

```js
import { useEffect } from "react";

import type { Istore } from "@/store/useTest";
import { useTestStore } from "@/store/useTest";

const TestB: React.FC = () => {
  const { userInfo, testName, setTestName } = useTestStore();

  // 在组件挂载时订阅 store 变化  只要stoor变化均可触发
  useEffect(() => {
    // 监听所有更改，每次更改时都会同步触发
    const unsubscribeALL = useTestStore.subscribe(
      (state: Istore, prevState: Istore) => {
        console.log(state, prevState);
      }
    );
    // 在组件卸载时取消订阅
    return () => {
      unsubscribeALL();
    };
  }, []);

  // 在组件挂载时订阅 store 变化  仅仅监听count变化
  useEffect(() => {
    // 监听所有更改，每次更改时都会同步触发
    const unsubscribeCount = useTestStore.subscribe(
      (state: Istore, prevState: Istore) => {
        if (state.count !== prevState.count) {
          console.log(state, prevState);
        }
      }
    );
    // 在组件卸载时取消订阅
    return () => {
      unsubscribeCount();
    };
  }, []);

  // const unsubscribe = useTestStore.subscribe(
  //   (state) => {
  //     console.log("Count has changed:", state.count);
  //   },
  //   (prevState: Istore, nextState: Istore) => {
  //     return prevState.count !== nextState.count;
  //   }
  // );

  // allwatcher();

  // 获取非响应式的新状态
  // const countPaw = useTestStore.getState().count;

  return (
    <div>
      <div>testName:{testName}</div>
      <div>userInfoName:{userInfo.name}</div>
      <div>userInfoAge:{userInfo.age}</div>
      {/* <div>countPaw:{countPaw}</div> */}
      <button onClick={() => setTestName("testB")}>更改testName</button>
      <button onClick={() => allwatcher()}>停止监听</button>
    </div>
  );
};

export default TestB;

```

### 选择性订阅 useShallow
在 Zustand 中，`useShallow` 是一个用于选择性地订阅 store 中状态变化的自定义钩子。可以选择拼装自己需要的状态，有点类似于vue的computed, 注意两种写法

```js
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import type { Istore } from "@/store/useTest";
import { useTestStore } from "@/store/useTest";

const TestB: React.FC = () => {
  const { userInfo, testName, setTestName, count } = useTestStore();

  // 在组件挂载时订阅 store 变化  只要stoor变化均可触发
  useEffect(() => {
    // 监听所有更改，每次更改时都会同步触发
    const unsubscribeALL = useTestStore.subscribe(
      (state: Istore, prevState: Istore) => {
        console.log(state, prevState);
      }
    );
    // 在组件卸载时取消订阅
    return () => {
      unsubscribeALL();
    };
  }, []);

  // 在组件挂载时订阅 store 变化  仅仅监听count变化
  useEffect(() => {
    // 监听所有更改，每次更改时都会同步触发
    const unsubscribeCount = useTestStore.subscribe(
      (state: Istore, prevState: Istore) => {
        if (state.count !== prevState.count) {
          console.log(state, prevState);
        }
      }
    );
    // 在组件卸载时取消订阅
    return () => {
      unsubscribeCount();
    };
  }, []);

  // 自定义组装数据1
  const { count1, userInfo1 } = useTestStore(
    useShallow((state) => ({ count1: state.count, userInfo1: state.userInfo }))
  );
  // 自定义组装数据2
  // const [count1, testName1] = useTestStore(
  //   useShallow((state) => [state.count, state.testName])
  // )

  return (
    <div>
      <div>testName:{testName}</div>
      <div>count:{count}</div>
      <div>userInfoName:{userInfo.name}</div>
      <div>userInfoAge:{userInfo.age}</div>
      <div>count1:{count1}</div>
      <div>userInfo1.name:{userInfo1.name}</div>
      {/* <div>countPaw:{countPaw}</div> */}
      <button onClick={() => setTestName("testB")}>更改testName</button>
    </div>
  );
};

export default TestB;

```

### action异步设置
注意：setUserInfoNameAsync异步设置state

```js
import { create } from "zustand";

interface Iinfo {
  name: string;
  age: number;
}

function delayedPromise(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("异步处理名称");
    }, 300);
  });
}

export interface Istore {
  count: number;
  testName: string;
  userInfo: Iinfo;
  setTestName: (str: string) => void;
  setUserInfo: (data: Iinfo) => void;
  setUserInfoName: (str: string) => void;
  setUserInfoNameAsync: () => void;
  setUserInfoAge: (str: number) => void;
  setCount: () => void;
}

export const useTestStore = create<Istore>()((set) => ({
  testName: "默认值",
  setTestName: (str: string) => set(() => ({ testName: str })),
  userInfo: {
    name: "张三",
    age: 18,
  },
  setUserInfo: (data: Iinfo) => set(() => ({ userInfo: data })),
  setUserInfoName: (name: string) =>
    set((state) => ({ userInfo: { ...state.userInfo, name } })),
  setUserInfoNameAsync: async () => {
    const nameStr = await delayedPromise();
    set((state) => ({
      userInfo: { ...state.userInfo, name: nameStr },
    }));
  },
  setUserInfoAge: (age: number) =>
    set((state) => ({ userInfo: { ...state.userInfo, age } })),
  count: 0,
  setCount: () => set((state) => ({ count: state.count + 1 })),
}));

```
### 引入immer 简化复杂对象操作
对用用惯vue的来说，react每次更改state需要先创建副本，在赋值setState操作起来麻烦，`zustand`借助`immer`来简化操作

```js
npm i immer -S
```
修改useTest.ts

```js
import { produce } from "immer";
import { create } from "zustand";

interface Iinfo {
  name: string;
  age: number;
}

interface ComplexObjectType {
  nested: {
    value: string;
  };
  array: number[];
}

function delayedPromise(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("异步处理名称");
    }, 300);
  });
}

export interface Istore {
  count: number;
  testName: string;
  userInfo: Iinfo;
  setTestName: (str: string) => void;
  setUserInfo: (data: Iinfo) => void;
  setUserInfoName: (str: string) => void;
  setUserInfoNameAsync: () => void;
  setUserInfoAge: (str: number) => void;
  setCount: () => void;
  ImmerObject: ComplexObjectType;
  updateImmerObject: (updater: (draft: ComplexObjectType) => void) => void;
}

export const useTestStore = create<Istore>()((set) => ({
  testName: "默认值",
  setTestName: (str: string) => set(() => ({ testName: str })),
  userInfo: {
    name: "张三",
    age: 18,
  },
  setUserInfo: (data: Iinfo) => set(() => ({ userInfo: data })),
  setUserInfoName: (name: string) =>
    set((state) => ({ userInfo: { ...state.userInfo, name } })),
  setUserInfoNameAsync: async () => {
    const nameStr = await delayedPromise();
    set((state) => ({
      userInfo: { ...state.userInfo, name: nameStr },
    }));
  },
  setUserInfoAge: (age: number) =>
    set((state) => ({ userInfo: { ...state.userInfo, age } })),
  count: 0,
  setCount: () => set((state) => ({ count: state.count + 1 })),
  // immer初始状态
  ImmerObject: {
    nested: {
      value: "Immer",
    },
    array: [1, 2, 3],
  },

  // 使用 immer 的 produce 函数来更新复杂对象
  updateImmerObject: (updater: (draft: ComplexObjectType) => void) =>
    set(
      produce((draft) => {
        updater(draft.ImmerObject);
      })
    ),
}));

```
A组件

```js
import { useTestStore } from "@/store/useTest";

const TestA: React.FC = () => {
  const {
    userInfo,
    count,
    setUserInfo,
    setUserInfoName,
    setUserInfoAge,
    testName,
    setTestName,
    setCount,
    setUserInfoNameAsync,
    ImmerObject,
    updateImmerObject,
  } = useTestStore();

  const handleUpdate = () => {
    updateImmerObject((draft) => {
      draft.nested.value = "ImmerObject change";
      draft.array.push(4);
    });
  };

  return (
    <div>
      <div>testName:{testName}</div>
      <div>userInfoName:{userInfo.name}</div>
      <div>userInfoAge:{userInfo.age}</div>
      <div>count:{count}</div>

      <p>ImmerObject Value: {ImmerObject.nested.value}</p>
      <p>ImmerObject Array: {ImmerObject.array.join(", ")}</p>

      <button onClick={() => setTestName("testA")}>更改testName</button>
      <button onClick={() => setUserInfo({ name: "更改了", age: 30 })}>
        更改userInfo
      </button>
      <button onClick={() => setUserInfoName("李四")}>更改userInfoName</button>
      <button onClick={() => setUserInfoAge(90)}>更改userInfoAge</button>
      <button onClick={setCount}>更改count</button>
      <button onClick={setUserInfoNameAsync}>setUserInfoNameAsync</button>
      <button onClick={handleUpdate}>Update Immer Object</button>
    </div>
  );
};

export default TestA;

```

### 实现永久缓存，对于用户信息等状态，需要永久存储，否则一刷新就没了，
新建一个useUser.ts的store,`devtools``persist`实现local缓存

```js
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Iinfo {
  id: string;
  name: string;
  token: string;
}

interface BearState {
  userInfo: Iinfo;
  setUserInfo: (data: Iinfo) => void;
}

export const useUserStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        userInfo: {
          id: "",
          name: "",
          token: "",
        },
        setUserInfo: (data: Iinfo) => set(() => ({ userInfo: data })),
      }),
      {
        name: "userInfo",
      }
    )
  )
);

```
### 结尾
以上就是zustand基础用法，入门而已，全部代码在文档末尾

```js
import TestA from "./a";
import TestB from "./b";

const Test: React.FC = () => {
  return (
    <div>
      <TestA></TestA>
      <hr></hr>
      <TestB></TestB>
    </div>
  );
};

export default Test;

```

```js
import { produce } from "immer";
import { create } from "zustand";

interface Iinfo {
  name: string;
  age: number;
}

interface ComplexObjectType {
  nested: {
    value: string;
  };
  array: number[];
}

function delayedPromise(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("异步处理名称");
    }, 300);
  });
}

export interface Istore {
  count: number;
  testName: string;
  userInfo: Iinfo;
  setTestName: (str: string) => void;
  setUserInfo: (data: Iinfo) => void;
  setUserInfoName: (str: string) => void;
  setUserInfoNameAsync: () => void;
  setUserInfoAge: (str: number) => void;
  setCount: () => void;
  ImmerObject: ComplexObjectType;
  updateImmerObject: (updater: (draft: ComplexObjectType) => void) => void;
}

export const useTestStore = create<Istore>()((set) => ({
  testName: "默认值",
  setTestName: (str: string) => set(() => ({ testName: str })),
  userInfo: {
    name: "张三",
    age: 18,
  },
  setUserInfo: (data: Iinfo) => set(() => ({ userInfo: data })),
  setUserInfoName: (name: string) =>
    set((state) => ({ userInfo: { ...state.userInfo, name } })),
  setUserInfoNameAsync: async () => {
    const nameStr = await delayedPromise();
    set((state) => ({
      userInfo: { ...state.userInfo, name: nameStr },
    }));
  },
  setUserInfoAge: (age: number) =>
    set((state) => ({ userInfo: { ...state.userInfo, age } })),
  count: 0,
  setCount: () => set((state) => ({ count: state.count + 1 })),
  // 初始状态
  ImmerObject: {
    nested: {
      value: "Immer",
    },
    array: [1, 2, 3],
  },

  // 使用 immer 的 produce 函数来更新复杂对象
  updateImmerObject: (updater: (draft: ComplexObjectType) => void) =>
    set(
      produce((draft) => {
        updater(draft.ImmerObject);
      })
    ),
}));

```


```js
import { useTestStore } from "@/store/useTest";

const TestA: React.FC = () => {
  const {
    userInfo,
    count,
    setUserInfo,
    setUserInfoName,
    setUserInfoAge,
    testName,
    setTestName,
    setCount,
    setUserInfoNameAsync,
    ImmerObject,
    updateImmerObject,
  } = useTestStore();

  const handleUpdate = () => {
    updateImmerObject((draft) => {
      draft.nested.value = "ImmerObject change";
      draft.array.push(4);
    });
  };

  return (
    <div>
      <div>testName:{testName}</div>
      <div>userInfoName:{userInfo.name}</div>
      <div>userInfoAge:{userInfo.age}</div>
      <div>count:{count}</div>

      <p>ImmerObject Value: {ImmerObject.nested.value}</p>
      <p>ImmerObject Array: {ImmerObject.array.join(", ")}</p>

      <button onClick={() => setTestName("testA")}>更改testName</button>
      <button onClick={() => setUserInfo({ name: "更改了", age: 30 })}>
        更改userInfo
      </button>
      <button onClick={() => setUserInfoName("李四")}>更改userInfoName</button>
      <button onClick={() => setUserInfoAge(90)}>更改userInfoAge</button>
      <button onClick={setCount}>更改count</button>
      <button onClick={setUserInfoNameAsync}>setUserInfoNameAsync</button>
      <button onClick={handleUpdate}>Update Immer Object</button>
    </div>
  );
};

export default TestA;

```


```js
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import type { Istore } from "@/store/useTest";
import { useTestStore } from "@/store/useTest";

const TestB: React.FC = () => {
  const { userInfo, testName, setTestName, count, ImmerObject } =
    useTestStore();

  // 在组件挂载时订阅 store 变化  只要stoor变化均可触发
  useEffect(() => {
    // 监听所有更改，每次更改时都会同步触发
    const unsubscribeALL = useTestStore.subscribe(
      (state: Istore, prevState: Istore) => {
        console.log(state, prevState);
      }
    );
    // 在组件卸载时取消订阅
    return () => {
      unsubscribeALL();
    };
  }, []);

  // 在组件挂载时订阅 store 变化  仅仅监听count变化
  useEffect(() => {
    // 监听所有更改，每次更改时都会同步触发
    const unsubscribeCount = useTestStore.subscribe(
      (state: Istore, prevState: Istore) => {
        if (state.count !== prevState.count) {
          console.log(state, prevState);
        }
      }
    );
    // 在组件卸载时取消订阅
    return () => {
      unsubscribeCount();
    };
  }, []);

  // 自定义组装数据1
  const { count1, userInfo1 } = useTestStore(
    useShallow((state) => ({ count1: state.count, userInfo1: state.userInfo }))
  );
  // 自定义组装数据2
  // const [count1, testName1] = useTestStore(
  //   useShallow((state) => [state.count, state.testName])
  // )

  return (
    <div>
      <div>testName:{testName}</div>
      <div>count:{count}</div>
      <div>userInfoName:{userInfo.name}</div>
      <div>userInfoAge:{userInfo.age}</div>
      <div>count1:{count1}</div>
      <div>userInfo1.name:{userInfo1.name}</div>
      <p>ImmerObject Value: {ImmerObject.nested.value}</p>
      <p>ImmerObject Array: {ImmerObject.array.join(", ")}</p>
      {/* <div>countPaw:{countPaw}</div> */}
      <button onClick={() => setTestName("testB")}>更改testName</button>
    </div>
  );
};

export default TestB;

```

