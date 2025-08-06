### 背景
有时候需要在同一个项目的不同分支中 创建不同的代码源，比如我们基于`element-plus` 创建一个自己的组件库，但是想要 `element-plus`升级的时候，需要`merge`其升级的代码，这就需要我们创建一个分支 源是 `element-plus`的，每次更新则 `merge`到自己得 组件库分支

下面我们在 `gitee`  和 `github` 为例，在gitee创建分支，某一个源是 `github`的

### 详细流程

#### `gitee` 创建代码仓库, 并上传初始代码，

此处省略，请自行创建并初始化代码，可以是`element-plus`的某一个版本

#### 关联远端的`github`源码仓库

#####  配置多个远程仓库

```js
# 添加Gitee远程仓库（假设已存在）
git remote add gitee <gitee仓库地址>

# 添加公司内部GitLab远程仓库
git remote add github <github仓库地址>
```

#####  从 Gitee 拉取代码并创建分支


```js

# 从Gitee拉取代码
git fetch gitee

# 切换到Gitee的主分支（假设是main）
git checkout -b main gitee/main

# 创建并切换到新分支 后期会推送到gitee
git checkout -b feature-v3.1.0

```
##### 从 GitHub 拉取代码并覆盖当前分支

```js
# 从 GitHub拉取代码
git fetch github

# 合并 GitHub的代码到当前分支（可能会有冲突，需要手动解决）
git merge github/feature-v3.1.0 --allow-unrelated-histories
```

#####  推送新分支到指定远程仓库

```js
git push -u gitee feature-v3.1.0
```
