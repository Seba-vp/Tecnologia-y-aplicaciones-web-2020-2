const KoaRouter = require('koa-router');
const pkg = require('../../package.json');

const router = new KoaRouter();

router.get('/', async (ctx) => {
  await ctx.render('index', {
    patientsPath: ctx.router.url('patients'),
    dentistsPath: ctx.router.url('dentists')
  });
});

module.exports = router;
