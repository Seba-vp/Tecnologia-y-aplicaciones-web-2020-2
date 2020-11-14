const KoaRouter = require('koa-router');

const router = new KoaRouter();
const path = require('path');
const PERMITTED_FIELDS = [
    'age',
    'name',
    'password',
    'phone',
    'address',
    'city',
    'picture',
    'email',
    'rut',
    'isapre'
]

function checkAuth(ctx, next) {
    const { currentPatient } = ctx.state;
    if (!currentPatient) ctx.throw(401);
    if (currentPatient.id.toString() !== ctx.params.id) ctx.throw(401);
    return next();
}

router.param('id', async (id, ctx, next) => {
    const patient = await ctx.orm.patient.findByPk(id);
    if (!patient) {
        ctx.throw(404);
    }
    ctx.state.patient = patient;
    return next();
});

router.get('patients', '/', checkAuth, async (ctx) => {
    
    const patients = await ctx.orm.patient.findAll();
    await ctx.render('patients/index', {
        patients,
        patientPath: id => ctx.router.url('patient', id),
        newPatientPath: ctx.router.url('patients-new')
    });
});

router.get('patients-new', '/new', (ctx) => {
    const patient = ctx.orm.patient.build();
    return ctx.render('patients/new', {
        patient,
        createPatientPath: ctx.router.url('patients-create')
    });
})

router.post('patients-create', '/', async (ctx) => {
    const { cloudinary } = ctx.state;
    /* const patient = ctx.orm.patient.build(ctx.request.body);  esta mas abajo */
    //Lo creamos
    try {
        /* ESTA PARTE ES DE ARCHIVOS */
        const { picture } = ctx.request.files;
        if (picture.size > 0) {

            const uploadedImage = await cloudinary.uploader.upload(picture.path);
            ctx.request.body.picture = uploadedImage.public_id;
        }
        /* ********************** */
        const patient = ctx.orm.patient.build(ctx.request.body);
        await patient.save({ fields: PERMITTED_FIELDS });          //Lo insertamos en la base de datos
        ctx.session.currentPatientId = patient.id;
        ctx.redirect(ctx.router.url('patient', patient.id));

    } catch (error) {
        const patient = ctx.orm.patient.build(ctx.request.body);
        await ctx.render('patients/new', {
            patient,
            errors: error.errors,
            createPatientPath: ctx.router.url('patients-create')
        });
    }
});


router.get('patient', '/:id', checkAuth, async (ctx) => {
    const { patient } = ctx.state;
    chats = await patient.getChats();
    return ctx.render('patients/show', {
        patient,
        chats,
        pains: await patient.getPains(),
        createPainPath: id => ctx.router.url('pains-new', id),
        seeChatPath: id => ctx.router.url('chats', id),
        messagesPatientPath: ctx.router.url('messagespatient'),
        specificPainPath: id => ctx.router.url('patientPain', id),
        updatePatientPath: id => ctx.router.url('patient-update', id),
        deletePatientPath: id => ctx.router.url('patient-delete', id),
        createPatientMessagePath: ctx.router.url('newmessagespatient'),
    }); 
});

router.get('patient-update', '/update/:id', checkAuth, (ctx) => {
    const { patient } = ctx.state;
    return ctx.render('patients/update', {
        patient,
        patientPath: id => ctx.router.url('patient', id),
        updatePatientPathDataBase: id => ctx.router.url('patient-update-database', id)
    });
})

 
router.post('patient-update-database', '/update/:id', checkAuth, async (ctx) => {
    const { patient, cloudinary } = ctx.state;

    console.log("HOLAAAA MIRAR ACAAAA KING");


    if (patient.name !== ctx.request.body.name) {
        patient.name = ctx.request.body.name;
    }
    if (patient.age !== ctx.request.body.age) {
        patient.age = ctx.request.body.age;
    }
    if (patient.phone !== ctx.request.body.phone) {
        patient.phone = ctx.request.body.phone;
    }
    if (patient.address !== ctx.request.body.address) {
        patient.address = ctx.request.body.address;
    }
    if (patient.city !== ctx.request.body.city) {
        patient.city = ctx.request.body.city;
    }
    if (patient.picture !== ctx.request.body.picture) {
        patient.picture = ctx.request.body.picture;
    }
    if (patient.email !== ctx.request.body.email) {
        patient.email = ctx.request.body.email;
    }
    if (patient.rut !== ctx.request.body.rut) {
        patient.rut = ctx.request.body.rut;
    }
    if (patient.isapre !== ctx.request.body.isapre) {
        patient.isapre = ctx.request.body.isapre;
    }
    if (patient.password !== ctx.request.body.password) {
        patient.password = ctx.request.body.password;
    }

    /* ESTA PARTE ES DE ARCHIVOS */
    // const { picture } = ctx.request.files;
    // if (picture.size > 0) {
    //     const uploadedImage = await cloudinary.uploader.upload(picture.path);
    //     patient.picture = uploadedImage.public_id;
    // }
    /* ################################ */
    await patient.save({ fields: PERMITTED_FIELDS });
    ctx.redirect(ctx.router.url('patient', ctx.state.currentPatient.id));
});

router.get('patient-delete', '/delete/:id', checkAuth, (ctx) => {
    const { patient } = ctx.state;
    return ctx.render('patients/delete', {
        patient,
        patientPath: id => ctx.router.url('patient', id),
        deletePatientPathDataBase: id => ctx.router.url('patient-delete-database', id)
    });
})

router.post('patient-delete-database', 'delete/:id', checkAuth, async (ctx) => {
    const { patient } = ctx.state;
    await patient.destroy();
    ctx.session.currentPatientId = null;
    ctx.redirect('/');
});


module.exports = router;