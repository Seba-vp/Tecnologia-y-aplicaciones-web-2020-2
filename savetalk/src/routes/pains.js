const KoaRouter = require('koa-router');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
    'name',
    'description',
    'category',
    'patientId'
]
const PROTECTED_PATH_D = [
    '/:dentistid',
]

const PROTECTED_PATH_P = [
    'patientpain/:idpain',
]

function checkAuthD(ctx, next) {
    const { currentDentist } = ctx.state;
    if (!currentDentist) ctx.throw(401);
    console.log(ctx.params)
    if (currentDentist.id.toString() !== ctx.params.dentistid) ctx.throw(401);
    return next();
}

function checkAuthP(ctx, next) {
    const { currentPatient } = ctx.state;
    if (!currentPatient) ctx.throw(401);
    if (currentPatient.id.toString() !== ctx.params.id) ctx.throw(401);
    return next();
}

async function checkAuthPain(ctx, next) {
    const { pain } = ctx.state;
    painPatient = await pain.getPatient();
    const { currentPatient } = ctx.state;
    console.log(currentPatient.id)
    console.log(painPatient.id)
    if (currentPatient.id !== painPatient.id) ctx.throw(401);
    console.log(ctx.params)
    console.log(pain.id)
    if (pain.id.toString() !== ctx.params.idpain) ctx.throw(401);
    return next();
}


//router.use(PROTECTED_PATH_D, checkAuthD);
//router.use(PROTECTED_PATH_P, checkAuthP);

router.param('id', async (id, ctx, next) => {
    const patient = await ctx.orm.patient.findByPk(id);
    if (!patient) {
        ctx.throw(404);
    }
    ctx.state.patient = patient;
    return next();
});

router.param('idpain', async (id, ctx, next) => {
    const pain = await ctx.orm.pain.findByPk(id);
    if (!pain) {
        ctx.throw(404);
    }
    ctx.state.pain = pain;
    return next();
});

router.param('dentistid', async (id, ctx, next) => {
    const dentist = await ctx.orm.dentist.findByPk(id);
    if (!dentist) {
        ctx.throw(404);
    }
    ctx.state.dentist = dentist;
    return next();
});

router.get('pains', '/:dentistid', checkAuthD, async (ctx) => {
    const { dentist } = ctx.state;
    const pains = await ctx.orm.pain.findAll({ include: ctx.orm.date });

    let painsToSend = [];

    pains.forEach(pain => {
        let painHasAConfirmDate = false;

        pain.dates.forEach(date => {

            if (date.state === 1 || date.state === 2) {
                painHasAConfirmDate = true;
            }

        });

        if (painHasAConfirmDate === false) {
            painsToSend.push(pain);
        }

    });

    await ctx.render('pains/index', {
        painsToSend,
        dentist,
        painPath: (idpain, iddentist) => ctx.router.url('dentistPain', idpain, iddentist),
        dentistPath: id => ctx.router.url('dentist', id),
    });
});

router.get('dentistPain', '/dentistpain/:idpain/:dentistid', checkAuthD, async (ctx) => {
    const { pain } = ctx.state;
    const { dentist } = ctx.state;
    let dentistAlreadyAppliedToThePain = false;

    painDates = await pain.getDates();

    for (const date of painDates) {
        dentistToCompare = await date.getDentist();
        if (dentist.id === dentistToCompare.id) {
            dentistAlreadyAppliedToThePain = true;
        }
    }

    dentistAlreadyApplied = {
        check: dentistAlreadyAppliedToThePain
    };

    return ctx.render('pains/show', {
        pain,
        dentist,
        patient: await pain.getPatient(),
        dentistAlreadyApplied,
        dateNewPath: (dentistid, painid) => ctx.router.url('dates-new', dentistid, painid),
        dentistPath: id => ctx.router.url('dentist', id),
        painPath: (idpain, iddentist) => ctx.router.url('dentistPain', idpain, iddentist),
        seePainsPath: id => ctx.router.url('pains', id),
        dentistPath: id => ctx.router.url('dentist', id),
    });
});

router.get('patientPain', 'patientpain/:idpain', checkAuthPain, async (ctx) => {
    const { pain } = ctx.state;
    const { patient } = ctx.state;
    idpatient = await ctx.state.currentPatient.id;
    painDates = await pain.getDates();
    painAlreadyHasAConfirmDate = false;
    let definitiveDate = null;

    for (const date of painDates) {
        if (date.state === 1 || date.state === 2) {
            painAlreadyHasAConfirmDate = true;
            definitiveDate = date;
            return ctx.render('pains/patientShow', {
                pain,
                patient: await pain.getPatient(),
                dates: await pain.getDates(),
                specificDatePath: (dateid) => ctx.router.url('date', dateid),
                definitiveDate,
                patientPath: id => ctx.router.url('patient', id),

            });
        }
    }

    return ctx.render('pains/patientShow', {
        pain,
        patient: await pain.getPatient(),
        dates: await pain.getDates(),
        specificDatePath: (dateid) => ctx.router.url('date', dateid),
        patientPath: id => ctx.router.url('patient', id),
    });
});

router.get('pains-new', '/new/:id', checkAuthP, (ctx) => {
    const { patient } = ctx.state;
    const pain = ctx.orm.pain.build();
    return ctx.render('pains/new', {
        pain,
        patient,
        patientPath: id => ctx.router.url('patient', id),
        createPainPath: id => ctx.router.url('pains-create', id)
    });
})

router.post('pains-create', '/:id', async (ctx) => {
    const { patient } = ctx.state;
    const attributes = {
        ...ctx.request.body,
        patientId: patient.id
    }
    const pain = ctx.orm.pain.build(attributes);   //Lo creamos
    try {
        await pain.save({ fields: PERMITTED_FIELDS });          //Lo insertamos en la base de datos
        ctx.redirect(ctx.router.url('patient', ctx.state.currentPatient.id));
    } catch (error) {
        await ctx.render('pains/new', {
            pain,
            errors: error.errors,
            patientPath: id => ctx.router.url('patient', id),
            createPainPath: id => ctx.router.url('pains-create', id)
        });
    }
});

module.exports = router;