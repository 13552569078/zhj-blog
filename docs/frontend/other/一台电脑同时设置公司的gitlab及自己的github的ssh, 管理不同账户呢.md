## 1:为什么设置2个ssh
公司一般会搭建gitlab来管理代码，你会分配一个lab账号，一般为公司的邮箱。同时你也有自己的github，平时自己的代码维护学习一类的需要使用自己的github账号，这就涉及到管理两个ssh配置的问题
## 2：设置lab的ssh
1> 安装git 打开 git bash 在本地创建ssh key（邮箱要是你登录gitlab的邮箱）
`ssh-keygen -t rsa -C "公司邮箱@gongsi.com"` <br/>
2> 回车后出现Enter file which to save the key是选择存放你ssh key的位置，直接Enter回车
注：如果是第一次使用git那可以不看 这个句备注，如果已经有过id_rsa存在的话，git回提醒你是否覆盖id_rsa，那么输入y即可<br/>
途中如有需要账号密码 输入即可，
windows下，生成的ssh会在

![7.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55005bc9cf964be6a32409b2ad76287b~tplv-k3u1fbpfcp-watermark.image?)

3> 打开.ssh 会有以下两个文件生成

![8.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d71f6172dd19455eba6faaaa0b9cf3bc~tplv-k3u1fbpfcp-watermark.image?)
4> 找到id_rsa.pub，复制里面的ssh，去lab 设置ssh
5>登录lab账号设置 ssh

![96.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff9c9a06470044adbef41d4d7a041dfd~tplv-k3u1fbpfcp-watermark.image?)
## 
## 3：设置github ssh
1>创建shh
````
$ ssh-keygen -t rsa -C "自己的邮箱@163.com"
````
2> 回车后出现Enter file which to save the key是选择存放你ssh key的位置
````
github_id_rsa
````
3>回车后出现Enter Passphrase ，输入你在github登陆时输入的密码（注意大小写），回车确认，再此输入一次密码

4> 出现了random part image，接下来的步骤，就是复制生成的ssh key了
找到刚才的ssh存放目录

![10.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a92998ddf1a84964a9d3dac7f2c65f80~tplv-k3u1fbpfcp-watermark.image?)

找到github_id_rsa.pub，去github设置ssh

## 4：设置config
ssh文件夹里面创建config文件，输入内容为
`Host gitlab
    HostName '公司的gitlab地址'
    User 公司的lab用户名 一般是邮箱
    IdentityFile ~/.ssh/id_rsa
Host github.com
    HostName github.com
    User hub的用户名
    IdentityFile ~/.ssh/github_rsa`
## 5：打开vscode 即可同时管理hub和lab账号
 
