## 背景
最近由vue转为react，记录下react 16.8版本hook编程，当然vue3现在也流行hook编程，部分hook与vue3做对比使用。仅作记录，有帮助的可以取舍。

## 何为hook
React 函数编程中内置的Hook是一套允许在函数组件中使用state和其他React特性的函数。React提供了多个内置的Hook，这些Hook极大地扩展了函数组件的功能，使得在无需编写类组件的情况下也能使用React的全部功能。即hook函数组件的，可以再函数内部使用类似于类组件的特性，下面一一介绍下

## 创建测试项目


```js
npm create vite@latest react-test
```
选择react 即可，按提示安装依赖并启动

## 1: useState

### 作用
`useState` 是 React Hooks 中的一个基础 Hook，它允许你在函数组件中添加状态（state）。在类组件中，我们通过 `this.state` 来管理组件的状态，但在函数组件中，由于没有实例（this），所以 React 引入了 Hooks 来让函数组件也能拥有状态和其他 React 特性。

### 用法
`useState` 的基本用法是调用它并传入一个初始状态值。它返回一个状态变量和一个让你更新它的函数，你可以在组件中通过这两个返回值来管理状态。


```js
import { useState } from 'react'
import './App.css'

function App() {
  // 它返回一个状态变量和一个更新该状态的函数
  const [count, setCount] = useState(0)

  // setCount为更改状态state函数，每次调用会重新render

  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  )
}

export default App


```
### 注意点

1.  **不要在循环、条件或嵌套函数中调用 `useState`**：`useState` 应该在组件的最顶层调用，以确保每次渲染时都能以相同的顺序调用。
1.  **更新状态是异步的**：React 可能会将多个 `setState` 调用合并成一个以提高性能。你不能依赖当前的状态来立即计算下一个状态。如果需要基于前一个状态来更新状态，请使用函数形式的 `setState`。
1.  **避免在渲染方法中直接修改状态**：状态更新应该通过 `setState` 函数来进行，而不是直接修改状态变量。

### 使用场景
`useState` 的使用场景非常广泛，几乎涵盖了所有需要状态管理的场景。以下是一些常见的使用场景：

1.  **表单处理**：在表单输入中跟踪用户输入的值。
1.  **控制组件的显示与隐藏**：通过状态来控制某个组件的渲染与否。
1.  **计数器**：如上面的例子所示，跟踪点击次数或任何需要递增/递减的数值。
1.  **列表管理**：管理一个列表的显示，如添加、删除或编辑列表项。
1.  **动画和过渡**：控制动画的播放状态或过渡的显示。
1.  **权限控制**：根据用户的登录状态显示不同的内容。


```js
import { useState } from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  
  const handleSubmit = (event) => {  
    event.preventDefault();  
    console.log(`Username: ${username}, Password: ${password}`);  
    // 这里可以添加登录逻辑  
  };  
  
  return (  
    <form onSubmit={handleSubmit}>  
      <label>  
        Username:  
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />  
      </label>  
      <label>  
        Password:  
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />  
      </label>  
      <button type="submit">Login</button>  
    </form>  
  );  
}

export default App

```
在这个例子中，`useState` 用于跟踪用户的用户名和密码输入，并在表单提交时打印出来。请注意react中并没有`vue`中`v-model`的双向绑定，如果需要双向绑定，则借助`onChange`事件动态改变`state`

## 2: useEffect

### 作用
`useEffect` 是 React Hooks 中的一个重要 Hook，它用于在函数组件中执行副作用操作。副作用是指那些发生在渲染之外，但可能与渲染相关的操作，如数据获取、订阅外部数据源、手动修改 DOM 等。`useEffect` 的主要作用是在组件渲染到屏幕之后执行这些副作用操作，（副作用可以简单理解为，如类似vue中组件生命周期，监听watch等等）

### 用法
`useEffect` 接受两个参数：一个副作用函数和一个可选的依赖项数组。

-   副作用函数：这是你想要在组件渲染后执行的函数，可以包含任何副作用操作。
-   依赖项数组：这是一个可选参数，用于指定副作用函数依赖于哪些 props 或 state。当依赖项发生变化时，副作用函数会重新执行。如果省略依赖项数组，副作用函数会在每次组件渲染后都执行。


```js
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {  
    // 副作用操作  
    console.log('Component mounted or updated');  
  
    // 清理函数（可选）  
    return () => {  
      console.log('Cleanup function called');  
    };  
  }, [/* 依赖项数组 */]);  
  
  return <div>My Component</div>;  
}

export default App

```

### 场景1：充当生命周期
在React中，`useEffect` Hook 可以被视为在函数组件中执行副作用操作的一种方式，这些操作传统上是通过类组件的生命周期方法来处理的。虽然 `useEffect` 本身不是一个生命周期方法，但它可以通过不同的方式来模拟类组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 生命周期方法。

#### 模拟 `componentDidMount` 和 `componentWillUnmount`
当你想要在某个组件挂载到DOM后执行代码，并在组件卸载时执行清理操作（如取消网络请求、移除事件监听器等）时，可以将一个不带依赖项数组（或空数组）的 `useEffect` 用作 `componentDidMount`，并通过返回一个清理函数来模拟 `componentWillUnmount`。


