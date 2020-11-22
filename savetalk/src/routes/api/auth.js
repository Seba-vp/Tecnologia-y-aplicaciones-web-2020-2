const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const KoaRouter = require('koa-router');
const router = new KoaRouter();
require('dotenv').config()

router.post('login-patient', '/loginPatient', async (ctx) => {

    const { email, password } = ctx.request.body;
    const patient = await ctx.orm.patient.findOne({ where: { email } });

    if (patient) {
        const authenticated = await bcrypt.compare(password, patient.password);
        if (authenticated) {
            const recognizer = patient.id.toString() + 'p';
            const token = jwt.sign({ sub: recognizer}, process.env.JWT_SECRET);
            ctx.status = 201;
            ctx.body = { token };
        } else {
            ctx.status = 401;
            ctx.body = {
                error: 'Correo o contraseña incorrectos'
            }
        }
    } else {
        ctx.status = 401;
        ctx.body = {
            error: 'Correo o contraseña incorrectos'
        }
    }

});

module.exports = router;