const router = require('koa-router')();

router.get('/', async (ctx, next) => {
    ctx.body = '<h1>hello Koa</h1>';
});

module.exports = router;
