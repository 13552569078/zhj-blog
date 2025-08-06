## 背景
我们做鉴权登录，不论是`OAuth`还是`JWT`，经常需要设置自定义请求头 `Authorization`, 往往不是简单的传入对应得`token`即可，往往需要增加一个字符串`Bearer`,示例如下


```js
{
    headers：{
        Authorization：'Bearer ' + token
    }
}
```
其实，这仅仅是一个规范

## 规范解析
**Authorization 自定义请求头需要加 Bearer，‌这是因为 Bearer 是 W3C 的 HTTP 1.0 规范中定义的授权类型之一，‌常见于 OAuth 和 JWT 授权。‌**‌

在 HTTP 请求中，‌Authorization 请求头用于验证用户身份，‌其格式为 `Authorization: <type> <authorization-parameters>`。‌其中，‌`<type>` 指的是认证的方式，‌而 Bearer 是这种格式中的一种类型，‌用于表示授权的类型。‌除了 Bearer，‌还有其他类型的认证方式，‌如 Basic（‌用于 HTTP 基本认证）‌和 Digest（‌已弃用的 MD5 哈希 HTTP 基本认证）‌等。‌在 OAuth 和 JWT 授权中，‌Bearer 类型被广泛使用，‌因此，‌在 Authorization 请求头中添加 Bearer 是为了遵循这一规范，‌确保请求能够正确地被服务器识别和处理。‌

简而言之，‌通过在 Authorization 请求头前加上 Bearer，‌可以确保请求的授权信息被正确地识别和处理，‌这是遵循 W3C HTTP 1.0 规范的结果