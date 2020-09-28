const KoaRouter = require('koa-router');
const pkg = require('../../package.json');

const router = new KoaRouter();

router.get('/', async (ctx) => {
  await ctx.render('index', {
    patientsPath: ctx.router.url('patients'),
    dentistsPath: ctx.router.url('dentists'),
    carerequestsPath: ctx.router.url('carerequests'),
    chatsPath: ctx.router.url('chats'),
    messagesPath: ctx.router.url('messages'),
    feedbacksPath: ctx.router.url('feedbacks'),
    notificationsPath: ctx.router.url('notifications'),
    postsPath: ctx.router.url('posts'),
  });
});

module.exports = router;
