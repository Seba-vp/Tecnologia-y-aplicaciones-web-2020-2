const KoaRouter = require('koa-router');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
    'painId',
    'dentistId',
    'schedule',
    'price',
    'state'
]
const PERMITTED_FIELDS_CHAT = [
    'dentistId',
    'patientId',
    'block'
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
    const { date } = ctx.state;
    const dentist = await ctx.orm.dentist.findByPk(date.dentistId);
    return ctx.render('dates/show', {
        dentist,
        date,
        confirmDatePath: (dateId) => ctx.router.url('date-confirm', dateId),
        rejectDatePath: (dateId) => ctx.router.url('date-reject', dateId)
    });
})

router.get('dates-new', '/new/:dentistid/:painid', (ctx) => {
    const { dentist } = ctx.state;
    const { pain } = ctx.state;
    const date = ctx.orm.date.build();
    return ctx.render('dates/new', {
        dentist,
        pain,
        date,
        createDatePath: (dentistid, painid) => ctx.router.url('dates-create', dentistid, painid)
    });
})

router.post('dates-create', '/:dentistid/:painid', async (ctx) => {
    const { dentist } = ctx.state;
    const { pain } = ctx.state;

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

router.patch('date-confirm', '/dateconfirm/:id', async (ctx) => {
    const { date } = ctx.state;
    pain = await date.getPain();
    patient = await pain.getPatient();
    chats = await patient.getChats();
    // manejar el caso de que ya tengan citas 
    createchat = true;
    for (const element of chats) {
        if (element.patientId === patient.id && element.dentistId === date.dentistId) {
            createchat = false;
        }
    }
    if (createchat === true) {
        const attributes = {
            dentistId: date.dentistId,
            patientId: patient.id,
            block: false
        }
        const chat = ctx.orm.chat.build(attributes);
        await chat.save({ fields: PERMITTED_FIELDS_CHAT });
    }

    date.state = 1;
    await date.save({ fields: PERMITTED_FIELDS });


    ctx.redirect(ctx.router.url('patient', ctx.state.currentPatient.id));
})

router.patch('date-reject', '/datereject/:id', async (ctx) => {
    const { date } = ctx.state;
    date.state = -1;
    await date.save({ fields: PERMITTED_FIELDS });
    ctx.redirect(ctx.router.url('patient', ctx.state.currentPatient.id));
})

router.patch('date-done', '/datedone/:id', async (ctx) => {
    const { date } = ctx.state;
    date.state = 2;
    await date.save({ fields: PERMITTED_FIELDS });
    ctx.redirect(ctx.router.url('dentist', ctx.state.currentDentist.id));
})


module.exports = router;