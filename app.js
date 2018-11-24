const Koa = require('koa');

const serve = require('koa-static');

const mongoose = require('mongoose');

const bodyParser = require('koa-bodyparser');

const router = require('koa-router')();

const main = require('./router/main');

const api = require('./router/api');

const PORT = process.env.PORT || '5000';

const app = new Koa();

router.use('/', main.routes());

router.use('/api', api.routes());

//app.use(serve(__dirname + '/client/build'));

app.use(bodyParser());

app.use(router.routes());

mongoose.connect('mongodb://localhost:55555',(err)=>{
    if(err){
        console.log('数据库链接失败');
    }else{
        console.log('数据库链接成功');
        app.listen(PORT);
        console.log('app started at port '+PORT);
    }
})

