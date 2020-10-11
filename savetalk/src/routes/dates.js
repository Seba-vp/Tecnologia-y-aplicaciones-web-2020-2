const KoaRouter = require('koa-router');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
    'painId',
    'dentistId',
    'schedule',
    'price',
    'state'
]

router.param('id', async (id, ctx, next) => {
    const date = await ctx.orm.date.findByPk(id);
    if (!date) {
        ctx.throw(404);
    }
    ctx.state.date = date;
    return next();
});

router.param('dentistid', async (id, ctx, next) => {
    const dentist = await ctx.orm.dentist.findByPk(id);
    if (!dentist) {
        ctx.throw(404);
    }
    ctx.state.dentist = dentist;
    return next();
});

router.param('painid', async (id, ctx, next) => {
    const pain = await ctx.orm.pain.findByPk(id);
    if (!pain) {
        ctx.throw(404);
    }
    ctx.state.pain = pain;
    return next();
});

router.get('date', '/:id', async (ctx) => {
    const {date} = ctx.state;
    const dentist = await ctx.orm.dentist.findByPk(date.dentistId);
    return ctx.render('dates/show',{
        dentist,
        date
    });
})

router.get('dates-new', '/new/:dentistid/:painid', (ctx) => {
    const {dentist} = ctx.state;
    const {pain} = ctx.state;
    const date = ctx.orm.date.build();
    return ctx.render('dates/new',{
        dentist,
        pain,
        date,
        createDatePath: (dentistid, painid) => ctx.router.url('dates-create', dentistid, painid)
    });
})

router.post('dates-create', '/:dentistid/:painid', async (ctx) => {
    const {dentist} = ctx.state;
    const {pain} = ctx.state;

    const attributes = {
        ...ctx.request.body,
        painId: pain.id,
        dentistId: dentist.id
    }

    const date = ctx.orm.date.build(attributes);   //Lo creamos
    try {
        await date.save({ fields: PERMITTED_FIELDS });          //Lo insertamos en la base de datos
        ctx.redirect(ctx.router.url('dentist', ctx.state.currentDentist.id));
    } catch (error) {
        await ctx.render('dates/new', {
            date,
            errors: error.errors,
            createDatePath: (dentistid, painid) => ctx.router.url('dates-create', dentistid, painid)
        });
    }
});


module.exports = router;