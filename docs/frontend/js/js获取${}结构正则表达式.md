## 背景
产品需要，前端配置${}的字符串({}中为系统中可填充的变量)，传给后台，后台需要根据${}中的变量，动态添加数据。
比如适用于短信模板，预警等生成模板
#### 需求1
要求，${}中的文字，需要限制固定数组中，也就是${}中的文字必须在给定的数组中，且${}中**不能**为空，
正则及校验方法如下，

```js
const ALARM_TITLE_LIST = ['监测主体名称', '监测点名称', '预警开始时间', '风险分类', '预警等级', '规则名称', '附加标识'];
const isValidAlarmTitle = (rule: any, value: any, callback: any) => {
  const regG = /\$\{(.*?)\}/g;
  let result = null;
  const list = [];
  do {
    result = regG.exec(value);
    result && list.push(result[1]);
  } while (result);
  console.log(list);
  if (list.length) {
    const isTrue = list.every((item: string) => {
      return ALARM_TITLE_LIST.includes(item);
    });
    isTrue ? callback() : callback(new Error('预警标题生成规则格式错误'));
  } else {
    callback(new Error('至少输入一个参数'));
  }
};
```
#### 需求1
要求，${}中的文字，需要限制固定数组中，也就是${}中的文字必须在给定的数组中，且${}中**能**为空，
正则及校验方法如下，

```js
const ALARM_TITLE_LIST = ['监测主体名称', '监测点名称', '预警开始时间', '风险分类', '预警等级', '规则名称', '附加标识'];
const isValidAlarmTitle = (rule: any, value: any, callback: any) => {
  const regG = /\$\{(.+?)\}/g;
  let result = null;
  const list = [];
  do {
    result = regG.exec(value);
    result && list.push(result[1]);
  } while (result);
  console.log(list);
  if (list.length) {
    const isTrue = list.every((item: string) => {
      return ALARM_TITLE_LIST.includes(item);
    });
    isTrue ? callback() : callback(new Error('预警标题生成规则格式错误'));
  } else {
    callback(new Error('至少输入一个参数'));
  }
};
```
## 结尾
类似于element 框架，自定义表单校验 可直接使用

```js
const rules = {
alarmDesc: [
    { required: true, message: '预警描述生成规则不能为空' },
    { validator: isValidAlarmDesc, trigger: ['change', 'blur'] }
  ],
}
```