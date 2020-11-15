const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const patients = require('./routes/patients');
const sessions = require('./routes/session');
const sessions_2 = require('./routes/session_2');

const notifications = require('./routes/notifications');
const feedbacks = require('./routes/feedbacks');
const posts = require('./routes/posts');

const dentists = require('./routes/dentists');
const pains = require('./routes/pains');
const dates = require('./routes/dates');
const messages = require('./routes/messages');
const carerequests = require('./routes/carerequests');
const chats = require('./routes/chats');

const router = new KoaRouter();

router.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    switch (err.status) {
      case 401:
        ctx.app.emit('error', err, ctx);
        console.log('error identificado')
        ctx.redirect(ctx.router.url('logging-menu'));
        break;
      default:
        throw err;
    }
  }
})

router.use(async (ctx, next) => {
  Object.assign(ctx.state, {
    destroyPatientSessionPath: ctx.router.url('session-destroy-patient'),
    destroyDentistSessionPath: ctx.router.url('session-destroy-dentist'),
    wantToConnectSessionPath: ctx.router.url('logging-menu')
  });
  return next();
});

router.use(async (ctx, next) => {
  if (ctx.session.currentPatientId) {
    ctx.state.currentPatient = await ctx.orm.patient.findByPk(ctx.session.currentPatientId);
  }
  if (ctx.session.currentDentistId) {
    ctx.state.currentDentist = await ctx.orm.dentist.findByPk(ctx.session.currentDentistId);
  }
  return next();
});

router.use('/', sessions.routes());
router.use('/session', sessions_2.routes());
router.use('/pain', pains.routes());
router.use('/hello', hello.routes());
router.use('/patients', patients.routes());

router.use('/notifications', notifications.routes());
router.use('/feedbacks', feedbacks.routes());
router.use('/posts', posts.routes());

router.use('/dentists', dentists.routes());
router.use('/indexAfterRegistration', index.routes());
router.use('/date', dates.routes());
router.use('/messages', messages.routes());
router.use('/carerequests', carerequests.routes());
router.use('/chats', chats.routes());



module.exports = router;
