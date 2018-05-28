const router = require('koa-router')();

const User = require('../models/Users');
const Contents = require('../models/Contents');
const Comments = require('../models/Comments');

//登录
router.post('/user/login', async (ctx, next) => {
    const responseData = {
        "success": false,
        "message": "",
        "info":{}
    }
    const { username, password } = ctx.request.body;
    try {
        const userInfo = await User.findOne({username,password});
        ctx.type = 'json';
        if(userInfo){
            responseData.success = true;
            responseData.message = "登录成功";
            responseData.info = userInfo;
            ctx.body = responseData;
        }else{
            responseData.success = false;
            responseData.info = {};
            const userInfo = await User.findOne({username});
            if(userInfo){
                responseData.message = '密码有误';
                ctx.body = responseData;
            }else{
                responseData.message = '该用户未注册';
                ctx.body = responseData;
            }
        }
    } catch (error) {
        responseData.success = false;
        responseData.message = error.message;
        responseData.info = {};
        ctx.body = responseData;
    }
});

//注册
router.post('/user/register', async (ctx, next) => {
    const responseData = {
        "success": false,
        "message": "",
        "info":{}
    }
    const { username, password } = ctx.request.body;
    try {
        const userInfo = await User.findOne({username});
        ctx.type = 'json';
        if(userInfo){
            responseData.success = false;
            responseData.message = "用户名已经被注册了";
            responseData.info = userInfo;
            ctx.body = responseData;
        }else{
            const newUser = await new User({ username,password }).save();
            responseData.success = true;
            responseData.message = '注册成功';
            responseData.info = newUser;
            ctx.body = responseData;
        }
    } catch (error) {
        responseData.success = false;
        responseData.message = error.message;
        responseData.info = {};
        ctx.body = responseData;
    }
});

//发布文章
router.post('/article', async (ctx, next) => {
    const responseData = {
        "success": false,
        "message": "",
        "data":{}
    }
    const { title,description,content,userId } = ctx.request.body;
    try {
        const article = await new Contents({ title,description,content,userId }).save();
        responseData.success = true;
        responseData.message = '发布成功';
        responseData.data = article;
        ctx.body = responseData;
    } catch (error) {
        responseData.success = false;
        responseData.message = error.message;
        responseData.data = {};
        ctx.body = responseData;
    }
});

//获取文章
router.get('/article/:id', async (ctx, next) => {
    const responseData = {
        "success": false,
        "message": "",
        "data":[],
        "counts":0,
    }
    const { id } = ctx.params;
    try {
        const articles = await Contents.find({userId:id});
        const counts = await Contents.count({userId:id});
        responseData.success = true;
        responseData.message = '操作成功';
        responseData.data = articles;
        responseData.counts = counts;
        ctx.body = responseData;
    } catch (error) {
        responseData.success = false;
        responseData.message = error.message;
        responseData.data = [];
        responseData.counts = 0;
        ctx.body = responseData;
    }
});

//发布评论
router.post('/comment', async (ctx, next) => {
    const responseData = {
        "success": false,
        "message": "",
        "data":{}
    }
    const { content,userId,articleId,username } = ctx.request.body;
    try {
        const comment = await new Comments({ content,userId,articleId,username }).save();
        responseData.success = true;
        responseData.message = '发布评论成功';
        responseData.data = comment;
        ctx.body = responseData;
    } catch (error) {
        responseData.success = false;
        responseData.message = error.message;
        responseData.data = {};
        ctx.body = responseData;
    }
});

//获取评论
router.get('/comment/:id', async (ctx, next) => {
    const responseData = {
        "success": false,
        "message": "",
        "data":[],
        "counts":0,
    }
    const { id } = ctx.params;
    try {
        const comments = await Comments.find({articleId:id});
        const counts = await Comments.count({articleId:id});
        responseData.success = true;
        responseData.message = '操作成功';
        responseData.data = comments;
        responseData.counts = counts;
        ctx.body = responseData;
    } catch (error) {
        responseData.success = false;
        responseData.message = error.message;
        responseData.data = [];
        responseData.counts = 0;
        ctx.body = responseData;
    }
});

module.exports = router;
