const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
    const feedback = await ctx.orm.feedback.findByPk(id);
    if (!feedback) {
        ctx.throw(404);
    }
    ctx.state.feedback = feedback;
    return next();
});

router.get('feedbacks', '/', async (ctx) => {
    const feedbacks = await ctx.orm.feedback.findAll();
    await ctx.render('feedbacks/index', {
        feedbacks,
        feedbackPath: id => ctx.router.url('feedback', id),
        //Lo de abajo es nuevo
        newFeedbackPath: ctx.router.url('feedbacks-new'),
    });
});

router.get('feedbacks-new', '/new', (ctx) => {
    return ctx.render('feedbacks/new',{
        createFeedbackPath: ctx.router.url('feedbacks-create')
    });
})

router.post('feedbacks-create','/', async (ctx)=>{

    const feedback = ctx.orm.feedback.build(ctx.request.body);
    ctx.redirect(ctx.router.url('feedbacks'));
})

//Hasta aca lo nuevo

router.get('feedback', '/:id', (ctx) => {
    const {feedback} = ctx.state;
    return ctx.render('feedbacks/show', {feedback});
});

module.exports = router;