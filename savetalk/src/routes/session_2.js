const bcrypt = require('bcrypt');
const KoaRouter = require('koa-router');
const axios = require('axios');

const router = new KoaRouter();

router.post('session-create-patient', '/patientPost', async (ctx) => {
  const posts = await ctx.orm.post.findAll();
  const { email, password } = ctx.request.body;
  const patient = await ctx.orm.patient.findOne({ where: { email } });

  var url = "http://newsapi.org/v2/top-headlines?country=us&category=health&apiKey="+String(process.env.API_KEY);
  const res = await axios.get(url)
  console.log("HOLLAA MIRAAR ACA: ", res.data.articles[0])
  const articles = res.data.articles
  console.log("ARTICLES", articles)

  try {
    const authenticated = await bcrypt.compare(password, patient.password);
    if (patient && authenticated) {
      ctx.session.currentPatientId = patient.id;
      ctx.redirect(ctx.router.url('patient', patient.id));
    } else {
      await ctx.render('session/index', {
        articles,
        posts,
        postPath: id => ctx.router.url('post', id),
        error: 'Usuario y/o contraseña incorrectos',
        patientRegistrationPath: ctx.router.url('patients-new'),
        dentistRegistrationPath: ctx.router.url('dentists-new'),
        loginPatientPath: ctx.router.url('session-create-patient'),
        loginDentistPath: ctx.router.url('session-create-dentist'),
        email
      });
    }

  } catch (error) {
    await ctx.render('session/index', {
      articles,
      posts,
      postPath: id => ctx.router.url('post', id),
      error: 'Usuario y/o contraseña incorrectos',
      patientRegistrationPath: ctx.router.url('patients-new'),
      dentistRegistrationPath: ctx.router.url('dentists-new'),
      loginPatientPath: ctx.router.url('session-create-patient'),
      loginDentistPath: ctx.router.url('session-create-dentist'),
      email
    });
  }

});


router.post('session-create-dentist', 'dentistPost', async (ctx) => {
  const posts = await ctx.orm.post.findAll();
  const { mail, password } = ctx.request.body;
  const dentist = await ctx.orm.dentist.findOne({ where: { mail } });

  var url = "http://newsapi.org/v2/top-headlines?country=us&category=health&apiKey="+String(process.env.API_KEY);
  const res = await axios.get(url)
  console.log("HOLLAA MIRAAR ACA: ", res.data.articles[0])
  const articles = res.data.articles
  console.log("ARTICLES", articles)

  try {
    const authenticated = await bcrypt.compare(password, dentist.password);
    if (dentist && authenticated) {
      ctx.session.currentDentistId = dentist.id;
      ctx.redirect(ctx.router.url('dentist', dentist.id));

    } else {
      await ctx.render('session/index', {
        articles,
        posts,
        postPath: id => ctx.router.url('post', id),
        error: 'Usuario y/o contraseña incorrectos',
        patientRegistrationPath: ctx.router.url('patients-new'),
        dentistRegistrationPath: ctx.router.url('dentists-new'),
        loginPatientPath: ctx.router.url('session-create-patient'),
        loginDentistPath: ctx.router.url('session-create-dentist'),
        mail
      });
    }

  } catch (error) {
    await ctx.render('session/index', {
      articles,
      posts,
      postPath: id => ctx.router.url('post', id),
      error: 'Usuario y/o contraseña incorrectos',
      patientRegistrationPath: ctx.router.url('patients-new'),
      dentistRegistrationPath: ctx.router.url('dentists-new'),
      loginPatientPath: ctx.router.url('session-create-patient'),
      loginDentistPath: ctx.router.url('session-create-dentist'),
      mail
    });
  }

});


router.delete('session-destroy-patient', '/destroyPatientSession', async (ctx) => {
  ctx.session.currentPatientId = null;
  ctx.redirect('/');
});


router.delete('session-destroy-dentist', '/destroyDentistSession', async (ctx) => {
  ctx.session.currentDentistId = null;
  ctx.redirect('/');
});

module.exports = router;