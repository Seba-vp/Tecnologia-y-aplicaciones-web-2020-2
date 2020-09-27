const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const patients = require('./routes/patients');
const carerequests = require('./routes/carerequests');

const router = new KoaRouter();

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/patients', patients.routes());
router.use('/carerequests', carerequests.routes());

module.exports = router;
