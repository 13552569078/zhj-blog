## 背景

项目场景需要缓存`localStorage`或者`sessionStorage`的时候，涉及到跨页面传值通信，以`a`页面通过`window.open`打开的**同源页面**`b`页面为例，测试下 `localStorage`或者`sessionStorage`的页面通信。<br/>

**以下所有结论基于两点前提**

1.  同源
2.  `window.open`打开

## localStorage

创建`a`页面代码如下

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>

<body>
  <button onclick="setaa()">设置aa</button>
  <button onclick="setbb()">设置bb</button>
  <button onclick="opentest()">打开同源页面</button>
  <script>
    const setaa = () => {
      localStorage.setItem('aaa', 'aaa')
    }

    const setbb = () => {
      localStorage.setItem('bbb', 'bbb')
    }

    const opentest = () => {
       window.open('./test2.html', "_blank")
    }

  </script>
</body>

</html>
```

### localStoraget通信验证流程

1.  点击`设置aa` `button`
2.  点击`打开同源页面`,打开新页面
3.  新页面输入 `localStorage.getItem("aaa")`,新页面可以获取到对应缓存

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/60dacea3c471421b8e3c4135684018c9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071931&x-orig-sign=RASMWQsjI1%2F74JP6%2Fjh%2FlT0Z85o%3D)

4.  打开原始页面，点击`设置bb`,再打开新页面输入 `localStorage.getItem("bbb")`,新页面**可以**获取到对应缓存

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/df8ecdb001694c09aa6231d8bdc87727~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071931&x-orig-sign=rr8MYPfGtGvYzT3%2B93b3yNTyDAg%3D)

5.  新页面执行`localStorage.clear()`，原始页面执行 `localStorage.getItem("aaa")`,原始页面的**localStorage同样清空**

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/08766f31bfac4efbb418396a245672fd~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071931&x-orig-sign=ozFcOLJPnqK1AukJauZ12KxKsQg%3D)

## localStorage

同样的流程，创建原始页面 代码如下

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>

<body>
  <button onclick="setaa()">设置aa</button>
  <button onclick="setbb()">设置bb</button>
  <button onclick="opentest()">打开同源页面</button>
  <script>
    const setaa = () => {
      sessionStorage.setItem('aaa', 'aaa')
    }

    const setbb = () => {
      sessionStorage.setItem('bbb', 'bbb')
    }

    const opentest = () => {
       window.open('./test2.html', "_blank")
    }

  </script>
</body>

</html>
```

### sessionStorage通信验证流程

1.  点击`设置aa` `button`
2.  点击`打开同源页面`,打开新页面
3.  新页面输入 `sessionStorage.getItem("aaa")`, 新页面可以获取到对应缓存

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a376bdd24a9c42a5a12aabe716103b2e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071931&x-orig-sign=tQkLSVbSRzTkcU3SOAWRMGJmzBg%3D)

4.  打开原始页面，点击`设置bb`,再打开新页面输入 `sessionStorage.getItem("bbb")`,新页面**不可以**获取到对应缓存

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/99c696d8d65a4eba878fd1f4ca1c64b7~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071931&x-orig-sign=Mko4tox02vMzEEFVN3EblHZSQyw%3D)

5.  新页面执行`sessionStorage.clear()`，原始页面执行 `sessionStorage.getItem("aaa")`, `sessionStorage.getItem("aaa")`, **sessionStorage没有清空**

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/e10849c7f96e494182b701168966081f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071931&x-orig-sign=LfUpIS5XUwdCZNh7wmtYu%2B1LKmE%3D)

## 试验结论

1.  `sessionStorage`和`localStorage`在新页面打开前，已经存在的缓存，新打开的页面永阳可以获取到对应缓存
2.  新页面打开后，原始页面设置新的`localStorage`，**新打开页面同样可以获取到**
3.  新页面操作`localStorage`，**也会**影响到原始页面的`localStorage`
4.  新页面打开后,原始页面设置新的`sessionStorage`，**新打开页面获取不到**
5.  新页面操作`sessionStorage`，**不会**影响到原始页面的`sessionStorage`

## 总结

1.  `localStorage`是引用，原始页面和新页面操作均**会影响**对应的数据
2.  `sessionStorage`是复制，原始页面和新页面操作均会**不影响**彼此的缓存，只是新开的时候复制了一份缓存