```js
import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {  
    // 相当于 componentDidMount  
    console.log('Component mounted');  
  
    // 假设我们在这里设置了一个定时器  
    const timerId = setTimeout(() => {  
      console.log('Timer executed');  
    }, 1000);  
  
    // 清理函数，相当于 componentWillUnmount  
    return () => {  
      clearTimeout(timerId);  
      console.log('Component will unmount');  
    };  
  }, []); // 空数组表示这些副作用仅在挂载和卸载时运行  
  
  return <div>Hello, MyComponent!</div>;    
}

export default App

```

#### 模拟 `componentDidUpdate`，类似于`vue`的`watch`
如果你想要在某个状态或属性变化时执行副作用，可以将这些状态或属性作为 `useEffect` 的依赖项数组的一部分。这样，每当依赖项变化时，副作用就会重新执行。


```js
import { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);  
  
  useEffect(() => {  
    // 每当 count 变化时，这里的代码就会执行  
    // 相当于 componentDidUpdate（但请注意，它也会在首次渲染后执行）  
    console.log(`Count is: ${count}`);  
  
    // 这里不需要返回清理函数，除非有资源需要清理  
  }, [count]); // 依赖项数组包含 count  
  
  return (  
    <div>  
      <p>Count: {count}</p>  
      <button onClick={() => setCount(count + 1)}>Increment</button>  
    </div>  
  ); 
}

export default App

```
在上面的例子中，每当 `count` 状态变化时，`useEffect` 中的代码就会执行，这模拟了 `componentDidUpdate` 的行为。但是，请注意，`useEffect` 也会在组件首次渲染后执行（如果依赖项数组不为空），这是因为React需要在初始渲染时设置任何必要的副作用。如果你想要避免在首次渲染时执行副作用，你可以通过添加一个额外的条件来检查（例如，检查某个状态是否已初始化）。

### 场景2：数据获取


```js
import { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState(null);  
  
  useEffect(() => {  
    const fetchUser = async () => {  
      const response = await fetch('https://api.example.com/user');  
      const data = await response.json();  
      setUser(data);  
    };  
  
    // 初始化执行请求
    fetchUser();  
  
    // 清理函数（在这个例子中可能不需要，因为没有需要清理的资源）  
    // 但为了展示结构，这里保留了一个空的清理函数  
    return () => {};  
  }, []); // 空数组表示只在组件挂载时执行一次  
  
  if (!user) {  
    return <div>Loading...</div>;  
  }  
  
  return <div>Name: {user.name}</div>;  
}

export default App

```
在这个例子中，`useEffect` 用于在组件挂载后从服务器获取用户数据，并在数据获取成功后更新状态。由于我们传递了一个空数组作为依赖项数组，所以副作用函数只会在组件首次渲染时执行一次。

## 3: useRef
`useRef` 是 React Hooks 中的一个重要 Hook，它提供了一种在组件的整个生命周期内保持数据不变的方式。与 `useState` 不同，`useRef` 返回的引用对象在组件的整个生命周期内保持不变，包括其 `.current` 属性。这使得 `useRef` 非常适用于那些不需要引起组件重新渲染，但需要跨渲染周期保持数据的场景。可以简单理解为 `vue`中的 `ref`，获取`DOM`的引用

### 用法
`useRef` 接收一个初始值作为参数（这个初始值只在组件的第一次渲染时设置），并返回一个对象，该对象拥有一个 `.current` 属性，你可以通过这个属性来访问或修改存储的值。


```js
import { useRef } from 'react'
import './App.css'

function App() {
  const myRef = useRef(null); // initialValue 是可选的  
  
  // 访问或修改 ref 的值  
  console.log(myRef.current); // 访问  
  myRef.current = "aaa"; // 修改  
  console.log(myRef.current); // 访问  
  
  return <div>My Component</div>; 
}

export default App
```

### 注意点
1.  **不触发重新渲染**：修改 `ref.current` 的值不会触发组件的重新渲染。
1.  **初始值**：虽然 `useRef` 允许你传递一个初始值，但这个初始值只在组件的第一次渲染时设置。
1.  **持久性**：`ref` 对象在组件的整个生命周期内保持不变，包括其 `.current` 属性。 

### 使用场景1： **访问 DOM 元素**：最常见的用途之一是访问 DOM 元素。


```js
import { useRef } from 'react'
import './App.css'

function App() {
  const inputEl = useRef(null);  
  const onButtonClick = () => {  
    // `current` 指向已挂载到 DOM 上的文本输入元素  
    inputEl.current.focus();  
  };  
 
  return (  
    <>  
      <input ref={inputEl} type="text" />  
      <button onClick={onButtonClick}>Focus the input</button>  
    </>  
  );  
}

export default App

```

### 使用场景2： **存储定时器 ID**：当你想在组件卸载时清理定时器时，`useRef` 非常有用。


```js
import { useRef, useEffect } from 'react'
import './App.css'

function App() {
  const timerRef = useRef(null);  
 
  useEffect(() => {  
    timerRef.current = setTimeout(() => {  
      console.log('Timer executed');  
    }, 1000);  
 
    return () => {  
      clearTimeout(timerRef.current);  
    };  
  }, []);  
 
  return <div>Timer will execute after 1 second</div>; 
}

export default App

```

