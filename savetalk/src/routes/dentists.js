const KoaRouter = require('koa-router');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
    'kind',
    'name',
    'phone',
    'address',
    'city',
    'picture',
    'mail',
    'rut',
    'speciality',
    'university',
    'year'
]


router.param('id', async (id, ctx, next) => {
    const dentist = await ctx.orm.dentist.findByPk(id);
    if (!dentist) {
        ctx.throw(404);
    }
    ctx.state.dentist = dentist;
    return next();
});

router.get('dentists', '/', async (ctx) => {
    const dentists = await ctx.orm.dentist.findAll();
    await ctx.render('dentists/index', {
        dentists,
        dentistPath: id => ctx.router.url('dentist', id),
        newDentistPath: ctx.router.url('dentists-new')
    });
});

router.get('dentists-new', '/new', (ctx) => {
    const dentist = ctx.orm.dentist.build();
    return ctx.render('dentists/new',{
        dentist,
        createDentistPath: ctx.router.url('dentists-create')
    });
})

router.post('dentists-create', '/', async (ctx) => {
    const dentist = ctx.orm.dentist.build(ctx.request.body);   //Lo creamos
    try {
        await dentist.save({ fields: PERMITTED_FIELDS });          //Lo insertamos en la base de datos
        ctx.redirect(ctx.router.url('dentists'))
    } catch (error) {
        await ctx.render('dentists/new', {
            dentist,
            errors: error.errors,
            createDentistPath: ctx.router.url('dentists-create')
        });
    }
});

router.get('dentist', '/:id', (ctx) => {
    const {dentist} = ctx.state;
    return ctx.render('dentists/show', {
        dentist,
        updateDentistPath: id => ctx.router.url('dentist-update', id),
        deleteDentistPath: id => ctx.router.url('dentist-delete', id)
    });
});

router.get('dentist-update', '/update/:id', (ctx) => {
    const {dentist} = ctx.state;
    return ctx.render('dentists/update', {
        dentist,
        updateDentistPathDataBase: id => ctx.router.url('dentist-update-database', id)
    });
})

router.post('dentist-update-database', 'update/:id', async (ctx) => {
    const {dentist} = ctx.state;

    if (dentist.name !== ctx.request.body.name) {
        dentist.name = ctx.request.body.name;
    }
    if (dentist.year !== ctx.request.body.year) {
        dentist.year = ctx.request.body.year;
    }
    if (dentist.phone !== ctx.request.body.phone) {
        dentist.phone = ctx.request.body.phone;
    }
    if (dentist.address !== ctx.request.body.address) {
        dentist.address = ctx.request.body.address;
    }
    if (dentist.city !== ctx.request.body.city) {
        dentist.city = ctx.request.body.city;
    }
    if (dentist.picture !== ctx.request.body.picture) {
        dentist.picture = ctx.request.body.picture;
    }
    if (dentist.mail !== ctx.request.body.mail) {
        dentist.mail = ctx.request.body.mail;
    }
    if (dentist.rut !== ctx.request.body.rut) {
        dentist.rut = ctx.request.body.rut;
    }
    if (dentist.kind !== ctx.request.body.kind) {
        dentist.kind = ctx.request.body.kind;
    }
    if (dentist.speciality !== ctx.request.body.speciality) {
        dentist.speciality = ctx.request.body.speciality
    }
    if (dentist.university !== ctx.request.body.university) {
        dentist.university = ctx.request.body.university
    }

    await dentist.save({ fields: PERMITTED_FIELDS });
    ctx.redirect(ctx.router.url('dentists'));
});

router.get('dentist-delete', '/delete/:id', (ctx) => {
    const {dentist} = ctx.state;
    return ctx.render('dentists/delete', {
        dentist,
        deleteDentistPathDataBase: id => ctx.router.url('dentist-delete-database', id)
    });
})

router.post('dentist-delete-database', 'delete/:id', async (ctx) => {
    const {dentist} = ctx.state;
    await dentist.destroy();
    ctx.redirect(ctx.router.url('dentists'));
});

module.exports = router;