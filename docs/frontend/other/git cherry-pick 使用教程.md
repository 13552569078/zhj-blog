## 为何使用git cherry-pick? 使用场景
实际开发项目中会涉及到多个分支，如project1分支（项目1分支），project2分支（项目2分支）等等，多个由于版本问题，时间问题等等原因，项目分支代码无法合并，（如果能合并 直接使用merge了），但是此时project1项目中有某些提交，在project2项目中也要用到，假设project1项目中（commit1,commit2）两次提交project2项目也需要使用这部分代码，分支无法合并，这时就需要使用 cherry-pick（俗称：摘樱桃）

## 使用方法
1：找到 project1项目中（commit1,commit2）得commit-id <br />

![微信截图_20230218152427.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fb3467bf472465ba0568330d2cc711e~tplv-k3u1fbpfcp-watermark.image?)
不适用vscode
`git log`也可以查询到 <br />

2: 切换到project2分支上，执行 <br />
`git cherry-pick  commit-id1 commit-id2(项目中得具体id)`

3:`git cherry-pick` 命令会在project2分支形成一次提交，无冲突得话会直接提交成功，有冲突合并冲突在提交

