const KoaRouter = require('koa-router');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
    'idDentist',
    'idInjury',
    'daterequest',
    'datesmeeting',
    'confirmed',
    'price',
    'message'
]

router.param('id', async (id, ctx, next) => {
    const carerequest = await ctx.orm.carerequest.findByPk(id);
    if (!carerequest) {
        ctx.throw(404);
    }
    ctx.state.carerequest = carerequest;
    return next();
});

router.get('carerequests', '/', async (ctx) => {
    const carerequest = await ctx.orm.carerequest.findAll();
    await ctx.render('carerequests/index', {
        carerequest,
        carerequestPath: id => ctx.router.url('carerequest', id),
        newCarerequestPath: ctx.router.url('carerequest-new')
    });
});

router.get('carerequest-new', '/new', (ctx) => {
    const carerequest = ctx.orm.carerequest.build();
    return ctx.render('carerequests/new', {
        carerequest,
        createCarerequestPath: ctx.router.url('carerequests-create')
    });
})

router.post('carerequests-create', '/', async (ctx) => {
    const carerequest = ctx.orm.carerequest.build(ctx.request.body);
    try {
        await carerequest.save({ fields: PERMITTED_FIELDS });
        ctx.redirect(ctx.router.url('carerequests'))
    } catch (error) {
        await ctx.render('carerequests/new', {
            carerequest,
            errors: error.errors,
            createCarerequestPath: ctx.router.url('carerequests-create')
        });
    }
});

router.get('carerequest', '/:id', (ctx) => {
    const { carerequest } = ctx.state;
    return ctx.render('carerequests/show', {
        carerequest,
        updateCarerequestPath: id => ctx.router.url('carerequest-update', id),
        deleteCarerequestPath: id => ctx.router.url('carerequest-delete', id)
    });
});

router.get('carerequest-update', '/update/:id', (ctx) => {
    const { carerequest } = ctx.state;
    return ctx.render('carerequests/update', {
        carerequest,
        updateCarerequestPathDataBase: id => ctx.router.url('carerequest-update-database', id)
    });
})

router.post('carerequest-update-database', 'update/:id', async (ctx) => {
    const { carerequest } = ctx.state;
    try {
        if (carerequest.datesmeeting !== ctx.request.body.datesmeeting) {
            carerequest.datesmeeting = ctx.request.body.datesmeeting;
        }
        if (carerequest.price !== ctx.request.body.price) {
            carerequest.price = ctx.request.body.price;
        }
        if (carerequest.message !== ctx.request.body.message) {
            carerequest.message = ctx.request.body.message;
        }
        await carerequest.save({ fields: PERMITTED_FIELDS });
        ctx.redirect(ctx.router.url('carerequests'));
    } catch (error) {
        await ctx.render('carerequests/update', {
            carerequest,
            errors: error.errors,
            updateCarerequestPathDataBase: id => ctx.router.url('carerequest-update-database', id)
        });
    }
});

router.get('carerequest-delete', '/delete/:id', (ctx) => {
    const { carerequest } = ctx.state;
    return ctx.render('carerequests/delete', {
        carerequest,
        deleteCarerequestPathDataBase: id => ctx.router.url('carerequest-delete-database', id)
    });
})

router.post('carerequest-delete-database', 'delete/:id', async (ctx) => {
    const { carerequest } = ctx.state;
    await carerequest.destroy();
    ctx.redirect(ctx.router.url('carerequests'));
});

module.exports = router;