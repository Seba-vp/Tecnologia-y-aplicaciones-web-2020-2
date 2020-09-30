const KoaRouter = require('koa-router');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
    'idSend',
    'idRecieve',
    'body',
]

router.param('id', async (id, ctx, next) => {
    const message = await ctx.orm.message.findByPk(id);
    if (!message) {
        ctx.throw(404);
    }
    ctx.state.message = message;
    return next();
});

router.get('messages', '/', async (ctx) => {
    const messages = await ctx.orm.message.findAll();
    await ctx.render('messages/index', {
        messages,
        messagePath: id => ctx.router.url('message', id),
        newMessagePath: ctx.router.url('messages-new')
    });
});

router.get('messages-new', '/new', (ctx) => {
    const message = ctx.orm.message.build();
    return ctx.render('messages/new', {
        message,
        createMessagePath: ctx.router.url('messages-create')
    });
})

router.post('messages-create', '/', async (ctx) => {
    const message = ctx.orm.message.build(ctx.request.body);
    message.rolSend = 'Dentist';
    message.rolReceive = 'Pacient';
    message.date = "2020/09/30";
    try {
        await message.save({ fields: PERMITTED_FIELDS });
        ctx.redirect(ctx.router.url('messages'))
    } catch (error) {
        await ctx.render('messages/new', {
            message,
            errors: error.errors,
            createMessagePath: ctx.router.url('messages-create')
        });
    }
});

router.get('message', '/:id', (ctx) => {
    const { message } = ctx.state;
    return ctx.render('messages/show', {
        message,
        deleteMessagePath: id => ctx.router.url('message-delete', id)
    });
});

router.get('message-delete', '/delete/:id', (ctx) => {
    const { message } = ctx.state;
    return ctx.render('messages/delete', {
        message,
        deleteMessagePathDataBase: id => ctx.router.url('message-delete-database', id)
    });
})

router.post('message-delete-database', 'delete/:id', async (ctx) => {
    const { message } = ctx.state;
    await message.destroy();
    ctx.redirect(ctx.router.url('messages'));
});

module.exports = router;