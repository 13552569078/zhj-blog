#### 1：watch / watchEffect
watch 监听 ref  及 reactive 的区别，二者具体用法如下：
#### ref
```
 watch(state, (newValue, oldValue) => {
          console.log(`原值为${oldValue}`)
          console.log(`新值为${newValue}`)
        })
```
#### reactive
```
const state = reactive({count: 0})
watch(() => state.count, (newValue, oldValue) => {
  console.log(`原值为${oldValue}`)
  console.log(`新值为${newValue}`)
}
```
#### watchEffect

```
const state = reactive({ count: 0, name: 'zs' })
watchEffect(() => {
   console.log(state.count)
   console.log(state.name)
})
```
#### 何时使用watch   watchEffect，二者区别
1：可见watch可监听ref 及 reactive的值，并且可自由配置，默认第一次不触发，可自由配置，用于需要监听变化前及变化后的值，用法繁琐

```
watch(
      symbolDataList,
      newVal => {
        if (!newVal.length) return;
        symbolDataListObjData.symbolDataList = [...newVal];
      },
      {
        deep: true,
        immediate: true
      }
    );
```
2：watchEffect 初始化会自动查找内部依赖的变量，会自动查找依赖，内部有任何一值更改，都会触发回调，但是不会返回修改前及修改后的数据

```
watchEffect(() => {
   console.log(state.count)
   console.log(state.name)
})
```

#### 2：getCurrentInstance proxy 
由于vue3不会提供this 选项，在处理路由会获取当前的路由list，可如下操作

```
import { defineComponent, onMounted, ref, watch, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance()!;
const routeList = proxy?.$router.getRoutes() || [];
routeList.forEach(item => {
  if (item.meta.menu && item.children && item.children.length > 0) {
    item.children = item.children.filter(sonItem => {
      return !sonItem.meta?.hidden;
    });
    menuList.value.push(item);
  }
});
```
