const router = require('koa-router')();

const User = require('../models/Users');
const Contents = require('../models/Contents');

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
        const article = await new Contents({ title,description,content,user:userId }).save();
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
        const articles = await Contents.find({user:id});
        const counts = await Contents.count({user:id});
        responseData.success = true;
        responseData.message = '查询成功';
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

module.exports = router;