### 使用场景3： **跨渲染周期保持数据**

当你想在组件的多次渲染之间保持某些数据时，但又不希望这些数据引起组件的重新渲染。


```js
import { useRef, useEffect, useState } from 'react'
import './App.css'

function App() {
  const prevCountRef = useRef(0);  
 
  const [count, setCount] = useState(0);  
 
  useEffect(() => {  
    console.log(`Count changed from ${prevCountRef.current} to ${count}`);  
    prevCountRef.current = count;  
  }, [count]);  
 
  return (  
    <div> 
      <p>prevCountRef: {prevCountRef.current}</p>   
      <p>Count: {count}</p>  
      <button onClick={() => setCount(count + 1)}>Increment</button>  
    </div>  
  );  
}

export default App

```
在这个例子中，`prevCountRef` 用于存储上一次的 `count` 值，以便在 `count` 变化时进行比较。由于 `useRef` 的持久性，`prevCountRef.current` 可以在组件的多次渲染之间保持不变，直到我们显式地更新它。`prevCountRef.current`自点击后，总比 `count`小1，及存储的是上一次的 `count`状态

## 4:useMemo
`useMemo` 是 React 提供的一个 Hook，主要用于性能优化。它通过缓存函数的计算结果来避免在每次组件渲染时都重新执行昂贵的计算或重新创建相同的对象。只有当依赖项发生变化时，`useMemo` 才会重新计算并返回新的结果，否则它会返回上一次缓存的结果。类似于`vue`的`computed`

### 用法
`useMemo` 接收两个参数：一个“创建”函数和一个依赖项数组。创建函数是你想要“记住”其结果的函数，而依赖项数组则告诉 React 何时需要重新计算这个值。


```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
-   `computeExpensiveValue` 是一个可能会消耗大量计算资源的函数。
-   `a` 和 `b` 是这个函数的依赖项。
-   `memoizedValue` 是 `computeExpensiveValue` 函数的结果，但只有在 `a` 或 `b` 发生变化时才会重新计算

### 注意点
1.  **依赖项的正确性**：确保依赖项数组中包含所有影响计算结果的因素。如果遗漏了某个依赖项，可能会导致计算结果不正确。
1.  **避免滥用**：在不需要缓存结果的情况下使用 `useMemo` 可能会导致性能下降，因为 React 需要跟踪依赖项的变化并管理缓存。
1.  **浅比较**：React 会对依赖项数组中的值进行浅比较。如果数组中包含对象或数组，并且这些对象或数组的内容发生了变化但引用没有变化，那么 `useMemo` 可能不会重新计算。

### 使用场景1
假设你有一个组件，它需要根据用户输入计算并显示一些数据，这个计算过程非常消耗资源。你可以使用 `useMemo` 来避免在每次组件渲染时都重新计算：


```js
import { useRef, useEffect, useState,useMemo } from 'react'
import './App.css'

const ExpensiveComponent = ({ input }) => {  
  const expensiveValue = useMemo(() => {  
    // 假设这是一个非常昂贵的计算过程  
    return computeExpensiveValue(input);  
  }, [input]);  
  
  return <div>{expensiveValue}</div>;  
};  

// 假设 computeExpensiveValue 是一个实际存在的昂贵计算函数  
function computeExpensiveValue(input) {  
  // ... 执行一些昂贵的计算 ...  
  return `Processed ${input}`;  
}  

function App() {
  const [input, setInput] = useState('initial value');  
  
  return (  
    <div>  
      <input  
        value={input}  
        onChange={(e) => setInput(e.target.value)}  
        placeholder="Enter something"  
      />  
      <ExpensiveComponent input={input} />  
    </div>  
  );  
}

export default App

```
在这个例子中，只有当 `input` 发生变化时，`computeExpensiveValue` 函数才会被重新调用，其余时间 `ExpensiveComponent` 将重用上一次计算的 `expensiveValue`。这样可以显著提高组件的性能，特别是在处理大量数据或复杂计算时。

### 使用场景2： 类似`vue`的`conputed`计算属性


```js
// 使用useMemo计算属性
  const chunklistChecked = useMemo(() => {
    return chunklist
      .filter((item) => item.isChecked)
  }, [chunklist]);
