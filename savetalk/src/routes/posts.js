const KoaRouter = require('koa-router');
const post = require('../models/post');

const router = new KoaRouter();

//Nuevo
const PERMITED_FIELDS = [
    'title',
    'description',
    'public',
    'city',
    'coordinator',
    'email',
    'location',
    'image',
    'id_user',
    'interactions',
];
// hasta aca

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
        postPath: id => ctx.router.url('post', id),
//Lo de abajo es nuevo
        newPostPath: ctx.router.url('posts-new'),
    });
});

router.get('posts-new', '/new', (ctx) => {
const post = ctx.orm.post.build();
return ctx.render('posts/new',{
    post,
    createPostPath: ctx.router.url('posts-create')
    });
})

router.post('posts-create','/', async (ctx)=>{
    const post = ctx.orm.post.build(ctx.request.body);

    try{
    await post.save({fields:PERMITED_FIELDS});
    ctx.redirect(ctx.router.url('posts'));
    }catch (error) {
    await ctx.render('posts/new',{
        post,
        errors: error.errors,
        createPostPath: ctx.router.url('posts-create'),
    });
    
}
})

//Hasta aca lo nuevo
router.get('post', '/:id', (ctx) => {
    const {post} = ctx.state;
    return ctx.render('posts/show', {post});
});

module.exports = router;