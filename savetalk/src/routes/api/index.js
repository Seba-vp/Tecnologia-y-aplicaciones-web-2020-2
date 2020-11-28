const KoaRouter = require('koa-router');
const jwt = require('koa-jwt');
require('dotenv').config()

const auth = require('./auth');
const patient = require('./patient');
const dentist = require('./dentist');
// get all
const posts = require('./posts');
// 3 post y un get(en pains)
const pain = require('./pain');
const message = require('./message');
const date = require('./date');


const router = new KoaRouter({ prefix: '/api' });

//Rutas SIN AUTENTIFICACION

router.get('/', async (ctx) => {
    ctx.body = { message: 'savetalk API'};
});
router.use('/posts', posts.routes());


router.use('/auth', auth.routes());

router.use(jwt({ secret: process.env.JWT_SECRET, key: 'jwtDecoded'}))
//De aquí para abajo son las rutas que requieren AUTENTIFICACION

router.use('/patient', patient.routes());
router.use('/dentist', dentist.routes());
router.use('/pain', pain.routes());
router.use('/message', message.routes());
router.use('/date', date.routes());


module.exports = router;