```

当`chunklist`变化时，筛选出`chunklist`中`item.isChecked`的项。类似于计算属性


## 5:useCallback
`useCallback` 是 React 中的一个 Hook，它返回一个记忆化的回调函数。这个回调函数只有在它的依赖项改变时才会更新。`useCallback` 的主要作用是防止在每次渲染时都创建新的函数实例，这对于优化性能以及避免在子组件中由于父组件频繁重新渲染而导致的不必要的重新渲染是非常有用的。

### 用法

`useCallback` 接收两个参数：一个函数和一个依赖项数组。函数是你想要记忆化的回调函数，而依赖项数组则定义了当哪些值发生变化时，应该重新创建这个回调函数。


```js
const memoizedCallback = useCallback(  
  () => {  
    // 执行一些操作  
  },  
  [dep1, dep2, /* ... */],  
);
```
-   第一个参数是回调函数本身。
-   第二个参数是一个依赖项数组，这个数组中的值决定了回调函数何时需要重新创建。

### 注意点
1.  **避免滥用**：只在需要避免在渲染时创建新函数时才使用 `useCallback`。否则，它可能会增加代码的复杂性，并且可能不会带来任何性能上的好处。
1.  **依赖项的正确性**：确保依赖项数组中包含所有影响回调函数内部逻辑的因素。如果遗漏了某个依赖项，可能会导致回调函数使用了过时的数据。
1.  **避免将非依赖项添加到数组中**：将不应触发回调更新的变量添加到依赖项数组中可能会导致不必要的回调更新。

### 使用场景
1.  **传递给子组件的回调函数**：当你将回调函数作为 prop 传递给子组件，并且子组件依赖于该回调函数的引用稳定性时（例如，在 `useEffect` 或 `useCallback` 中使用），你可以使用 `useCallback` 来避免在父组件每次渲染时都创建新的函数实例。
1.  **优化性能**：在需要优化性能的场景下，特别是在组件树很深或者有很多组件需要频繁更新的情况下，使用 `useCallback` 可以减少不必要的渲染。

假设你有一个父组件，它根据用户的输入动态生成一个子组件列表，并将一个回调函数作为 prop 传递给每个子组件。子组件在内部使用 `useEffect` 来监听某些变化，并在变化时调用这个回调函数。为了避免在父组件每次渲染时都创建新的回调函数实例，从而导致子组件的 `useEffect` 无效（因为依赖项中的函数引用改变了），你可以使用 `useCallback`：


```js
import { useRef, useEffect, useState,useMemo, useCallback } from 'react'
import './App.css'

const Child = ({ onChildEvent }) => {  
  useEffect(() => {  
    // 假设这里有一些逻辑，当某些事件发生时调用 onChildEvent  
    console.log('Child effect runs');  
  }, [onChildEvent]); // 注意这里的依赖项  
  
  return <div>Child Component</div>;  
};  

function App() {
  const [count, setCount] = useState(0);  
  
  // 使用 useCallback 来记忆化回调函数  
  const memoizedCallback = useCallback(() => {  
    console.log('Callback called from child');  
  }, []); // 这里的依赖项数组为空，因为回调函数不依赖于任何状态或 prop  
  
  return (  
    <div>  
      <button onClick={() => setCount(count + 1)}>Increment</button>  
      {Array.from({ length: count }, (_, i) => (  
        <Child key={i} onChildEvent={memoizedCallback} />  
      ))}  
    </div>  
  );  
}

export default App

```
在这个例子中，尽管父组件的 `count` 状态在改变，但 `memoizedCallback` 的引用始终保持不变，因为 `useCallback` 的依赖项数组是空的。这意味着子组件的 `useEffect` 不会因为父组件的每次渲染而重新运行，从而提高了性能。然而，需要注意的是，这个回调函数内部没有使用任何状态或 prop，所以它实际上并不需要 `useCallback`。这里只是为了演示 `useCallback` 的用法而已。在实际应用中，你应该只在回调函数确实依赖于某些外部数据时才使用 `useCallback`，并将这些数据作为依赖项传递给 `useCallback`。


### useCallback 和 useMemo的区别
`useCallback` 和 `useMemo` 是 React Hooks 中用于性能优化的两个重要工具，它们的主要区别在于它们优化的对象不同：`useCallback` 用来优化函数组件中的回调函数，而 `useMemo` 用来优化组件中的计算值。两者都是性能优化的工具，但在不同的场景下使用，可以有效地减少不必要的渲染和计算，提升应用的性能。

-   **`useCallback`**：优化回调函数，减少不必要的重新创建，主要用于传递给子组件的回调。
-   **`useMemo`**：优化计算值，减少昂贵的计算，主要用于从 props 或 state 派生的数据。


## 6: useImperativeHandle  和 forwardRef
`useImperativeHandle` 是 React 中的一个自定义 Hook，它的主要作用是允许子组件自定义暴露给父组件的实例值。这通常与 `forwardRef` 一起使用，以便父组件可以通过 ref 访问子组件内部的方法或属性。通过使用 `useImperativeHandle`，子组件可以选择性地暴露其内部状态或方法给父组件，从而实现更灵活和可控的组件交互。


```js
useImperativeHandle(ref, createHandle, [deps]);
```
-   **ref**：用于引用组件实例的 ref 对象，这个 ref 是由父组件通过 `forwardRef` 传递给子组件的。
-   **createHandle**：一个回调函数，用于创建需要暴露给父组件的属性和方法。这个函数的返回值会被设置到 ref.current 上，使得父组件可以通过 ref.current 访问这些属性和方法。
-   **[deps]** ：一个可选的依赖项数组，用于指定在 createHandle 中使用的依赖项。当依赖项发生变化时，createHandle 会被重新调用。

### 注意点
1.  **与 forwardRef 结合使用**：`useImperativeHandle` 通常与 `forwardRef` 一起使用，以便将 ref 从父组件传递到子组件。
1.  **依赖项的正确性**：如果提供了依赖项数组，需要确保它包含了所有影响 createHandle 返回值的数据。如果遗漏了某个依赖项，可能会导致父组件访问到过时的方法或属性。
1.  **避免滥用**：虽然 `useImperativeHandle` 提供了一种灵活的组件交互方式，但过度使用可能会使组件间的耦合度增加，降低代码的可维护性。

### 使用场景
**向父组件暴露子组件的方法**：当父组件需要调用子组件内部的方法时，可以使用 `useImperativeHandle` 将这些方法暴露给父组件。


```js
import { useRef, useEffect, useState,useMemo, useCallback,useImperativeHandle,forwardRef } from 'react'
import './App.css'

