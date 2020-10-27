const KoaRouter = require('koa-router');

const router = new KoaRouter();

const PERMITED_FIELDS = [
    'dentistId',
    'patientId',
    'block'
];

const PERMITED_FIELDS_UPDATE = [
    'block'
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
    //const chats = await ctx.orm.chat.findAll();
    //await ctx.render('chats/index', {
    //    chats,
    //    newChatsPath: ctx.router.url('chats-new'),
    //});
    const { dentist } = ctx.state;
    const chats = await ctx.orm.chat.findAll();

    idpatient = ctx.state.currentPatient.id;

    let chatsToSend = [];
    let chatsPersonToSend = [];
    let chatsGet = await ctx.state.currentPatient.getChats();

    for (const element of chatsGet) {
        person = await element.getDentist();
        data = {
            'chat': element,
            'person': person
        }
        chatsPersonToSend.push(data)
    }

    chats.forEach(chat => {
        if (chat.patientId === idpatient) {
            chatsToSend.push(chat);
        }
    });
    await ctx.render('chats/indexpatient', {
        chatsToSend,
        chatsPersonToSend,
        dentist,
        chatsPath: id => ctx.router.url('chat', id),
        updateChatPath: id => ctx.router.url('chat-update', id),
        deleteChatPath: id => ctx.router.url('chat-delete', id),
        // chatPath: (idchat, iddentist) => ctx.router.url('dentistChat', idchat, iddentist),
    });
});


router.get('chats-dentist', '/:dentistid', async (ctx) => {
    const { dentist } = ctx.state;
    const { chat } = ctx.state;
    const chats = await ctx.orm.chat.findAll();

    iddentist = ctx.state.currentDentist.id;

    let chatsToSend = [];
    let chatsPersonToSend = [];
    let chatsGet = await ctx.state.currentDentist.getChats();

    for (const element of chatsGet) {
        person = await element.getPatient();
        data = {
            'chat': element,
            'person': person
        }
        chatsPersonToSend.push(data)
    }

    chats.forEach(element => {
        if (element.dentistId === iddentist) {
            chatsToSend.push(element);
        }
    });
    await ctx.render('chats/indexdentist', {
        chatsToSend,
        chatsPersonToSend,
        dentist,
        chat,
        updateChatPath: id => ctx.router.url('chat-update', id),
        deleteChatPath: id => ctx.router.url('chat-delete', id),
        chatsPath: id => ctx.router.url('chat', id)
        // chatPath: (idchat, iddentist) => ctx.router.url('dentistChat', idchat, iddentist),
    });
});

router.get('chats-patient', '/:patientid', async (ctx) => {
    const { patient } = ctx.state;
    const { chat } = ctx.state;
    const chats = await ctx.orm.chat.findAll();

    idpatient = ctx.state.currentPatient.id;

    let chatsToSend = [];
    let chatsPersonToSend = [];
    let chatsGet = await ctx.state.currentPatient.getChats();

    for (const element of chatsGet) {
        person = await element.getDentist();
        data = {
            'chat': element,
            'person': person
        }
        chatsPersonToSend.push(data)
    }

    chats.forEach(element => {
        if (element.patientId === idpatient) {
            chatsToSend.push(element);
        }
    });
    await ctx.render('chats/indexpatient', {
        chatsToSend,
        chatsPersonToSend,
        patient,
        chat,
        // updateChatPath: id => ctx.router.url('chat-update', id),
        // deleteChatPath: id => ctx.router.url('chat-delete', id),
        // chatsPath: id => ctx.router.url('chat', id)
        // chatPath: (idchat, iddentist) => ctx.router.url('dentistChat', idchat, iddentist),
    });
});

router.get('chats-new', '/new', (ctx) => {
    const chat = ctx.orm.chat.build();
    return ctx.render('chats/new', {
        chat,
        createChatPath: ctx.router.url('chats-create'),
    });
})

router.post('chats-create', '/', async (ctx) => {
    const chat = ctx.orm.chat.build(ctx.request.body);
    chat.block = false
    try {
        await chat.save({ fields: PERMITED_FIELDS });
        ctx.redirect(ctx.router.url('chats'));
    } catch (error) {
        await ctx.render('chats/new', {
            chat,
            errors: error.errors,
            createChatPath: ctx.router.url('chats-create')
        });
    }
})

router.get('chat', '/:id', (ctx) => {
    const { chat } = ctx.state;
    return ctx.render('chats/show', {
        chat,
        updateChatPath: id => ctx.router.url('chat-update', id),
        deleteChatPath: id => ctx.router.url('chat-delete', id)
    });
});

router.get('chat-update', '/update/:id', (ctx) => {
    const { chat } = ctx.state;
    return ctx.render('chats/update', {
        chat,
        updateChatPathDataBase: id => ctx.router.url('chat-update-database', id)
    });
})

router.post('chat-update-database', 'update/:id', async (ctx) => {
    const { chat } = ctx.state;
    try {
        if (chat.block !== ctx.request.body.block) {
            chat.block = ctx.request.body.block;
        }
        await chat.save({ fields: PERMITED_FIELDS_UPDATE });
        ctx.redirect(ctx.router.url('dentist', ctx.state.currentDentist.id));
    } catch (error) {
        await ctx.render('chats/update', {
            chat,
            errors: error.errors,
            updateChatPathDataBase: id => ctx.router.url('chat-update-database', id)
        });
    }
});

router.get('chat-delete', '/delete/:id', (ctx) => {
    const { chat } = ctx.state;
    return ctx.render('chats/delete', {
        chat,
        deleteChatPathDataBase: id => ctx.router.url('chat-delete-database', id)
    });
})

router.post('chat-delete-database', 'delete/:id', async (ctx) => {
    const { chat } = ctx.state;
    await chat.destroy();
    ctx.redirect(ctx.router.url('chats'));
});

module.exports = router;