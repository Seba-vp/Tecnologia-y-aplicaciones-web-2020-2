const KoaRouter = require('koa-router');
const feedback = require('../models/feedback');

const router = new KoaRouter();

//Nuevo
const PERMITED_FIELDS = [
    'id_odontologo',
    'id_user',
    'description',
    'calification',
];
// hasta aca

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
    const feedback = ctx.orm.feedback.build();
    return ctx.render('feedbacks/new',{
        feedback,
        createFeedbackPath: ctx.router.url('feedbacks-create')
    });
})

router.post('feedbacks-create','/', async (ctx)=>{
    const feedback = ctx.orm.feedback.build(ctx.request.body);

    try{
    await feedback.save({fields:PERMITED_FIELDS});
    ctx.redirect(ctx.router.url('feedbacks'));
  }catch (error) {
    await ctx.render('feedbacks/new',{
        feedback,
        errors: error.errors,
        createFeedbackPath: ctx.router.url('feedbacks-create'),
    });
}
})

//Hasta aca lo nuevo

router.get('feedback', '/:id', (ctx) => {
    const {feedback} = ctx.state;
    return ctx.render('feedbacks/show', {

//delete
        feedback,
        deleteFeedbackPath: id => ctx.router.url('feedback-delete', id)
    });
});



// monton de if's 

router.get('feedback-delete', '/delete/:id', (ctx) => {
    const {feedback} = ctx.state;
    return ctx.render('feedbacks/delete', {
        feedback,
        deleteFeedbackPathDataBase: id => ctx.router.url('feedback-delete-database', id)
    });
})

router.post('feedback-delete-database', 'delete/:id', async (ctx) => {
    const {feedback} = ctx.state;
    await feedback.destroy();
    ctx.redirect(ctx.router.url('feedbacks'));
});
module.exports = router;