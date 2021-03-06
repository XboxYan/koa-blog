const router = require('koa-router')();
const fetch = require('node-fetch');

const User = require('../models/Users');
const Contents = require('../models/Contents');
const Comments = require('../models/Comments');
const Categories = require('../models/Categories');

//登录
router.post('/login', async (ctx, next) => {
    const responseData = {
        "success": false,
        "message": "",
        "info":{}
    }
    const { username, password } = ctx.request.body;
    try {
        const userInfo = await User.findOne({username,password}).select("-password");
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
router.post('/register', async (ctx, next) => {
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
        "info":{}
    }
    const { name } = ctx.request.body;
    try {
        const categoryInfo = await Categories.findOne({name});
        if(categoryInfo){
            responseData.success = false;
            responseData.message = "该分类已存在";
            responseData.info = {};
            ctx.body = responseData;
        }else{
            const newCategory = await new Categories({ name }).save();
            responseData.success = true;
            responseData.message = '新增分类成功';
            responseData.info = newCategory;
            ctx.body = responseData;
        }
    } catch (error) {
        responseData.success = false;
        responseData.message = error.message;
        responseData.info = {};
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
    try {
        const categories = await Categories.find().sort({updatedAt:-1});
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

//删除分类
router.delete('/category/:id', async (ctx, next) => {
    const responseData = {
        "success": false,
        "message": "",
    }
    const { id } = ctx.params;
    try {
        const categoryInfo = await Categories.findById(id);
        if(categoryInfo){
            await categoryInfo.remove();
            await Contents.updateMany({categories:id},{$pull:{categories:id}});
            responseData.success = true;
            responseData.message = "删除成功";
            ctx.body = responseData;
        }else{
            responseData.success = false;
            responseData.message = '该分类不存在';
            ctx.body = responseData;
        }
    } catch (error) {
        responseData.success = false;
        responseData.message = error.message;
        ctx.body = responseData;
    }
});

//修改分类
router.put('/category/:id', async (ctx, next) => {
    const responseData = {
        "success": false,
        "message": "",
    }
    const { id } = ctx.params;
    const { name } = ctx.request.body;
    try {
        const categoryInfo = await Categories.findById(id);
        if(categoryInfo){
            await categoryInfo.update({name});
            responseData.success = true;
            responseData.message = "修改成功";
            ctx.body = responseData;
        }else{
            responseData.success = false;
            responseData.message = '该分类不存在';
            ctx.body = responseData;
        }
    } catch (error) {
        responseData.success = false;
        responseData.message = error.message;
        ctx.body = responseData;
    }
});

//发布文章
router.post('/article', async (ctx, next) => {
    const responseData = {
        "success": false,
        "message": "",
    }
    const { title,description,content,userId,categories=[] } = ctx.request.body;
    try {
        await new Contents({ title,description,content,user:userId,categories }).save();
        responseData.success = true;
        responseData.message = '发布成功';
        ctx.body = responseData;
    } catch (error) {
        responseData.success = false;
        responseData.message = error.message;
        ctx.body = responseData;
    }
});

//修改文章
router.put('/article/:id', async (ctx, next) => {
    const responseData = {
        "success": false,
        "message": "",
    }
    const { id } = ctx.params;
    const { title,categories,description,content } = ctx.request.body;
    try {
        const articleInfo = await Contents.findById(id);
        if(articleInfo){
            await articleInfo.update({title,categories,description,content});
            responseData.success = true;
            responseData.message = "修改成功";
            ctx.body = responseData;
        }else{
            responseData.success = false;
            responseData.message = '该文章不存在';
            ctx.body = responseData;
        }
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
            if(category==='unknown'){
                categories.categories = [];
            }else{
                categories.categories = category;
            }
        }else{
            categories = {}
        }
        const articles = await Contents.find(categories).sort({createdAt:-1}).limit(~~pagesize).skip(~~skip).populate('categories').select("-user -content -comments");
        const counts = await Contents.find(categories).count();
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
        "prev":{},
        "next":{}
    }
    const { id } = ctx.params;
    const { admin=false } = ctx.query;
    try { 
        if(!admin){
            //阅读数+1
            //await article.update({$inc:{views:1}});
            const article = await Contents.findById(id).populate('categories');
            article.views++;
            await article.save();
            const prev = await Contents.findOne({createdAt:{$gt:article.createdAt}}).sort({createdAt:1}).select("title");
            const next = await Contents.findOne({createdAt:{$lt:article.createdAt}}).sort({createdAt:-1}).select("title");
            responseData.prev = prev;
            responseData.next = next;
            responseData.data = article;
        }else{
            const article = await Contents.findById(id);
            responseData.data = article;
        }
        responseData.success = true;
        responseData.message = '操作成功';
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
        const comments = await Comments.find({article:id}).sort({createdAt:-1}).limit(~~pagesize).skip(~~skip).populate('article','title').populate('user','username');
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
        const articles = await Contents.aggregate([
            {
                $sort:{createdAt:-1}
            },  
            {
                $group:{
                    _id:{ 
                        year: { $year : { $add: ['$createdAt', 28800000] } }, //北京时间偏差
                        month: { $month : { $add: ['$createdAt', 28800000] } }
                    },
                    createdAt:{
                        $first:"$createdAt"
                    },
                    article:{
                        $push:{
                            _id:"$_id",
                            title:"$title",
                            createdAt:"$createdAt",
                        }
                    }
                }
            },
            {
                $sort:{_id:-1}
            },
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

//搜索
router.get('/search', async (ctx, next) => {
    const responseData = {
        "success": false,
        "message": "",
        "data":[]
    }
    const { keywords } = ctx.query;
    try {
        if(keywords){
            const regex = new RegExp(keywords, 'i');
            const articles = await Contents.find({$or:[{title:regex},{description:regex},{content:regex}]}).select("title description");
            responseData.success = true;
            responseData.message = '操作成功';
            responseData.data = articles;
            ctx.body = responseData;
        }else{
            responseData.success = false;
            responseData.message = '搜索词不能为空';
            responseData.data = [];
            ctx.body = responseData;
        }
    } catch (error) {
        responseData.success = false;
        responseData.message = error.message;
        responseData.data = {};
        ctx.body = responseData;
    }
});

const getPlayList = (id) => {
    return fetch(`http://music.163.com/api/playlist/detail?id=${id}`)
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .catch((err) => {
        console.warn(err);
    })
}

const getLyric = (id) => {
    return fetch(`http://music.163.com/api/song/lyric?os=pc&id=${id}&lv=-1&kv=-1&tv=-1`)
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .catch((err) => {
        console.warn(err);
    })
}

//获取音乐列表
router.get('/playlist/:id', async (ctx, next) => {
    const responseData = {
        "success": false,
        "data":[],
        "message": "",
    }
    const { id } = ctx.params;
    try {
        const { limit } = ctx.query;
        const data = await getPlayList(id);
        if(data.code===200){
			const playList = data.result.tracks.slice(0,limit).map(item=>({
                id: item.id,
				name: item.name,
				artist: item.artists.map(el=>el.name).join(','),
				url: `http://music.163.com/song/media/outer/url?id=${item.id}.mp3`,
                cover: item.album.picUrl.replace(/http:/,'https:'),
                lrc:`/api/lyric/${item.id}`
			}))
            responseData.success = true;
            responseData.message = '操作成功';
            responseData.data = playList;
            ctx.body = responseData;
		}
    } catch (error) {
        responseData.success = false;
        responseData.message = error.message;
        responseData.data = [];
        ctx.body = responseData;
    }
});

//获取音乐歌词
router.get('/lyric/:id', async (ctx, next) => {
    const { id } = ctx.params;
    try {
        const lyric = await getLyric(id);
        ctx.body = lyric.lrc.lyric;
    } catch (error) {
        ctx.body = '';
    }
});

module.exports = router;
