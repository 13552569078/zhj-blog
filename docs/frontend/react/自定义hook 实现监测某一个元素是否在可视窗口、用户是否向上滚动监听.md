## 背景

最近在写大模型流式返回的时候，默认是拼接文字直接滚动到底部的，对于初始化的时候 历史内过多则需要展示滚动到底部的按钮，此hook就是监听 设置的元素是否在可视区域，不在的展示滚动到底部，

## 实现

```js
import { useRef, useState, useEffect } from 'react';

export function useBottom(chatBottomRef: any) {
  const [showGoBottom, setShowGoBottom] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 当参考元素完全不在视口中时显示按钮
        entries.forEach((entry) => {
          setShowGoBottom(!entry.isIntersecting);
        });
      },
      {
        root: null, // 使用浏览器视口作为根元素
        threshold: 0.1, // 当元素至少有10%可见时认为可见
        rootMargin: '0px'
      }
    );

    // 开始观察参考元素
    if (chatBottomRef.current) {
      observer.observe(chatBottomRef.current);
    }

    // 组件卸载时停止观察
    return () => {
      if (chatBottomRef.current) {
        observer.unobserve(chatBottomRef.current);
      }
    };
  }, [chatBottomRef]);

  return {
    showGoBottom
  };
}

```

## 使用方法


```js
const { showGoBottom } = useBottom(chatBottomRef);

<div
        className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5"
        ref={containterRef}
      >

        {/* 底部滚动 */}
        <div ref={chatBottomRef} className="mb-40 h-[1px]"></div>
      </div>
 {/* 滚动动画 */}
      {showGoBottom && (
        <GoBottom streaming={streaming} go={resetBottom}></GoBottom>
      )}
```

## 检测是否用户向上滚动hook


```js
import { useRef, useState, useEffect } from 'react';

export function useScrollupListener(elementRef) {
  const isScrollingUp = useRef(false);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const target = elementRef?.current || window;

    const handleScroll = () => {
      const scrollTop = elementRef
        ? target.scrollTop
        : window.scrollY || document.documentElement.scrollTop;

      // 判断是否向上滚动
      if (scrollTop < lastScrollTop.current) {
        isScrollingUp.current = true;
      }

      lastScrollTop.current = scrollTop;
    };

    target.addEventListener('scroll', handleScroll);

    return () => {
      target.removeEventListener('scroll', handleScroll);
    };
  }, [elementRef]);

  return { isScrollingUp };
}

```