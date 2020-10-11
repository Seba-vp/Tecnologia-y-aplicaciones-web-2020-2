const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('logging-menu', '/', async (ctx) => {
    await ctx.render('session/index', {
        patientRegistrationPath: ctx.router.url('patients-new'),
        dentistRegistrationPath: ctx.router.url('dentists-new'),
        loginPatientPath: ctx.router.url('session-create-patient'),
        loginDentistPath: ctx.router.url('session-create-dentist')
    });
});

module.exports = router;