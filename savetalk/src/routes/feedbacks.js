const KoaRouter = require('koa-router');
const feedback = require('../models/feedback');

const router = new KoaRouter();

//Nuevo
const PERMITED_FIELDS = [
    'id_date',
    'id_pain',
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

router.param('dateid', async (id, ctx, next) => {
    const date = await ctx.orm.date.findByPk(id);
    if (!date) {
        ctx.throw(404);
    }
    ctx.state.date = date;
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

router.get('feedbacks-new', '/new/:dateid', async (ctx) => {
    const { date } = ctx.state;
    idpatient = await ctx.state.currentPatient.id;
    const ruta = '/patients/' + String(idpatient);

    let feedbackAlreadyCreated = await ctx.orm.feedback.findOne({ where: { id_date: date.id } });
    if (feedbackAlreadyCreated === null) {
        feedbackAlreadyCreated = false
    } else {
        feedbackAlreadyCreated = true
    }

    const feedback = ctx.orm.feedback.build();
    return ctx.render('feedbacks/new',{
        ruta,
        feedback,
        date,
        feedbackAlreadyCreated,
        createFeedbackPath: (dateId) => ctx.router.url('feedbacks-create', dateId)
    });
})

router.post('feedbacks-create','/:dateid', async (ctx)=>{
    const { date } = ctx.state;
    const pain = await date.getPain();
    const attributes = {
        ...ctx.request.body,
        id_date: date.id,
        id_pain: pain.id
    }
    const feedback = ctx.orm.feedback.build(attributes);

    try{
        await feedback.save({fields:PERMITED_FIELDS});
        ctx.redirect(ctx.router.url('patient', ctx.state.currentPatient.id));
    }catch (error) {
        const feedbackAlreadyCreated = false
        await ctx.render('feedbacks/new',{
            feedback,
            date,
            errors: error.errors,
            feedbackAlreadyCreated,
            createFeedbackPath: (dateId) => ctx.router.url('feedbacks-create', dateId),
        });
    }
})


router.get('feedback', '/:dateid', async (ctx) => {
    const { date } = ctx.state;
    iddentist = await ctx.state.currentDentist.id;
    const ruta = '/dentists/' + String(iddentist);
    let feedback = await ctx.orm.feedback.findOne({ where: { id_date: date.id } });
    let feedbackFound = true
    if (feedback === null) {
        feedbackFound = false
    }

    return ctx.render('feedbacks/show', {
        ruta,
        feedback,
        feedbackFound,
        deleteFeedbackPath: id => ctx.router.url('feedback-delete', id)
    });
});


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