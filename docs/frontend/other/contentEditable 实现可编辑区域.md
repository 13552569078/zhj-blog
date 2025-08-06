## 背景

最近看豆包的时候，发现他的代码写AI编程模块 如下

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/3c0ad3fe9bfe4e66875577649a7dfabd~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071068&x-orig-sign=fVHfWV7kkSNmzY%2B0Gl0vOGx3HhA%3D) 借助的是`contentEditable `来实现的，操作比较友好，可以随意输入可编辑数据，有类似于 `placeholder`等属性

如果我们开发大模型，免不了东西借鉴一下，下面基于react 来封装 一个 使用`contentEditable `来实现的可编辑区域组件

## 实现重点

1.  开启 `contentEditable `后 如何模拟 `placeholder`
2.  如何判断何时展示 `placeholder` 何时展示真实内容
3.  调整优化以及受控组件封装

## 代码如下

```js
import React, { useState, useRef, useEffect } from 'react'

interface ContentEditablePromptProps {
  placeholder?: string
  className?: string
  value?: string
  onChange?: (value: string) => void
}

const ContentEditablePrompt: React.FC<ContentEditablePromptProps> = ({
  placeholder = '请输入',
  className = '',
  value = '',
  onChange
}) => {
  const contentEditableRef = useRef<HTMLDivElement>(null)
  const [isEmpty, setIsEmpty] = useState(true)
  const [internalValue, setInternalValue] = useState(value)

  useEffect(() => {
    if (contentEditableRef.current) {
      contentEditableRef.current.textContent = value
      setIsEmpty(value.trim() === '')
    }
  }, [])

  const updateContent = (newValue: string) => {
    if (!contentEditableRef.current) return

    setInternalValue(newValue)

    if (onChange) {
      onChange(newValue)
    }

    const isNowEmpty = newValue.trim() === ''
    setIsEmpty(isNowEmpty)

    if (isNowEmpty && contentEditableRef.current.innerHTML === '<br>') {
      contentEditableRef.current.innerHTML = ''
    }
  }

  const handleInput = () => {
    if (!contentEditableRef.current) return
    updateContent(contentEditableRef.current.textContent || '')
  }

  const handleBlur = () => {
    if (!contentEditableRef.current) return

    const newValue = contentEditableRef.current.textContent || ''
    updateContent(newValue)

    if (contentEditableRef.current.textContent !== internalValue) {
      contentEditableRef.current.textContent = internalValue
    }
  }

  useEffect(() => {
    if (!contentEditableRef.current) return
    if (value !== internalValue) {
      setInternalValue(value)
      contentEditableRef.current.textContent = value
      setIsEmpty(value.trim() === '')
    }
  }, [value])

  return (
    <div
      ref={contentEditableRef}
      className={`p-2 px-3 w-fit rounded-2xl flex items-center ${
        isEmpty
          ? 'after:content-[attr(data-placeholder)] after:tracking-[1px] bg-[#EEF6FF] font-bold text-[#007DFA] word-spacing-2'
          : 'bg-[#EEF6FF] font-bold text-[#007DFA] word-spacing-2'
      } ${className}`}
      contentEditable
      data-placeholder={placeholder}
      onInput={handleInput}
      onBlur={handleBlur}
      suppressContentEditableWarning
    />
  )
}

export default ContentEditablePrompt


```

使用如下：

```js
<EditableArea placeholder='预设提取项' value='' onChange={onChangeValue}></EditableArea>
```

## 结束

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/eef5cddd3b644d1ca942d4b93ed543cd~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071068&x-orig-sign=BI2MKl0nUxPMAwdAHAFd7OHuV0s%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/c7eb4bdb4fe94e0b82b13632e9ee5207~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071068&x-orig-sign=6%2B3L2pphyp6QcFAbN3HE2zfsENU%3D)
