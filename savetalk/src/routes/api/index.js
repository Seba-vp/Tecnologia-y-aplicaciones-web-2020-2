const KoaRouter = require('koa-router');

const auth = require('./auth');

const router = new KoaRouter({ prefix: '/api' });

router.get('/', async (ctx) => {
    ctx.body = { message: 'savetalk API'};
});

router.use('/auth', auth.routes());

module.exports = router;

