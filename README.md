# fake-bilibili
## 背景
前几天无意中发现bilibili的子站使用了vue框架进行开发，所以本着研（xie）究（e）的态度，做了一款移动端的app
## 预览地址
http://rozwel.club/bilibili
## 如何欺骗
主要的欺骗技术有以下几点
* 设置meta标签`no-referer`来避免图片跨域的403错误
* 使用vue-cli搭建的项目中的devServer来代理请求，伪造Request Headers中的referer、host等字段来欺骗B站服务端

## 作者的话：
1. 目前做了几个展示页面，根据返回的数据其实还有很多功能可以增加，目前了解到的，大家可以注册一个B站账号并登录，然后将正版网站中的cookie伪造到代理中，可以伪造登录状态来进行比如关注画师、给画师点赞等交互行为了
2. 代理api那边写的比较乱，需要整理一下静态数据，顺便封装一下，应该会在晚些时候做这项工作
3. 肯定还有其他可以探索的地方，之前本考虑将登录也放在app里，发现好像比较复杂，留在以后吧-v-

## 也欢迎童鞋们一起来探索一下~

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at 0.0.0.0:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# how to view effects
enter 'ipconfig' in cmd,check your ip address, and then open your mobile browser ,enter 'ip-address':8080,enjoy it!
`guarantee your computer and mobile in the same network`
查看您的ip地址，在手机浏览器中输入ip地址:8080即可查看效果（请保证手机与电脑在同一个网络中
