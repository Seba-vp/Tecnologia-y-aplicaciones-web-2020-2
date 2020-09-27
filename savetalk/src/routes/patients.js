const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
    const patient = await ctx.orm.patient.findByPk(id);
    if (!patient) {
        ctx.throw(404);
    }
    ctx.state.patient = patient;
    return next();
});

router.get('patients', '/', async (ctx) => {
    const patients = await ctx.orm.patient.findAll();
    await ctx.render('patients/index', {
        patients,
        patientPath: id => ctx.router.url('patient', id)
    });
});

router.get('patient', '/:id', (ctx) => {
    const { patient } = ctx.state;
    return ctx.render('patients/show', {
        patient
    });
});

module.exports = router;