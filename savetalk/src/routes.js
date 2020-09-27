const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const patients = require('./routes/patients');
const dentists = require('./routes/dentists');
const pains = require('./routes/pains');
const dates = require('./routes/dates');
const messages = require('./routes/messages');
const carerequests = require('./routes/carerequests');
const chats = require('./routes/chats');



const router = new KoaRouter();


router.use('/pain', pains.routes());
router.use('/hello', hello.routes());
router.use('/patients', patients.routes());
router.use('/dentists', dentists.routes());
router.use('/', index.routes());
router.use('/date', dates.routes());
router.use('/messages', messages.routes());
router.use('/carerequests', carerequests.routes());
router.use('/chats', chats.routes());


module.exports = router;
