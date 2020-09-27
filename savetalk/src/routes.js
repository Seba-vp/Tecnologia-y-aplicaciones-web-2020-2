const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const patients = require('./routes/patients');
const messages = require('./routes/messages');
const carerequests = require('./routes/carerequests');
const chats = require('./routes/chats');


const router = new KoaRouter();

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/patients', patients.routes());
router.use('/messages', messages.routes());
router.use('/carerequests', carerequests.routes());
router.use('/chats', chats.routes());


module.exports = router;
