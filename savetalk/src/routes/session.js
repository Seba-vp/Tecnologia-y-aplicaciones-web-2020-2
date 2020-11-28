const KoaRouter = require('koa-router');

const post = require('../models/post');
const router = new KoaRouter();

router.get('logging-menu', '/', async (ctx) => {
    const posts = await ctx.orm.post.findAll();
    await ctx.render('session/index', {
        posts,
        postPath: id => ctx.router.url('post', id),
        patientRegistrationPath: ctx.router.url('patients-new'),
        dentistRegistrationPath: ctx.router.url('dentists-new'),
        loginPatientPath: ctx.router.url('session-create-patient'),
        loginDentistPath: ctx.router.url('session-create-dentist')
    });
});

module.exports = router;