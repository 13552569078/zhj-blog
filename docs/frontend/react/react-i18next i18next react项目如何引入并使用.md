在React项目中使用`react-i18next`和`i18next`进行国际化（i18n）是一个常见的做法。下面是一个详细的步骤指南，包括如何引入、配置和使用这些库，以及如何实现手动更改目标语言的功能。

### 1. 安装依赖

首先，你需要安装`react-i18next`和`i18next`：

```bash
npm install react-i18next i18next
```

或者如果你使用`yarn`：

```bash
yarn add react-i18next i18next
```

### 2. 配置i18n

在你的项目中创建一个配置文件，例如`i18n.js`，用于配置`i18next`。

```javascript
// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 资源文件（语言翻译）
const resources = {
  en: {
    translation: {
      welcome: 'Welcome',
      goodbye: 'Goodbye',
    },
  },
  fr: {
    translation: {
      welcome: 'Bienvenue',
      goodbye: 'Au revoir',
    },
  },
};

i18n
  .use(initReactI18next) // 初始化插件
  .init({
    resources, // 资源
    lng: 'en', // 默认语言
    interpolation: {
      escapeValue: false, // react已经处理了XSS问题，这里设置为false
    },
  });

export default i18n;
```

### 3. 在React项目中使用

接下来，在你的React项目中引入并使用`i18next`和`react-i18next`。

#### 3.1 包裹你的应用

使用`I18nextProvider`包裹你的应用组件。

```javascript
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>,
  document.getElementById('root')
);
```

#### 3.2 使用翻译组件

在你的组件中使用`useTranslation`钩子来访问翻译文本。

```javascript
// src/App.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import { withNamespaces } from 'react-i18next';
import { Button, Select } from 'antd'; // 假设你使用Ant Design

const App = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <Button onClick={() => alert(t('goodbye'))}>Alert Goodbye</Button>
      <div>
        <label>
          Language:
          <Select onChange={handleLanguageChange} defaultValue={i18n.language} style={{ width: 200 }}>
            <Select.Option value="en">English</Select.Option>
            <Select.Option value="fr">French</Select.Option>
          </Select>
        </label>
      </div>
    </div>
  );
};

export default withNamespaces()(App); // 如果你使用withNamespaces来命名空间，可以省略这一步，如果不用，记得在t函数里加上命名空间
```

### 4. 运行项目

现在，你可以运行你的React项目，并看到翻译后的文本。

```bash
npm start
```

或者如果你使用`yarn`：

```bash
yarn start
```

### 5. 手动修改目标语言

在上面的代码中，我们通过`i18n.changeLanguage(e.target.value);`实现了手动修改目标语言的功能。当用户选择不同的语言选项时，应用会相应地更新语言。

### 6. 在非函数组件使用

在 React 函数组件外部（例如在一个 `.ts` 公用函数文件中）直接使用 `t` 函数是不可能的，因为 `t` 函数是通过 `react-i18next` 的 `useTranslation` 钩子提供的，它依赖于 React 的组件上下文。钩子只能在函数组件或自定义钩子的内部调用。

然而，你可以通过几种方式在组件外部访问翻译功能：

```typescript
// translationService.ts
import i18n from './i18n'; // 假设你已经在某处配置了 i18n 实例

export const getTranslation = (key: string, options?: any): string => {
  return i18n.t(key, options);
};
```

然后，在你的非函数文件中，你可以这样使用它：

```typescript
import { getTranslation } from './translationService';

// 校验正整数
export const validatePositiveInteger = (_: any, value: string) => {
  if (!value) {
    return Promise.resolve(); // 如果值为空，则认为是有效的（根据需求，这里可以改为返回 Promise.reject()）
  }

  const num = Number(value);

  if (Number.isInteger(num) && num > 0) {
    return Promise.resolve();
  }
  return Promise.reject(new Error(getTranslation("validate.isInteger")));
};
```


### 总结

通过上述步骤，你已经成功在React项目中引入了`react-i18next`和`i18next`，并实现了基本的国际化和手动修改目标语言的功能。你可以根据需要添加更多的语言资源，并在组件中使用`t`函数来访问这些翻译文本。