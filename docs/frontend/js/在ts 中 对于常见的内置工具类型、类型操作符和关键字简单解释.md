### 背景

最近面试的时候，经常看到有同学说自己熟练使用ts 结果一问 `Pick` `Omit` `Partial` `Required` `keyof` `typeof` `Record`等都说的不太清楚，仅仅是对于 `type` `interface`有些了解，下面简单的说下这些的基础用法，用于扫盲。

### **`keyof` 操作符**
`keyof` 用于获取**类型**的所有公共属性名，返回一个由这些属性名组成的**联合类型**。

#### **核心作用**

-   将类型的属性名转换为联合类型。
-   常用于泛型约束，确保参数是对象的有效属性名。


```js
// 类型定义
type User = {
  name: string;
  age: number;
  email: string;
};

// 使用 keyof 获取属性名联合类型
type UserKeys = keyof User; // 等价于: "name" | "age" | "email"


// 泛型约束示例
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const user: User = { name: "Alice", age: 30, email: "alice@example.com" };
const name: string = getProperty(user, "name"); // ✅ 正确
// const invalid = getProperty(user, "invalidKey"); // ❌ 错误："invalidKey" 不在 "name" | "age" | "email" 中

```

### **`typeof` 操作符**
在 TypeScript 中，`typeof` 用于获取**值**的类型（注意与 JavaScript 中的`typeof`区分，后者返回值的运行时类型字符串）。

#### **核心作用**

-   将值转换为对应的类型。
-   常用于获取变量、对象、函数或类的类型。


```js

// 对象字面量
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retry: true
};

// 使用 typeof 获取 config 的类型
type ConfigType = typeof config;
// 等价于:
// type ConfigType = {
//   apiUrl: string;
//   timeout: number;
//   retry: boolean;
// };

```

### **`keyof typeof` 组合使用**

`eyof typeof` 结合了两者的功能：先用 `typeof` 获取值的类型，再用 `keyof` 获取该类型的属性名联合类型。

#### **核心作用**

-   从**值**中提取属性名的联合类型，避免重复定义类型。
-   常用于静态对象、枚举、类的静态属性等场景。


```js
const settings = {
  theme: "dark",
  fontSize: 16,
  isPremium: true
};

// 获取 settings 对象的属性名联合类型
type SettingKeys = keyof typeof settings; // "theme" | "fontSize" | "isPremium"

// 类型安全的属性访问函数
function getSetting(key: SettingKeys) {
  return settings[key];
}

const theme = getSetting("theme"); // ✅ 正确
// const invalid = getSetting("language"); // ❌ 错误："language" 不在 SettingKeys 中

```

### 其他关键字的大致解释

### `Pick<T, K>`
**作用**：从类型 `T` 中选取指定的属性 `K`，组成新类型。

```js
type User = { name: string; age: number; email: string };
type NameAndEmail = Pick<User, "name" | "email">; // { name: string; email: string }
```
### **`Omit<T, K>`**
**作用**：从类型 `T` 中排除指定的属性 `K`，返回剩余属性组成的新类型。
```js
type User = { name: string; age: number; email: string };
type WithoutEmail = Omit<User, "email">; // { name: string; age: number }
```

### **`Partial<T>`**

**作用**：将类型 `T` 的所有属性变为可选（`?`）。


```js
type User = { name: string; age: number };
type PartialUser = Partial<User>; // { name?: string; age?: number }
```

### **`Required<T>`**
**作用**：将类型 `T` 的所有可选属性变为必需（移除 `?`）


```js
type User = { name?: string; age?: number };
type RequiredUser = Required<User>; // { name: string; age: number }
```

### **`Record<K, T>`**
**作用**：创建一个对象类型，其键为 `K`，值为 `T`。


```js
type UserRoles = Record<string, boolean>; // { [key: string]: boolean }
```




### **常见误区与注意事项**

 **`keyof` 与 `keyof typeof` 的区别**：

   `keyof SomeType`：直接从类型中提取属性名。
   
   `keyof typeof someValue`：先获取值的类型，再提取属性名。
   
   
   