// 子组件  
const ChildComponent = forwardRef((props, ref) => {  
  const doSomething = () => {  
    console.log('Doing something in ChildComponent');  
  };  
 
  useImperativeHandle(ref, () => ({  
    doSomething,  
  }));  
 
  return <div>Child Component</div>;  
});

function App() {
  const childRef = useRef(null);  
 
  const handleClick = () => {  
    if (childRef.current) {  
      childRef.current.doSomething();  
    }  
  };  
 
  return (  
    <div>  
      <ChildComponent ref={childRef} />  
      <button onClick={handleClick}>Call Child Method</button>  
    </div>  
  );  
}

export default App

```
上述子组件将内部方法暴露给父组件，父组件通过ref来调用，有些类似于`vue`的`defineExpose`


## 7:useContext 数据状态共享
`useContext` 是 React 提供的一个钩子（Hook），用于在函数式组件中访问上下文（Context）的值。它使得在组件树中传递数据变得更加简单和高效，特别是当需要在多个层级之间共享数据时，避免了通过显式的 props 层层传递的繁琐。通过 `useContext`，组件可以直接访问到由 `Context.Provider` 提供的值，实现了跨组件层级的数据共享。

### 用法
1.  **创建 Context**：首先，需要使用 `React.createContext()` 创建一个 Context 对象。这个对象包含当前的上下文值和一个 `Provider` 组件。
1.  **设置 Context.Provider**：在组件树中较高层级的组件中，使用 `<Context.Provider value={/* 某个值 */}>` 来包裹需要共享数据的子组件。`value` 属性就是需要共享的数据。
1.  **在子组件中使用 `useContext`**：在需要使用共享数据的子组件中，通过 `useContext(Context)` 钩子函数来访问 Context 中的值。这里 `Context` 是之前通过 `React.createContext()` 创建的 Context 对象。

### 注意点
1.  **Context 的值变化检测**：Context 是通过新旧值检测来确定是否发生变化的，它使用了与 `Object.is` 相同的算法。如果传递给 Context 的是一个字面量对象，那么每次更新时都会生成一个新的对象，这可能会导致子组件不必要地重新渲染。为了避免这个问题，可以将共享的数据状态存储在组件的状态中，并仅将状态变量传递给 Context.Provider 的 `value` 属性。
1.  **性能问题**：由于 Context 的变化会导致其所有子组件重新渲染，因此在使用时需要注意避免性能问题。可以使用 React.memo 来避免不必要的重渲染，或者确保传递给 Context 的值是稳定的，避免在每次渲染时都生成新的对象或数组。
1.  **Context 的嵌套**：当多个 Context 嵌套使用时，需要确保它们的嵌套顺序是正确的，以避免意外的渲染行为。一般来说，应将不常变化的 Context 放置在更外层，而将经常变化的 Context 放置在更内层。

### 使用场景
展示了如何使用 `useContext` 在 React 应用中共享主题颜色：


```js
import { useRef, useEffect, useState,useMemo, useCallback,useImperativeHandle,forwardRef,createContext,useContext } from 'react'
import './App.css'

// 创建一个 Context  
const ThemeContext = createContext({ theme: 'light' });  
  
// 父组件，设置主题  
function ParentComponent() {  
  const [theme, setTheme] = useState('light');  
  
  return (  
    <ThemeContext.Provider value={{ theme }}>  
      <ChildComponent />  
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</button>  
    </ThemeContext.Provider>  
  );  
}  
  
// 子组件，使用主题  
function ChildComponent() {  
  const { theme } = useContext(ThemeContext);  
  
  return <div style={{ color: theme === 'light' ? 'black' : 'red' }}>Hello, {theme} theme!</div>;  
}  

// 渲染应用  
function App() {  
  return <ParentComponent />;  
}  

export default App

