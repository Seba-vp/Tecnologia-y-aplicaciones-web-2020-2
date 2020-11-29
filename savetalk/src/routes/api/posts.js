const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.get('posts-all', '/all', async (ctx) => {
    const posts = await ctx.orm.post.findAll();
    ctx.body = {
        posts: posts
    };

});

module.exports = router;