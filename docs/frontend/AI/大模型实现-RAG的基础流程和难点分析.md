## 前言

最近刷B站对于rag的看法有了变化，先在将B站老师的讲解做下记录，主要记录rag的主要工作流程及rag实现大模型的难点分析

## rag大致的工作流程

![f42a2923adf7c0f54b2f3e1aeb7b99b.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/30d304124a1048708beea2c8e0514f26~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071893&x-orig-sign=7gPWBtwOS9Gb82LFUifMlLlUwMQ%3D)

### 文档切割存储流程

1.  大量的文档文本
2.  文档切割 分割 chunks（段落）
3.  chunks embding转向量
4.  存储向量数据库（向量数据库加速检索）

### 用户提问及检索过程

1.  用户发起提问，提问问题request
2.  request embding向量化
3.  向量问题从向量数据库检索
4.  检索完成返回检索结果context

### 大模型回答阶段

1.  context和提问问题结合，生成提示词 Prompt
2.  提示词交给大模型回复
3.  大模型回复
4.  大模型response，展示给用户

## rag的难点

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/f1723856ab1f4b3e8210b7592d9b90c3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiJ5bCP5rKz:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIyMjU2MjE0MTIxMDQ3OCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1755071893&x-orig-sign=o8oy5XfjCE8bb5PksUY6%2FSFFllM%3D)

虽然基于经典的rag流程，我们可以很快地开发大模型应用，但是实际上其中的注意点及难点不少，细节不好达不到上线的要求，

### 文档切割存储流程 难点

1.  文档切割，文档很多如（ppt,pdf,网页，word，csv）等等，文档格式不同，所以文档在读取及处理阶段，本生就是很难得一个问题
2.  合理拆分chunks 如何将文档拆分成合理chunks，如按标题，段落，分隔符等等，需要酌情分析
3.  chunks 如何 合理的embding，众多的embding技术选择，以及如何的选择合适的向量数据库

### 用户提问及检索过程

4.  用户提问的问题，是否需要进一步处理，（如对问题扩充和清理等等）
5.  拿到问题如何合理的检索，检索的效率和准确性是非常重要的，搜索结果不准确，大模型就回答不了正确问题
6.  拿到的context很多，可能有很多无关内容或者很多的问题，增加ranking阶段，先检索在排序

### 大模型回答阶段

7.  何合理的编排prompt,好的 prompt大模型可以更好更准确的生成
8.  选择大模型，如开源大模型微调 通用大模型
9.  拿到的response，需要进行筛选和检查，避免一些违规，有些回复不满足要求则重新需要检索返回

## 总结

以上就是rag的基本流程和难点分析
