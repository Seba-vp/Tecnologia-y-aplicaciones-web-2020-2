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

// LA parte para cargar fotos
const koaBody = require("koa-body");

router.post("/upload", async ctx => {
    const file = ctx.request.files.file;
    const { key, url } = await uploadFile({
      fileName: file.name,
      filePath: file.path,
      fileType: file.type,
    });
    ctx.body = { key, url };
  });

//#################################################  

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
        //indexPath,
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
    return ctx.render('posts/show', {
        post,
        postPath: id => ctx.router.url('post', id),
        updatePostPath: id => ctx.router.url('post-update', id),
        deletePostPath: id => ctx.router.url('post-delete', id)
    });
});
router.get('post-update', '/update/:id', (ctx) => {
    const {post} = ctx.state;
    return ctx.render('posts/update', {
        post,
        postPath: id => ctx.router.url('post', id),
        updatePostPathDataBase: id => ctx.router.url('post-update-database', id)
    });
})

router.post('post-update-database', 'update/:id', async (ctx) => {
    const {post} = ctx.state;

    if (post.title !== ctx.request.body.title) {
        post.title = ctx.request.body.title;
    }
    if (post.description !== ctx.request.body.description) {
        post.description = ctx.request.body.description;
    }
    if (post.public !== ctx.request.body.public) {
        post.public = ctx.request.body.public;
    }
    if (post.city !== ctx.request.body.city) {
        post.city = ctx.request.body.city;
    }
    if (post.coordinator !== ctx.request.body.coordinator) {
        post.coordinator = ctx.request.body.coordinator;
    }
    if (post.email !== ctx.request.body.email) {
        post.email = ctx.request.body.email;
    }
    if (post.location !== ctx.request.body.location) {
        post.location = ctx.request.body.location;
    }
    if (post.image !== ctx.request.body.image) {
        post.image = ctx.request.body.image;
    }
    if (post.id_user !== ctx.request.body.id_user) {
        post.id_user = ctx.request.body.id_user;
    }
    if (post.interactions !== ctx.request.body.interactions) {
        post.interactions = ctx.request.body.interactions;
    }
  

    await post.save({ fields: PERMITED_FIELDS });
    ctx.redirect(ctx.router.url('posts'));
});

router.get('post-delete', '/delete/:id', (ctx) => {
    const {post} = ctx.state;
    return ctx.render('posts/delete', {
        post,
        postPath: id => ctx.router.url('post', id),
        deletePostPathDataBase: id => ctx.router.url('post-delete-database', id)
    });
})

router.post('post-delete-database', 'delete/:id', async (ctx) => {
    const {post} = ctx.state;
    await post.destroy();
    ctx.redirect(ctx.router.url('posts'));
});

module.exports = router;