## 背景

水文，记录下css属性而已

## inset

`inset` 是 CSS 中的一个简写属性，用于同时设置元素的 **`top`、`right`、`bottom`、`left`** 四个定位属性。它的设计目的是简化定位相关的样式声明，尤其适合需要同时调整元素四个方向位置的场景。

### 基本语法

`inset` 可以接受 1\~4 个值，遵循与 `margin`、`padding` 类似的简写规则：

```css
/* 1个值：同时应用于 top/right/bottom/left */
inset: <value>;

/* 2个值：第1个值对应 top/bottom，第2个值对应 right/left */
inset: <value1> <value2>;

/* 3个值：第1个值对应 top，第2个值对应 right/left，第3个值对应 bottom */
inset: <value1> <value2> <value3>;

/* 4个值：分别对应 top、right、bottom、left（顺时针顺序） */
inset: <value1> <value2> <value3> <value4>;
```

### **取值类型**

`inset` 支持多种 CSS 长度单位和关键字：

*   长度单位：`px`、`em`、`rem`、`%` 等（例如 `inset: 10px 20%`）
*   关键字：`auto`（默认值，由浏览器自动计算）
*   其他：`calc()` 计算值（例如 `inset: calc(50% - 100px)`）

### **与单独属性的对应关系**

`inset` 的简写方式完全等价于分别设置四个方向的属性，例如：

```css
/* 简写形式 */
inset: 10px 20px 30px 40px;

/* 等价于单独声明 */
top: 10px;
right: 20px;
bottom: 30px;
left: 40px;
```

再举几个例子：

*   `inset: 0;` → `top:0; right:0; bottom:0; left:0;`（最常用场景）
*   `inset: 10px auto;` → `top:10px; bottom:10px; right:auto; left:auto;`
*   `inset: 0 20%;` → `top:0; bottom:0; right:20%; left:20%;`

### **使用场景**

`inset` 通常与 **`position` 属性**  **`fixed` 属性** 配合使用，根据不同的定位方式产生不同效果：

*   **`position: absolute`**\
    元素相对于最近的「已定位祖先」（`position` 不为 `static` 的祖先）定位，`inset` 控制元素与祖先的边距。\
    例：让元素填充整个定位容器（常用作全屏遮罩或背景层）：

```css
.overlay {
  position: absolute;
  inset: 0; /* 完全覆盖父容器 */
  background: rgba(0,0,0,0.5);
}
```

*   **`position: fixed`**\
    元素相对于视口（浏览器窗口）定位，`inset` 控制元素与视口的边距。\
    例：固定在页面顶部的导航栏，宽度占满屏幕：

```css
.navbar {
  position: fixed;
  inset: 0 0 auto 0; /* top:0; right:0; bottom:auto; left:0; */
  height: 60px;
}
```

以下 `fiexd`定位 可以实现撑开父元素，原先我们需要设置 width:100%  height:100%的 现在直接  inset: 0;即可撑开父元素

```js
.loading {
      position: fixed;
      inset: 0;
      background: red;
    }
```

## 简单实现spinner

我们借助 `border` `border-top` 和`border-radius` 可以简化的实现 spinner效果 代码如下

```js
.spinner {
      width: 100px;
      height: 100px;
      border: 5px solid gray;
      border-left: 5px solid red;
      border-radius: 50%;
      animation: spin 2s linear infinite;
    }

    @keyframes spin {
     from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/08085a2bee90429281cf9d6e5c8d7225~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755070842&x-orig-sign=A8BqrpcMDV%2BgeH94hlXxxqE6cLo%3D)
