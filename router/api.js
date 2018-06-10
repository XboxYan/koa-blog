const router = require('koa-router')();

const User = require('../models/Users');
const Contents = require('../models/Contents');
const Comments = require('../models/Comments');
const Categories = require('../models/Categories');

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

//新增分类
router.post('/category', async (ctx, next) => {
    const responseData = {
        "success": false,
        "message": "",
    }
    const { name } = ctx.request.body;
    try {
        const category = await new Categories({ name }).save();
        responseData.success = true;
        responseData.message = '新增分类成功';
        ctx.body = responseData;
    } catch (error) {
        responseData.success = false;
        responseData.message = error.message;
        ctx.body = responseData;
    }
});

//获取分类
router.get('/category', async (ctx, next) => {
    const responseData = {
        "success": false,
        "data":[],
        "message": "",
    }
    const { name } = ctx.request.body;
    try {
        const categories = await Categories.find();
        responseData.success = true;
        responseData.message = '操作成功';
        responseData.data = categories;
        ctx.body = responseData;
    } catch (error) {
        responseData.success = false;
        responseData.message = error.message;
        responseData.data = [];
        ctx.body = responseData;
    }
});

//发布文章
router.post('/article', async (ctx, next) => {
    const responseData = {
        "success": false,
        "message": "",
    }
    const { title,description,content,userId,categories=['未分类'] } = ctx.request.body;
    try {
        const article = await new Contents({ title,description,content,user:userId,categories }).save();
        responseData.success = true;
        responseData.message = '发布成功';
        ctx.body = responseData;
    } catch (error) {
        responseData.success = false;
        responseData.message = error.message;
        ctx.body = responseData;
    }
});

//获取所有文章（分页）
router.get('/article', async (ctx, next) => {
    const responseData = {
        "success": false,
        "message": "",
        "data":[],
        "counts":0,
    }
    //const { id } = ctx.params;
    const { page=1, pagesize=10, category } = ctx.query;
    const skip = (page-1)*pagesize;
    try {
        let categories = {}
        if(category){
            categories.categories = category;
        }else{
            categories = {}
        }
        const articles = await Contents.find(categories).sort({addTime:-1}).limit(~~pagesize).skip(~~skip).populate('user').select("-content -comments");
        const counts = await Contents.count();
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

//获取文章详情
router.get('/article/:id', async (ctx, next) => {
    const responseData = {
        "success": false,
        "message": "",
        "data":{},
    }
    const { id } = ctx.params;
    try {
        const article = await Contents.findById(id).populate('user','username');
        //阅读数+1
        article.views++;
        await article.save();
        //await article.update({$inc:{views:1}});
        responseData.success = true;
        responseData.message = '操作成功';
        responseData.data = article;
        ctx.body = responseData;
        
    } catch (error) {
        responseData.success = false;
        responseData.message = error.message;
        responseData.data = {};
        ctx.body = responseData;
    }
});

//发布评论
router.post('/comment', async (ctx, next) => {
    const responseData = {
        "success": false,
        "message": "",
    }
    const { content,userId,articleId } = ctx.request.body;
    try {
        const comment = await new Comments({ content,user:userId,article:articleId }).save();
        responseData.success = true;
        responseData.message = '发布评论成功';
        ctx.body = responseData;
    } catch (error) {
        responseData.success = false;
        responseData.message = error.message;
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
    const { page=1, pagesize=10, category } = ctx.query;
    const skip = (page-1)*pagesize;
    const { id } = ctx.params;
    try {
        const comments = await Comments.find({article:id}).sort({addTime:-1}).limit(~~pagesize).skip(~~skip).populate('article','title').populate('user','username');
        const counts = await Comments.count({article:id});
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

//归档
router.get('/archives', async (ctx, next) => {
    const responseData = {
        "success": false,
        "message": "",
        "data":[],
        "counts":0,
    }
    try {
        let categories = {}
        const articles = await Contents.aggregate([{$group:{
                _id:{$year:"$addTime"},
                article:{
                    $push:{
                        _id:"$_id",
                        title:"$title",
                        addTime:"$addTime"
                    }
                }
            }},
            {$sort:{_id:-1}}
        ])
        const counts = await Contents.count();
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

module.exports = router;
