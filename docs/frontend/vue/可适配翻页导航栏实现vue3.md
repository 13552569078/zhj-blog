### 背景
横向导航栏菜单过多的时候，会造成横向的导航栏隐藏，现想做当导航栏过多隐藏的时候，加一个【下一页】，当左边有隐藏的时候，加一个【上一页】，效果如下<br />
##### 1：导航过多，则展示下一页

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a449ffdf6386494aa7465400d1e16c85~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1905&h=224&s=33217&e=png&b=ffffff)

##### 2：点击了下一页，则左右有隐藏后，展示上一页


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dcabd9ac47274d4f8c5194160d405f29~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1751&h=95&s=8042&e=png&b=fffefe)

##### 3：最终实现如下：
[jvideo](https://www.ixigua.com/7384724425498690088?utm_source=xiguastudio)


### 实现思路
##### 1:dom元素中有scrollWidth，clientWidth，scrollLeft属性，
在DOM（Document Object Model）中，`scrollWidth`、`clientWidth` 和 `scrollLeft` 是与元素滚动和尺寸相关的属性，特别是在处理滚动容器或可滚动元素时非常有用。以下是这三个属性的详细解释：

1.  **`scrollWidth`**：

    -   **含义**：`scrollWidth` 属性返回元素的完整宽度，包括由于溢出（overflow）而被隐藏的部分。
    -   **注意**：这个值通常等于元素的宽度（通过CSS或其他方式设置）加上任何滚动条（如果存在的话），但更重要的是，它包括了任何由于内容过多而溢出到视口之外的部分。
    -   **用途**：通常用于确定元素的实际内容宽度，而不仅仅是可见部分。

1.  **`clientWidth`**：

    -   **含义**：`clientWidth` 属性返回元素的内部宽度（以像素为单位），包括元素的填充（padding），但不包括边框（border）、外边距（margin）和水平滚动条（如果存在的话）。
    -   **注意**：这个值通常是元素在视口中可见的宽度。
    -   **用途**：在布局和尺寸计算中，这个属性常被用于确定元素的实际可见宽度。

1.  **`scrollLeft`**：

    -   **含义**：`scrollLeft` 属性设置或返回元素被滚动到左边的距离（以像素为单位）。
    -   **注意**：这个值是一个可写的属性，意味着你可以设置它来滚动元素到特定的位置。同样地，它也可以被读取来确定元素当前被滚动到了哪个位置。
    -   **用途**：在滚动动画、滚动到特定位置或跟踪滚动位置时，这个属性非常有用。

这三个属性通常一起使用，以获取和设置元素的滚动和尺寸信息。例如，你可能想要滚动一个元素到其内容的特定位置，或者确定元素的内容是否完全可见（即 `scrollWidth` 是否大于 `clientWidth`）。

简单来说就是`clientWidth`是一个dom元素的可视窗口宽度，`scrollWidth`是全部内容的宽度，`scrollLeft`是元素距离左右的滚动距离

##### 2: 判断 `dom.scrollWidth > dom.clientWidth + dom.scrollLeft` 来判断当前元素是否被隐藏，隐藏了则证明右侧有内容被遮盖，这时 下一页按钮需要展示。为避免临界值，可以增加固定宽度来辅助校验 如 `dom.scrollWidth > dom.clientWidth + dom.scrollLeft + 80` 80为辅助校验的，有时`dom.clientWidth + dom.scrollLeft`到最右边了，但是仍小于 `dom.scrollWidth` 处理精度问题

##### 3: 判断`dom.scrollLeft`是否是0，不为0则是左右有隐藏，需要展示 上一页按钮
 
##### 4: 每次点击前后的操作时， `dom.scrollLeft += 120` 或者  `dom.scrollLeft -= 120`，更改左侧间距

##### 5: js动态设置  `dom.scrollLeft`并不会触发 `css` 的  `transition`过度，我们需要增加一个函数，来模拟滚动的平滑滚动


### 代码结构如下，借助vue3来实现demo，源码如下


```js

<template>
  <div class="header">
    <div class="prev btn" @click="changeLeft" v-if="prevable">前</div>
    <div class="menu-wrap" ref="wrapRef">
      <!-- 导航 -->
      <div class="menu-item" v-for="(item, index) in nemuList" :key="index">{{ item }}</div>
    </div>
    <div class="next btn" @click="changeRight" v-if="nextable">后</div>
    <div class="logo">
      头像等占位符
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue"

// 导航
const nemuList = ref(Array.from({ length: 20 }, (_, index) => `测试导航${index + 1}`));
// 上一页是否可点击
const prevable = ref(false);
// 下一页是否可点击
const nextable = ref(false);
// dom
const wrapRef = ref();


const changeLeft = async () => {
  if (!prevable.value) return;
  // 每次翻页一个
  const dom = wrapRef.value;
  smoothScrollTo(dom, dom.scrollLeft - 120, 300)
  setTimeout(async () => {
    await nextTick();
    init()
  }, 300);
}

const changeRight = async () => {
  if (!nextable.value) return;
  // 每次翻页一个
  const dom = wrapRef.value;
  smoothScrollTo(dom, dom.scrollLeft + 120, 300)
  setTimeout(async () => {
    await nextTick();
    init()
  }, 300);
}

const init = () => {
  const dom = wrapRef.value;
  if (!dom) return;
  if (dom.scrollWidth > dom.clientWidth + dom.scrollLeft + 80) {
    nextable.value = true;
  } else {
    nextable.value = false;
  }
  // 判断是否有上一页面
  if (dom.scrollLeft) {
    prevable.value = true;
  } else {
    prevable.value = false;
  }
}

onMounted(() => {
  init()
})

// 定义一个函数来实现平滑滚动
const smoothScrollTo = (element: any, targetScrollLeft: any, duration: any) => {
  // 初始滚动位置
  let start = element.scrollLeft;
  let startTime: number | null = null;

  // 动画效果的定时器
  function scroll() {
    // 确保startTime被设置
    if (!startTime) startTime = performance.now();

    // 计算经过的时间
    const currentTime = performance.now();
    const timeElapsed = currentTime - startTime;

    // 计算当前应该滚动到的位置
    let progress = Math.min(timeElapsed / duration, 1);

    // 使用ease-out立方贝塞尔曲线公式
    element.scrollLeft = start + ((targetScrollLeft - start) * (1 - Math.pow(1 - progress, 3)));

    // 如果动画没有结束，则继续动画
    if (timeElapsed < duration) {
      requestAnimationFrame(scroll);
    }
  }

  // 开始滚动动画
  requestAnimationFrame(scroll);
}

</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

.header {
  height: 50px;
  width: 100%;
  border: 1px solid gray;
  display: flex;

  .btn {
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid salmon;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      color: white;
      background-color: blue;
    }
  }

  .menu-wrap {
    flex: 1;
    overflow: hidden;
    display: flex;
    transition: all 0.4s ease-in-out;


    .menu-item {
      transition: all 1s ease-in-out;

      width: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid greenyellow;
      flex-shrink: 0;
    }
  }

  .logo {
    width: 200px;
    background: orange;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
}
</style>


```


