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
            ctx.body = { patientToken: token };
        } else {
            ctx.status = 401;
            ctx.body = {
                error: 'Correo o contraseña incorrectos para iniciar sesión como Paciente'
            }
        }
    } else {
        ctx.status = 401;
        ctx.body = {
            error: 'Correo o contraseña incorrectos para iniciar sesión como Paciente'
        }
    }

});

router.post('login-dentist', '/loginDentist', async (ctx) => {

    const { email, password } = ctx.request.body;
    const mail = email;       //Recuerda que el atributo de email en los dentistas es mail.

    const dentist = await ctx.orm.dentist.findOne({ where: { mail } });

    if (dentist) {
        const authenticated = await bcrypt.compare(password, dentist.password);
        if (authenticated) {
            const recognizer = dentist.id.toString() + 'd';
            const token = jwt.sign({ sub: recognizer}, process.env.JWT_SECRET);
            ctx.status = 201;
            ctx.body = { dentistToken: token };
        } else {
            ctx.status = 401;
            ctx.body = {
                error: 'Correo o contraseña incorrectos para iniciar sesión como Dentista'
            }
        }
    } else {
        ctx.status = 401;
        ctx.body = {
            error: 'Correo o contraseña incorrectos para iniciar sesión como Dentista'
        }
    }

});

module.exports = router;