```
在这个示例中，`ParentComponent` 是父组件，它使用 `ThemeContext.Provider` 包裹了 `ChildComponent` 和一个切换主题的按钮。`ChildComponent` 使用 `useContext(ThemeContext)` 来访问当前的主题颜色，并据此设置其样式。当然你也可以使用`zustand`等状态管理太替代。这个hook主要用来跨组件传值的，可以理解为`vue`的`provide`和`inject`,


## 8: useReducer
`useReducer` 是 React 提供的一个用于状态管理的 Hook，它接收一个 reducer 函数和初始状态作为参数，并返回当前状态以及一个 dispatch 函数。`useReducer` 的主要作用是处理组件中复杂的状态逻辑，特别是当状态更新依赖于先前的状态或需要执行一些复杂计算时。通过将状态更新逻辑封装在 reducer 函数中，`useReducer` 提供了一种更加可预测和可维护的状态更新机制。

### 用法
1.  **定义初始状态**：首先，你需要定义一个初始状态，这个状态是组件的初始值。
1.  **定义 reducer 函数**：然后，定义一个 reducer 函数，该函数接收当前状态和一个动作（action）对象作为参数，并返回新的状态。在 reducer 函数中，你可以根据动作的类型（action.type）来执行不同的状态更新逻辑。
1.  **使用 `useReducer`**：在组件中，使用 `useReducer` 钩子函数，传入之前定义的 reducer 函数和初始状态。`useReducer` 会返回当前状态和一个 dispatch 函数。
1.  **通过 dispatch 函数发送动作**：在组件中，你可以通过调用 dispatch 函数并传入一个动作对象来触发状态更新。这个动作对象通常包含一个 type 属性，用于在 reducer 函数中识别不同的动作。

### 注意点

1.  **纯函数**：Reducer 函数必须是纯函数，即给定相同的输入，它必须总是返回相同的输出，并且不应该修改其输入参数。
1.  **避免不必要的渲染**：由于每次调用 dispatch 都会触发组件的重新渲染，因此应避免在不必要的情况下调用 dispatch。
1.  **错误处理**：在 reducer 函数中，应该考虑所有可能的 action.type 值，并为其提供一个默认的返回值或抛出错误，以避免在未知的动作类型下返回 undefined 或 null。
1.  **性能优化**：当状态对象很大且只有部分属性发生变化时，应确保返回的新状态对象是对旧状态对象的浅拷贝，以避免不必要的组件重渲染

### 使用场景


```js
import { useRef, useEffect, useState,useMemo, useCallback,useImperativeHandle,forwardRef,createContext,useContext,useReducer  } from 'react'
import './App.css'

// 定义初始状态  
const initialState = { count: 0 };  
  
// 定义 reducer 函数  
function reducer(state, action) {  
  switch (action.type) {  
    case 'increment':  
      return { count: state.count + 1 };  
    case 'decrement':  
      return { count: state.count - 1 };  
    default:  
      throw new Error();  
  }  
}  
  

// 渲染应用  
function App() {  
   // 使用 useReducer 初始化状态和获取 dispatch 函数  
   const [state, dispatch] = useReducer(reducer, initialState);  
  
   return (  
     <div>  
       Count: {state.count}  
       <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>  
       <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>  
     </div>  
   );   
}  

export default App

```

在这个示例中，我们定义了一个 `Counter` 组件，它使用 `useReducer` 来管理一个计数器状态。通过点击按钮，我们可以触发不同的动作（increment 或 decrement），这些动作会被 reducer 函数处理，并返回新的状态，从而更新组件的显示。可替换`Redux`，


### useReducer 和 useState区别
`useReducer` 和 `useState` 都是 React 中用于管理组件状态的 Hooks，但它们之间存在一些关键的区别，主要体现在用法、适用场景、状态管理复杂度以及状态更新逻辑等方面。
#### 1. 用法和语法

-   **useState**：

    -   `useState` 是 React 提供的最基本的 Hook，用于在函数组件中添加状态。
    -   它接受一个初始状态作为参数，并返回一个包含状态值和更新状态函数的数组。
    -   示例：`const [state, setState] = useState(initialState);`

-   **useReducer**：

    -   `useReducer` 是另一个用于状态管理的 Hook，它更适用于复杂的状态逻辑。
    -   它接受一个 reducer 函数和初始状态作为参数，并返回当前状态和 dispatch 函数。
    -   示例：`const [state, dispatch] = useReducer(reducer, initialState);`

#### 2. 适用场景

-   **useState**：

    -   适用于简单的状态管理，当状态之间没有复杂的依赖关系时，使用 `useState` 更为简洁和直观。
    -   例如，管理表单输入字段、开关状态等。

-   **useReducer**：

    -   适用于复杂的状态逻辑，当状态之间有复杂的依赖关系或需要进行多种操作时，使用 `useReducer` 更为灵活和可控。
    -   例如，管理购物车状态、计数器（当逻辑复杂时）等。

#### 3. 状态管理复杂度

-   **useState**：

    -   更适合管理单个状态变量或简单的状态集合。
    -   当需要管理多个相关状态且它们之间有复杂的依赖关系时，可能需要多次使用 `useState`，这可能会导致状态之间关系不够清晰，可读性较差。

-   **useReducer**：

    -   更适合管理多个相关状态变量，特别是当这些状态需要根据不同的动作类型进行更新时。
    -   通过在 reducer 函数中定义不同的操作类型，可以将不同的状态更新逻辑拆分到 reducer 函数中，使得状态之间的关系更加清晰，更易于维护。

#### 4. 状态更新逻辑

-   **useState**：

    -   每次调用状态更新函数时，它都会独立地更新状态，不受之前状态的影响。
    -   状态更新是异步的（在 React 的合成事件和生命周期方法中），但在大多数情况下，React 会对其进行优化以确保状态更新的正确性。

-   **useReducer**：

    -   根据不同的动作类型，reducer 函数可以定义不同的状态更新逻辑。
    -   状态更新是同步的，即每次调用 dispatch 函数时，都会立即根据 reducer 函数返回的新状态来更新组件的状态。

#### 5. 性能优化

-   在大多数情况下，`useState` 和 `useReducer` 的性能差异并不明显，React 会对其进行优化以确保组件的性能。
-   然而，在某些特定情况下，如当某个状态的更新依赖于其他状态时，使用 `useReducer` 可以确保这些状态的更新是同步的，从而可能提供更好的性能表现。

综上所述，`useState` 和 `useReducer` 各有其适用场景和优势。在实际开发中，应根据组件的需求和状态逻辑的复杂程度来选择使用哪个 Hook。对于简单的状态管理，`useState` 通常是一个更好的选择；而对于复杂的状态逻辑，`useReducer` 则提供了更多的灵活性和可控性。


## 9: useLayoutEffect
`useLayoutEffect` 是 React 中的一个 Hook，用于在所有的 DOM 变更之后同步执行某些操作。这些操作会在浏览器进行绘制之前完成，因此可以用于在渲染输出到屏幕之前读取 DOM 布局并同步触发重绘或进行其他需要同步执行的 DOM 操作。它的执行时机类似于类组件中的 `componentDidMount` 和 `componentDidUpdate` 生命周期方法，但它是专门为函数组件设计的。

### 用法
`useLayoutEffect` 的用法与 `useEffect` 非常相似，它们都接受一个包含副作用操作的函数和一个依赖项数组作为参数。但是，`useLayoutEffect` 中的副作用操作会在浏览器绘制之前同步执行。


```js
import { useRef, useEffect, useState,useMemo, useCallback,useImperativeHandle,forwardRef,createContext,useContext,useReducer,useLayoutEffect  } from 'react'
import './App.css'

