const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const patients = require('./routes/patients');
const notifications = require('./routes/notifications');
const feedbacks = require('./routes/feedbacks');
const posts = require('./routes/posts');

const router = new KoaRouter();

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/patients', patients.routes());
router.use('/notifications', notifications.routes());
router.use('/feedbacks', feedbacks.routes());
router.use('/posts', posts.routes());

module.exports = router;
