### 背景

项目中有比较两个json，并可视化展示对应变更的场景，经调研可借用`diff`和`diff2html`来实现，这两个插件实现的功能很强大，具体可查看对应的文档[diff](https://www.npmjs.com/package/diff) 、[diff2html](https://www.npmjs.com/package/diff2html)
最终效果如下

![微信截图\_20240919141838.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/e8e73267f3104b56a3bf2cae18457d72~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755072027&x-orig-sign=1vB6QM%2Fmo7rsXdKAJWrxaf3gP0U%3D)

### 安装

```js
npm i diff diff2html -S
```

### 实现

vue3版本实现demo

```js
<script setup>
import { createPatch } from 'diff'
import { Diff2HtmlUI } from 'diff2html/lib/ui/js/diff2html-ui'
import "diff2html/bundles/css/diff2html.min.css";
import { ref, onMounted } from 'vue'

defineProps({
    msg: String,
})
const count = ref(0)

onMounted(() => {
    const obj1 = {
        "responseId": "1737028341676815839",
        "sessionId": "",
        "phone": "13552569078",
        "userName": "",
        "responseContent": "您请注意，以上资料来源于公开数据，由AI生成内容供参考。",
        "recommend": "",
        "requestContent": "结婚登记",
        "historyContent": "历史记录",
        "responseTime": "2024-09-18 19:22:07",
        "conversationId": "00a38ef2dfc6480c8d802b3e73fe4eff",
        "isComment": 0,
        "nextOptions": [
            {
                "id": "北京市朝阳区民政局-3",
                "value": "北京市朝阳区民政局",
                "level": 3
            }
        ],
        "postFix": "",
        "nodeType": "2"
    };
    const obj2 = {
        "responseId": "1737028341676815840",
        "sessionId": "",
        "phone": "13552569078",
        "userName": "",
        "responseContent": "您想了解“结婚登记”哪方面的办理内容：",
        "recommend": "",
        "requestContent": "北京市朝阳区民政局",
        "historyContent": "历史记录",
        "responseTime": "2024-09-18 19:22:08",
        "conversationId": "00a38ef2dfc6480c8d802b3e73fe4eff",
        "isComment": 0,
        "nextOptions": [
            {
                "id": "申请条件-4",
                "value": "申请条件",
                "level": 4
            },
            {
                "id": "申请材料-4",
                "value": "申请材料",
                "level": 4
            },
            {
                "id": "办理地点，时间及联系方式-4",
                "value": "办理地点，时间及联系方式",
                "level": 4
            },
            {
                "id": "办理流程-4",
                "value": "办理流程",
                "level": 4
            }
        ],
        "postFix": "\n请注意，此信息仅作参考，详细办理流程请向相关部门咨询。",
        "nodeType": "2"
    };


    // 将JSON对象转换为字符串进行比较  
    const text1 = JSON.stringify(obj1, null, 2);
    const text2 = JSON.stringify(obj2, null, 2);


    const diffString = createPatch('test2', text1, text2, 'oldHeader', 'newHeader');


    console.dir(diffString)
    const targetElement = document.getElementById('myDiffElement');
    const configuration = {
        drawFileList: false,
        fileListToggle: false,
        fileListStartVisible: false,
        fileContentToggle: false,
        matching: 'lines',
        outputFormat: 'side-by-side',
        synchronisedScroll: true,
        highlight: true,
        renderNothingWhenEmpty: false,
    };
    const diff2htmlUi = new Diff2HtmlUI(targetElement, diffString, configuration);
    diff2htmlUi.draw();
    diff2htmlUi.highlightCode();
})


</script>

<template>
    <div id="myDiffElement" v-html="count"></div>
</template>

<style scoped>
.d2h-code-side-line {
    display: none;
}
</style>

```

### 说明

`diff2html`实现对比渲染，接收`diff`类型字符串，可以借用`diff`来实现，也可以后端生成对用得字符串，前端渲染
