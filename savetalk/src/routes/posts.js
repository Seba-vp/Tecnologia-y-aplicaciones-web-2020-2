const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
    const post = await ctx.orm.post.findByPk(id);
    if (!post) {
        ctx.throw(404);
    }
    ctx.state.post = post;
    return next(); 
});

router.get('posts', '/', async (ctx) => {
    const posts = await ctx.orm.post.findAll();
    await ctx.render('posts/index', {
        posts,
        postPath: id => ctx.router.url('post', id)
    });
});

router.get('post', '/:id', (ctx) => {
    const {post} = ctx.state;
    return ctx.render('posts/show', {post});
});

module.exports = router;