const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const patients = require('./routes/patients');
const dentists = require('./routes/dentists');

const router = new KoaRouter();

router.use('/hello', hello.routes());
router.use('/patients', patients.routes());
router.use('/dentists', dentists.routes());
router.use('/', index.routes());

module.exports = router;
