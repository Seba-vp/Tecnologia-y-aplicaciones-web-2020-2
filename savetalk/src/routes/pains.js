const KoaRouter = require('koa-router');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
    'name',
    'description',
    'category',
    'patientId'
]

router.param('id', async (id, ctx, next) => {
    const patient = await ctx.orm.patient.findByPk(id);
    if (!patient) {
        ctx.throw(404);
    }
    ctx.state.patient = patient;
    return next();
});

router.param('idpain', async (id, ctx, next) => {
    const pain = await ctx.orm.pain.findByPk(id);
    if (!pain) {
        ctx.throw(404);
    }
    ctx.state.pain = pain;
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

router.get('pains', '/:dentistid', async (ctx) => {
    const {dentist} = ctx.state;
    const pains = await ctx.orm.pain.findAll();
    await ctx.render('pains/index', {
        pains,
        dentist,
        painPath: (idpain, iddentist) => ctx.router.url('dentistPain', idpain, iddentist),
    });
});

router.get('dentistPain', 'dentistpain/:idpain/:dentistid', async (ctx) => {
    const {pain} = ctx.state;
    const {dentist} = ctx.state;
    return ctx.render('pains/show', {
        pain,
        dentist,
        patient: await pain.getPatient(),
        dateNewPath: (dentistid, painid) => ctx.router.url('dates-new', dentistid, painid),
    });
});

router.get('patientPain', 'patientpain/:idpain', async (ctx) => {
    const {pain} = ctx.state;
    return ctx.render('pains/patientShow', {
        pain,
        patient: await pain.getPatient(),
        dates: await pain.getDates(),
        specificDatePath: (dateid) => ctx.router.url('date', dateid)
    });
});

router.get('pains-new', '/new/:id', (ctx) => {
    const {patient} = ctx.state;
    const pain = ctx.orm.pain.build();
    return ctx.render('pains/new',{
        pain,
        patient,
        createPainPath: id => ctx.router.url('pains-create', id)
    });
})

router.post('pains-create', '/:id', async (ctx) => {
    const {patient} = ctx.state;
    const attributes = {
        ...ctx.request.body,
        patientId: patient.id
    }
    const pain = ctx.orm.pain.build(attributes);   //Lo creamos
    try {
        await pain.save({ fields: PERMITTED_FIELDS });          //Lo insertamos en la base de datos
        ctx.redirect(ctx.router.url('patients'))
    } catch (error) {
        await ctx.render('pains/new', {
            pain,
            errors: error.errors,
            createPainPath: id => ctx.router.url('pains-create', id)
        });
    }
});




module.exports = router;