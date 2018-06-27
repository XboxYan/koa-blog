# koa blog

这是一个以koa框架为基础，mongoDB为数据库的博客管理系统。

前端已react为框架实现的单页面应用。

## 后端系统

后端主要实现了以下接口（[`RESTful API`风格](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)）:

* 用户管理

    * 登录 ( POST ) `/api/login`

    * 注册 ( POST ) `/api/register` 

* 文章管理

    * 发布文章 ( POST ) `/api/article`

    * 获取文章列表 ( GET ) `/api/article?page=1&pagesize=10`

    * 获取文章详情 ( GET ) `/api/article/:id`

    * 修改文章 ( PUT ) `/api/article/:id`

* 分类管理

    * 获取分类列表 ( GET ) `/api/category`

    * 删除分类 ( DELETE ) `/api/category/:id`

    * 新增分类 （ POST ） `/api/category`

    * 修改分类 （ PUT ） `/api/category/:id`

* 评论管理

    * 发表评论 ( POST ) `/api/comment`

    * 获取评论 ( GET ) `/api/comment/:id`

* 归档（GET） `/api/archives`

* 搜索（GET) `/api/search?keywords=**`

具体使用方式查看 [`router/api.js`](./router/api.js)

## 前端页面

[线上实例](http://118.24.110.50)

前端实现了以下页面 

* 前台 

    * 首页

    * 归档

    * 分类

    * 登录

    * 搜索

* 后台管理

    * 文章管理

    * 分类管理

## 安装

` git clone https://github.com/XboxYan/koa-blog.git `

进入koa-blog目录

` npm install `

进入前端client目录

` npm install `

回到koa-blog根目录

新建一个`db`目录，用于存放数据库

安装下载mongoDB，不会的自行百度，并配置好环境变量

启动数据库

`npm run mongod`

启动后台

`npm run start`

启动`create-react-app`测试环境

`npm run blog`

这时浏览器会自动打开[`localhost:3000`](localhost:3000)查看页面

