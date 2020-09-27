const KoaRouter = require('koa-router');

const router = new KoaRouter();

const PERMITED_FIELDS = [
    'idDentist',
    'idPacient'
];

router.param('id', async (id, ctx, next) => {
    const chat = await ctx.orm.chat.findByPk(id);
    if (!chat) {
        ctx.throw(404);
    }
    ctx.state.chat = chat;
    return next();
});

router.get('chats', '/', async (ctx) => {
    const chats = await ctx.orm.chat.findAll();
    await ctx.render('chats/index', {
        chats,
        chatsPath: id => ctx.router.url('chat', id),
        newChatsPath: ctx.router.url('chats-new'),
    });
});

router.get('chats-new', '/new', (ctx) => {
    return ctx.render('chats/new', {
        createChatPath: ctx.router.url('chats-create'),
    });
})

router.post('chats-create', '/', async (ctx) => {
    const chat = ctx.orm.chat.build(ctx.request.body)
    await chat.save({ fields: PERMITED_FIELDS });
    ctx.redirect(ctx.router.url('chats'));
})

router.get('chat', '/:id', (ctx) => {
    const { chat } = ctx.state;
    return ctx.render('chats/show', {
        chat,
        deleteChatPath: id => ctx.router.url('chat-delete', id)
    });
});

router.get('chat-delete', '/delete/:id', (ctx) => {
    const chat = ctx.state;
    return ctx.render('chats/delete', {
        chat,
        deleteChatPathDataBase: id => ctx.router.url('chat-delete-database', id)
    });
})

router.post('chat-delete-database', 'delete/:id', async (ctx) => {
    const chat = ctx.state;
    await chat.destroy();
    ctx.redirect(ctx.router.url('chats'));
});

module.exports = router;