const KoaRouter = require('koa-router');
const post = require('../models/post');
const fsPromises = require('fs').promises;
const path = require('path');
const router = new KoaRouter();

//Nuevo
const PERMITTED_FIELDS = [
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
    /* const post = ctx.orm.post.build(ctx.request.body); */
    const  { cloudinary} = ctx.state;
    try{
        /* ESTA PARTE ES DE ARCHIVOS */
        const { image } = ctx.request.files;
         if (image.size > 0) {

            const uploadedImage = await cloudinary.uploader.upload(image.path);
            ctx.request.body.image = uploadedImage.public_id;
        }
        /* ********************** */
    const post = ctx.orm.post.build(ctx.request.body);
    await post.save( { fields : PERMITTED_FIELDS }); 
    ctx.redirect(ctx.router.url('posts'));

    }catch (error) {
    console.log(error);
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
    const {post, cloudinary} = ctx.state;


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
    

    try{

        /* ESTA PARTE ES DE ARCHIVOS */
        const { image } = ctx.request.files;

        if (image.size > 0) {
            const uploadedImage = await cloudinary.uploader.upload(image.path);
            post.image = uploadedImage.public_id;
         }
        await post.save({ fields: PERMITTED_FIELDS });
        ctx.redirect(ctx.router.url('post', post.id));

        }catch (error) {
           /*  console.log(error); */
            await ctx.render('update/:id',{
                post,
                errors: error.errors,
                createPostPath: ctx.router.url('update/', post.id),
            });
        }
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