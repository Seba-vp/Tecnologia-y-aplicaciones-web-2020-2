const KoaRouter = require('koa-router');
const axios = require('axios');

const post = require('../models/post');
const router = new KoaRouter();

router.get('logging-menu', '/', async (ctx) => {
    const posts = await ctx.orm.post.findAll();

    var url = "http://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=497fa2c163be479dbc4fdb1a5e017cdc";
    const res = await axios.get(url)
    console.log("HOLLAA MIRAAR ACA: ", res.data.articles[0])

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