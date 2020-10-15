const KoaRouter = require('koa-router');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
    'idSend',
    'idReceive',
    'rolSend',
    'rolReceive',
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

router.get('messagesdentist', '/dentist', async (ctx) => {
    const { dentist } = ctx.state;
    const { patient } = ctx.state;
    const messages = await ctx.orm.message.findAll();
    const message = ctx.orm.message.build();
    let messagesSent = [];
    let messagesReceive = [];
    let chatsToSend = [];
    iddentist = ctx.state.currentDentist.id;
    messages.forEach(message => {
        if (message.idSend === iddentist && message.rolSend === 'Dentist') {
            messagesSent.push(message)
        }
        if (message.idReceive === iddentist && message.rolReceive === 'Dentist') {
            messagesReceive.push(message)
        }
    })
    await ctx.render('messages/index', {
        dentist,
        patient,
        chatsToSend,
        messages,
        message,
        messagesReceive,
        messagesSent,
        createMessagePath: ctx.router.url('messages-create-dentist'),
        messagePath: id => ctx.router.url('message', id),
        newMessagePath: ctx.router.url('newmessagesdentist'),
    });
});

router.get('messagespatient', '/patient', async (ctx) => {
    const { patient } = ctx.state;
    const messages = await ctx.orm.message.findAll();
    const message = ctx.orm.message.build();
    let messagesSent = [];
    let messagesReceive = [];
    let chatsToSend = [];
    idpatient = ctx.state.currentPatient.id;
    messages.forEach(message => {
        if (message.idSend === idpatient && message.rolSend === 'Patient') {
            messagesSent.push(message)
        }
        if (message.idReceive === idpatient && message.rolReceive === 'Patient') {
            messagesReceive.push(message)
        }
    })
    await ctx.render('messages/index', {
        patient,
        messages,
        chatsToSend,
        message,
        messagesReceive,
        messagesSent,
        createMessagePath: ctx.router.url('messages-create'),
        messagePath: id => ctx.router.url('message', id),
        newMessagePath: ctx.router.url('newmessagespatient'),
    });
});


router.get('newmessagesdentist', '/new/dentist', async (ctx) => {
    const { dentist } = ctx.state;
    const messages = await ctx.orm.message.findAll();
    const message = ctx.orm.message.build();
    let messagesSent = [];
    let messagesReceive = [];
    iddentist = ctx.state.currentDentist.id;
    messages.forEach(message => {
        if (message.idSend === iddentist && message.rolSend === 'Dentist') {
            messagesSent.push(message)
        }
        if (message.idReceive === iddentist && message.rolReceive === 'Dentist') {
            messagesReceive.push(message)
        }
    })

    const chats = await ctx.orm.chat.findAll();

    let chatsToSend = [];

    chats.forEach(element => {
        if (element.dentistId === iddentist) {
            chatsToSend.push(element.patientId);
        }
    });

    await ctx.render('messages/new', {
        dentist,
        messages,
        chatsToSend,
        message,
        messagesReceive,
        messagesSent,
        createMessagePath: ctx.router.url('messages-create-dentist'),
        messagePath: id => ctx.router.url('message', id),
        newMessagePath: ctx.router.url('newmessagesdentist'),
    });
});


router.get('newmessagespatient', '/new/patient', async (ctx) => {
    const { patient } = ctx.state;
    const messages = await ctx.orm.message.findAll();
    const message = ctx.orm.message.build();
    let messagesSent = [];
    let messagesReceive = [];
    idpatient = ctx.state.currentPatient.id;
    messages.forEach(message => {
        if (message.idSend === idpatient && message.rolSend === 'Patient') {
            messagesSent.push(message)
        }
        if (message.idReceive === idpatient && message.rolReceive === 'Patient') {
            messagesReceive.push(message)
        }
    })

    const chats = await ctx.orm.chat.findAll();

    let chatsToSend = [];

    chats.forEach(element => {
        if (element.patientId === idpatient) {
            chatsToSend.push(element.dentistId);
        }
    });

    await ctx.render('messages/new', {
        patient,
        messages,
        message,
        chatsToSend,
        messagesReceive,
        messagesSent,
        createMessagePath: ctx.router.url('messages-create-patient'),
        messagePath: id => ctx.router.url('message', id),
        newMessagePath: ctx.router.url('newmessagespatient'),
    });
});


//router.get('messagesnewdentist', '/new', async (ctx) => {
//    const message = ctx.orm.message.build();
//    await ctx.render('messages/new', {
//        message,
//        createMessagePath: ctx.router.url('messages-create')
//    });
//})

//router.get('messages-new', '/new', (ctx) => {
//    const message = ctx.orm.message.build();
//    return ctx.render('messages/new', {
//        message,
//        createMessagePath: ctx.router.url('messages-create')
//    });
//})

router.post('messages-create-dentist', '/dentist', async (ctx) => {
    const message = ctx.orm.message.build(ctx.request.body);
    console.log(ctx.request.body)
    message.idSend = ctx.state.currentDentist.id;
    message.rolReceive = 'Patient';
    message.rolSend = 'Dentist';
    chatsToSend = [];
    try {
        await message.save({ fields: PERMITTED_FIELDS });
        ctx.redirect(ctx.router.url('messagesdentist'))
    } catch (error) {
        await ctx.render('messages/new', {
            message,
            errors: error.errors,
            createMessagePath: ctx.router.url('messages-create-dentist')
        });
    }
});

router.post('messages-create-patient', '/patient', async (ctx) => {
    const message = ctx.orm.message.build(ctx.request.body);
    message.idSend = ctx.state.currentPatient.id;
    message.rolReceive = 'Dentist';
    message.rolSend = 'Patient';
    chatsToSend = [];
    try {
        await message.save({ fields: PERMITTED_FIELDS });
        ctx.redirect(ctx.router.url('messagespatient'))
    } catch (error) {
        await ctx.render('messages/new', {
            message,
            errors: error.errors,
            createMessagePath: ctx.router.url('messages-create-patient')
        });
    }
});
/*
router.post('messages-create', '/patient/:patientid', async (ctx) => {
    const message = ctx.orm.message.build(ctx.request.body);
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
*/
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