// 渲染应用  
function App() {  
  const [count, setCount] = useState(0);  
  
  useLayoutEffect(() => {  
    // 这里的代码会在 DOM 更新后立即同步执行  
    // 这意味着如果你在这里读取 DOM 的某些属性或执行影响布局的操作  
    // 它会在浏览器绘制之前完成  
    const myElement = document.getElementById('my-element');  
    if (myElement) {  
      myElement.style.color = 'red'; // 这将在浏览器绘制之前设置颜色  
    }  
  
    // 如果你需要清除或返回一个清理函数  
    // 可以在这里返回  
    return () => {  
      // 清理函数会在组件卸载前或下一次 useLayoutEffect 运行前执行  
      // 例如，你可以在这里移除事件监听器或清理定时器  
    };  
  }, [count]); // 依赖项数组  
  
  return (  
    <div>  
      <p id="my-element">Count: {count}</p>  
      <button onClick={() => setCount(count + 1)}>Increment</button>  
    </div>  
  );   
}  

export default App

```

### 注意点
1.  **同步执行**：`useLayoutEffect` 中的代码会在浏览器绘制之前同步执行，如果执行时间过长，可能会阻塞页面渲染，导致性能问题或视觉上的卡顿。
1.  **清理函数**：与 `useEffect` 一样，`useLayoutEffect` 也支持返回一个清理函数，用于在组件卸载或副作用重新执行前进行清理工作。
1.  **使用场景**：通常，建议优先使用 `useEffect`，因为它不会阻塞浏览器的绘制过程。只有在需要同步调整布局的副作用操作或有严格的顺序要求时，才考虑使用 `useLayoutEffect`。

### 使用场景
-   **读取 DOM 布局并同步重绘**：当需要在 DOM 更新后立即读取其布局信息并根据这些信息同步更新 DOM 时，可以使用 `useLayoutEffect`。
-   **避免闪烁**：在某些情况下，使用 `useEffect` 可能会导致界面在渲染过程中出现短暂的闪烁，因为 `useEffect` 是在浏览器绘制之后执行的。而 `useLayoutEffect` 可以在绘制之前完成所有必要的 DOM 操作，从而避免这种闪烁。
-   **同步的副作用操作**：当需要在 DOM 更新后立即执行一些同步的副作用操作（如设置滚动位置、焦点管理等）时，`useLayoutEffect` 是一个合适的选择。

### 使用场景
考虑一个场景，你需要在组件更新后立即将焦点设置到某个输入框上。如果使用 `useEffect`，可能会因为浏览器已经完成了绘制而导致焦点设置不生效或出现闪烁。而使用 `useLayoutEffect` 则可以确保在浏览器绘制之前将焦点设置到输入框上。


```js
import { useRef, useEffect, useState,useMemo, useCallback,useImperativeHandle,forwardRef,createContext,useContext,useReducer,useLayoutEffect  } from 'react'
import './App.css'

// 渲染应用  
function App() {  
  const inputRef = useRef(null);  
  
  useLayoutEffect(() => {  
    if (inputRef.current) {  
      inputRef.current.focus();  
    }  
  }, []); // 空依赖项数组表示只在组件挂载时执行  
  
  return <input ref={inputRef} />;   
}  

export default App

