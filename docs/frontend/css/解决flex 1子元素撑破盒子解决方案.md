### 背景
做一行溢出...展示得时候，flex:1;会撑破盒子，造成溢出...无法正确展示，解决方式是flex:1元素 加上 `overflow: hidden;`

### 标准盒子溢出无此问题，代码及展示如下

```js
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .wrap {
            width: 500px;
            border: 1px solid red;
        }

        .ellipsis {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    </style>
</head>

<body>
    <div class="wrap">
        <div class="ellipsis">我是测试得文字我是测试得文字我是测试得文字我是测试得文字我是测试得文字我是测试得文字</div>
    </div>
</body>
```

![微信截图_20240510101854.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/508f57406266447e979765dada44aea8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=715&h=97&s=27461&e=jpg&b=fffefe)

### 包含一层flex:1元素，无法正确溢出


```js
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .wrap {
            width: 500px;
            border: 1px solid red;
            display: flex;
        }

        .item1 {
            flex: 1;
        }

        .ellipsis {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    </style>
</head>

<body>

    <div class="wrap">
        <div class="item1">
                <div class="ellipsis">我是测试得文字我是测试得文字我是测试得文字我是测试得文字我是测试得文字我是测试得文字</div>
        </div>
    </div>
</body>
```

![微信截图_20240510102308.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b941644942444e59bce1fc74f06b400c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=881&h=90&s=33840&e=jpg&b=fffdfd)

解决方式是： `flex:1，`增加 `overflow: hidden;`


```js
 .item1 {
            flex: 1;
            overflow: hidden;
        }
```

可正常溢出

![微信截图_20240510102429.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d57ffada3e8949fca040c12aa938750d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=716&h=77&s=27108&e=jpg&b=fefdfd)

如果父元素需要滚动 无法设置  `overflow: hidden;` 则设置 `width:0` 或者  `min-width:0`同样可达到效果


