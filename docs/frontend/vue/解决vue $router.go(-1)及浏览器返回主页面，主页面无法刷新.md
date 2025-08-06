## 背景
最近项目中开发，有一个需求大至如下<br />
1：一个门户特面模块，有tab切换，每个切换下对应一个列表<br />
2：其中tabs有一部分列表是A系统的，另一部分需要融合B系统的页面<br />
3：均有查看，查看A系统的跳转A系统对应详情，B查看需要跳转B对应详情<br />
4：B页面的详情有返回功能，使用$router.go(-1)<br />
5：B系统返回，需要A主页面门户全部初始化，现在初次加载后会缓存，再次返回不回初始化（不会走VUE的任何生命周期）<br />
## 产生原因
vue应用中跳转到外部连接而后在回退到vue应用里面，beforeRouterEnter没有被触发，created、mounted里面也没有执行代码，那就证实有可能页面被缓存了，因此这些钩子没有触发，
## 解决办法
由于是页面被缓存，及使用DOM页面的pageshow事件来监听，需要刷新的页面监听pageshow
`
```
created () {
    window.addEventListener('pageshow', () => {
        //外链回退到vue应用要执行的代码
    })
},
beforeDestroy() {
    window.removeEventListener('pageshow', () => {
     //外链回退到vue应用要执行的代码
    })
  }
```
`