```
在这个示例中，`useLayoutEffect` 确保了在组件挂载后立即将焦点设置到了输入框上，而不会导致任何闪烁或焦点设置不生效的问题。

### useLayoutEffect 和 useEffect区别

`useLayoutEffect` 和 `useEffect` 是 React 中用于处理副作用的两个重要 Hook，它们之间在触发时机、对页面渲染的影响以及使用场景上存在一些关键的区别。

#### 触发时机

-   **useEffect**：在组件渲染到屏幕之后异步执行。它不会阻塞浏览器的绘制过程，因此可以在不中断用户界面的情况下完成副作用操作。由于它是异步的，所以可能在组件渲染完成后才能看到副作用的效果。
-   **useLayoutEffect**：在 DOM 更新完成后同步执行，但在浏览器进行绘制之前。这意味着它可以在浏览器绘制页面之前完成所有必要的 DOM 操作，从而避免渲染过程中的闪烁或不一致的界面显示。

#### 对页面渲染的影响

-   **useEffect**：因为是异步执行的，所以不会阻塞页面的渲染过程。这使得它适合于大多数不需要立即执行的副作用场景。
-   **useLayoutEffect**：由于它是同步执行的，并且会在浏览器绘制之前完成，所以如果副作用操作过于复杂或耗时，可能会阻塞页面的渲染，导致性能问题或视觉上的卡顿。

#### 使用场景

-   **useEffect**：

    -   适用于大多数不需要立即执行的副作用场景，如数据获取、订阅事件、设置定时器等。
    -   适用于组件的异步逻辑处理，如网络请求的发送和响应处理。
    -   当副作用操作不需要在 DOM 更新后立即同步执行时，使用 `useEffect` 是更好的选择。

-   **useLayoutEffect**：

    -   适用于需要在 DOM 更新后立即同步执行的副作用场景，如读取 DOM 布局、调整滚动位置、设置焦点等。
    -   当需要确保用户看到一致的界面，避免渲染过程中的闪烁或不一致时，使用 `useLayoutEffect`。
    -   注意，由于它可能会阻塞浏览器的绘制，所以应该谨慎使用，并确保副作用操作尽可能高效。


#### useEffect 示例：


```js
import { useRef, useEffect, useState,useMemo, useCallback,useImperativeHandle,forwardRef,createContext,useContext,useReducer,useLayoutEffect  } from 'react'
import './App.css'

// 渲染应用  
function App() {  
  const [data, setData] = useState(null);  
  
  useEffect(() => {  
    const fetchData = async () => {  
      const response = await fetch('https://api.example.com/data');  
      const result = await response.json();  
      setData(result);  
    };  
  
    fetchData();  
  }, []); // 空数组表示只在组件挂载时执行  
  
  return <div>{data ? <p>{data.text}</p> : <p>Loading...</p>}</div>;  
}  

export default App

```

#### useLayoutEffect 示例：


```js
import { useRef, useEffect, useState,useMemo, useCallback,useImperativeHandle,forwardRef,createContext,useContext,useReducer,useLayoutEffect  } from 'react'
import './App.css'

// 渲染应用  
function App() {  
  const inputRef = useRef(null);  
  
  useLayoutEffect(() => {  
    if (inputRef.current) {  
      inputRef.current.focus();  
    }  
  }, []); // 空数组表示只在组件挂载时执行  
  
  return <input ref={inputRef} type="text" placeholder="Type here..." />; 
}  

export default App

```


## 10: useDebugValue
React的`useDebugValue`是一个Hook，它主要用于在开发过程中帮助开发者调试自定义Hook。以下是关于`useDebugValue`的作用、用法、注意点及使用场景的详细解答：

### 作用
`useDebugValue`的主要作用是将自定义Hook中的某些值暴露给React开发工具（如React DevTools），以便于开发者在调试时能够更直观地查看和理解组件的状态。它类似于在开发过程中为自定义Hook打上了一个“标签”，使得开发者在查看组件状态时能够更容易地识别和理解这些Hook的内部状态。

### 注意点
1.  **只在自定义Hook中使用**：`useDebugValue`应该在自定义Hook的方法体中使用，而不是在组件的函数体或其他位置。
1.  **不会改变组件的渲染**：`useDebugValue`仅仅是为了调试目的而暴露值给React DevTools，它不会改变组件的渲染输出。
1.  **性能考虑**：由于`useDebugValue`主要用于调试目的，因此在生产环境下应该避免使用，以避免不必要的性能开销。

### 使用场景


```js
import { useRef, useEffect, useState,useMemo, useCallback,useImperativeHandle,forwardRef,createContext,useContext,useReducer,useLayoutEffect,useDebugValue  } from 'react'
import './App.css'

function useMyCounter(initialCount = 0) {  
  const [count, setCount] = useState(initialCount);  
  
  // 使用useDebugValue暴露count值给React DevTools  
  useDebugValue(`Count: ${count}`);  
  
  const increment = () => setCount(count + 1);  
  const decrement = () => setCount(count - 1);  
  
  return [count, increment, decrement];  
}  

// 渲染应用  
function App() {  
  const [count, increment, decrement] = useMyCounter(0);  
  
  return (  
    <div>  
      <p>Count: {count}</p>  
      <button onClick={increment}>Increment</button>  
      <button onClick={decrement}>Decrement</button>  
    </div>  
  );  
}  

export default App

```
在这个例子中，`useMyCounter`是一个自定义Hook，它管理了一个计数器。通过`useDebugValue`，我们将计数器的当前值暴露给了React DevTools，使得开发者可以在调试时直接查看到这个值。次hook仅为了调试，请注意取舍

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/de77a09f19364e30a8b37626d75f00fa~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755072391&x-orig-sign=YgQIFJLmElpFNgHl3k0gVV0x%2Fb0%3D)


### 结尾
以上信息部分借助`AI`工具生成，全部例子经过验证，仅作记录，按需取舍



