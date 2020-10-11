const bcrypt = require('bcrypt');
const KoaRouter = require('koa-router');

const router = new KoaRouter();



router.post('session-create-patient', '/patientPost', async (ctx) => {
    const { email, password } = ctx.request.body;
    const patient = await ctx.orm.patient.findOne({ where: { email } });
    try {
        const authenticated = await bcrypt.compare(password, patient.password);
        if (patient && authenticated) {
          ctx.session.currentPatientId = patient.id;
          ctx.redirect(ctx.router.url('patient', patient.id));
        } else {
          await ctx.render('session/index', {
            error: 'Usuario y/o contraseña incorrectos',
            patientRegistrationPath: ctx.router.url('patients-new'),
            dentistRegistrationPath: ctx.router.url('dentists-new'),
            loginPatientPath: ctx.router.url('session-create-patient'),
            loginDentistPath: ctx.router.url('session-create-dentist'),
            email
          });
        }
        
    } catch (error) {
        await ctx.render('session/index', {
            error: 'Usuario y/o contraseña incorrectos',
            patientRegistrationPath: ctx.router.url('patients-new'),
            dentistRegistrationPath: ctx.router.url('dentists-new'),
            loginPatientPath: ctx.router.url('session-create-patient'),
            loginDentistPath: ctx.router.url('session-create-dentist'),
            email
          });
    }

  });


router.post('session-create-dentist', 'dentistPost', async (ctx) => {
    const { mail, password } = ctx.request.body;
    const dentist = await ctx.orm.dentist.findOne({ where: { mail } });
    try {
        const authenticated = await bcrypt.compare(password, dentist.password);
        if (dentist && authenticated) {
          ctx.session.currentDentistId = dentist.id;
          ctx.redirect(ctx.router.url('dentist', dentist.id));

        } else {
          await ctx.render('session/index', {
            error: 'Usuario y/o contraseña incorrectos',
            patientRegistrationPath: ctx.router.url('patients-new'),
            dentistRegistrationPath: ctx.router.url('dentists-new'),
            loginPatientPath: ctx.router.url('session-create-patient'),
            loginDentistPath: ctx.router.url('session-create-dentist'),
            mail
          });
        }
        
    } catch (error) {
        await ctx.render('session/index', {
            error: 'Usuario y/o contraseña incorrectos',
            patientRegistrationPath: ctx.router.url('patients-new'),
            dentistRegistrationPath: ctx.router.url('dentists-new'),
            loginPatientPath: ctx.router.url('session-create-patient'),
            loginDentistPath: ctx.router.url('session-create-dentist'),
            mail
          });
    }

  });


router.delete('session-destroy-patient', '/destroyPatientSession', async (ctx) => {
  ctx.session.currentPatientId = null;
  ctx.redirect('/');
});


router.delete('session-destroy-dentist', '/destroyDentistSession', async (ctx) => {
    ctx.session.currentDentistId = null;
    ctx.redirect('/');
  });

module.exports = router;