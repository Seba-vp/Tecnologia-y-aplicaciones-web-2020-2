const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('error-auth', '/', async (ctx) => {
    await ctx.render('session/eauth', {
        loginPatientPath: ctx.router.url('session-create-patient'),
        loginDentistPath: ctx.router.url('session-create-dentist')
    });
});

module.exports = router;