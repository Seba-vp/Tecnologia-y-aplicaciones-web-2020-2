const KoaRouter = require('koa-router');
const jwt = require('koa-jwt');
require('dotenv').config()

const auth = require('./auth');
const patient = require('./patient');
const dentist = require('./dentist');

// Delete
const deletepatient = require('./deletepatient');
const deletedentist = require('./deletedentist');
const deletepain = require('./deletepain');

// Get all
const pains = require('./allpains');

const router = new KoaRouter({ prefix: '/api' });

//Rutas SIN AUTENTIFICACION

router.get('/', async (ctx) => {
    ctx.body = { message: 'savetalk API' };
});


router.use('/auth', auth.routes());

router.use(jwt({ secret: process.env.JWT_SECRET, key: 'jwtDecoded' }))
//De aquí para abajo son las rutas que requieren AUTENTIFICACION

router.use('/patient', patient.routes());
router.use('/dentist', dentist.routes());

// Delete 
router.use('/deletepatient', deletepatient.routes());
router.use('/deletedentist', deletedentist.routes());
router.use('/deletepain', deletepain.routes());

// Get all
router.use('/allpains', pains.routes());

module.exports = router;

