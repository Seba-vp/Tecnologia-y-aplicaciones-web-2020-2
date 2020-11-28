const KoaRouter = require('koa-router');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
    'idSend',
    'chatId',
    'idReceive',
    'rolSend',
    'rolReceive',
    'body',
]
const PROTECTED_PATH_D = [
    '/dentist',
    '/new/dentist',
]

const PROTECTED_PATH_P = [
    '/patient',
    '/new/patient',
]

function checkAuthD(ctx, next) {
    const { currentDentist } = ctx.state;
    if (!currentDentist) ctx.throw(401);
    return next();
}

function checkAuthP(ctx, next) {
    const { currentPatient } = ctx.state;
    if (!currentPatient) ctx.throw(401);
    return next();
}

router.use(PROTECTED_PATH_D, checkAuthD);
router.use(PROTECTED_PATH_P, checkAuthP);

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
    const { dentist } = ctx.state;
    await ctx.render('messages/index', {
        messages,
        dentist,

        messagePath: id => ctx.router.url('message', id),
        newMessagePath: ctx.router.url('messages-new'),
        dentistPath: id => ctx.router.url('dentist', id),
    });
});

router.get('messagesdentist', '/dentist', async (ctx) => {
    const { dentist } = ctx.state;
    const { patient } = ctx.state;

    const messages = await ctx.orm.message.findAll();
    const message = ctx.orm.message.build();
    let messagesSent = [];
    let messagesReceive = [];
    let infoToSendSent = [];
    let infoToSendReceive = [];
    let chatsToSend = [];
    iddentist = await ctx.state.currentDentist.id;
    const ruta = '/dentists/' + String(iddentist)
    for (const message of messages) {
        chatAsociate = await message.getChat();
        patientAsociateChat = await chatAsociate.getPatient();
        if (message.idSend === iddentist && message.rolSend === 'Dentist') {
            messagesSent.push(message)
            newData = {
                message,
                person: patientAsociateChat,
                chat: chatAsociate
            }
            infoToSendSent.push(newData)
        }
        if (message.idReceive === iddentist && message.rolReceive === 'Dentist') {
            messagesReceive.push(message)
            newData = {
                message,
                person: patientAsociateChat,
                chat: chatAsociate
            }
            infoToSendReceive.push(newData)
        }
    }
    await ctx.render('messages/index', {
        ruta,
        dentist,
        patient,
        chatsToSend,
        infoToSendReceive,
        infoToSendSent,
        messages,
        message,
        messagesReceive,
        messagesSent,
        createMessagePath: ctx.router.url('messages-create-dentist'),
        messagePath: id => ctx.router.url('message', id),
        newMessagePath: ctx.router.url('newmessagesdentist'),
        dentistPath: id => ctx.router.url('dentist', id),
    });
});

router.get('messagespatient', '/patient', async (ctx) => {
    const { patient } = ctx.state;
    const messages = await ctx.orm.message.findAll();
    const message = ctx.orm.message.build();
    let messagesSent = [];
    let messagesReceive = [];
    let type = 'Patient';
    let infoToSendReceive = [];
    let infoToSendSent = [];
    let chatsToSend = [];
    idpatient = await ctx.state.currentPatient.id;
    const ruta = '/patients/' + String(idpatient)
    for (const message of messages) {
        chatAsociate = await message.getChat();
        dentistAsociateChat = await chatAsociate.getDentist();
        if (message.idSend === idpatient && message.rolSend === 'Patient') {
            messagesSent.push(message)
            newData = {
                message,
                person: dentistAsociateChat,
                chat: chatAsociate
            }
            infoToSendSent.push(newData)
        }
        if (message.idReceive === idpatient && message.rolReceive === 'Patient') {
            messagesReceive.push(message)
            newData = {
                message,
                person: dentistAsociateChat,
                chat: chatAsociate
            }
            infoToSendReceive.push(newData)
        }
    }
    await ctx.render('messages/index', {
        ruta,
        patient,
        messages,
        type,
        chatsToSend,
        message,
        infoToSendReceive,
        infoToSendSent,
        messagesReceive,
        messagesSent,
        createMessagePath: ctx.router.url('messages-create'),
        messagePath: id => ctx.router.url('message', id),
        newMessagePath: ctx.router.url('newmessagespatient'),
        patientPath: id => ctx.router.url('patient', id),
    });
});


router.get('newmessagesdentist', '/new/dentist', async (ctx) => {
    const { dentist } = ctx.state;
    const messages = await ctx.orm.message.findAll();
    const message = ctx.orm.message.build();
    let messagesSent = [];
    let type = 'Dentist';
    let messagesReceive = [];
    iddentist = ctx.state.currentDentist.id;
    const ruta = '/dentists/' + String(iddentist)
    messages.forEach(message => {
        if (message.idSend === iddentist && message.rolSend === 'Dentist') {
            messagesSent.push(message)
        }
        if (message.idReceive === iddentist && message.rolReceive === 'Dentist') {
            messagesReceive.push(message)
        }
    })

    const chats = await ctx.state.currentDentist.getChats();

    let chatsToSend = [];

    for (const element of chats) {
        if (element.block === false) {
            person = await element.getPatient();
            data = {
                'chat': element.id,
                'person': person
            }
            chatsToSend.push(data);
        }
    };

    await ctx.render('messages/new', {
        ruta,
        dentist,
        type,
        iddentist,
        messages,
        chatsToSend,
        message,
        messagesReceive,
        messagesSent,
        createMessagePath: ctx.router.url('messages-create-dentist'),
        messagePath: id => ctx.router.url('message', id),

        dentistPath: id => ctx.router.url('dentist', id),
        newMessagePath: ctx.router.url('newmessagesdentist'),

    });
});


router.get('newmessagespatient', '/new/patient', async (ctx) => {
    const { patient } = ctx.state;
    const messages = await ctx.orm.message.findAll();
    const message = ctx.orm.message.build();
    let messagesSent = [];
    let type = 'Patient';
    let messagesReceive = [];
    idpatient = ctx.state.currentPatient.id;
    const ruta = '/patients/' + String(idpatient);
    messages.forEach(message => {
        if (message.idSend === idpatient && message.rolSend === 'Patient') {
            messagesSent.push(message)
        }
        if (message.idReceive === idpatient && message.rolReceive === 'Patient') {
            messagesReceive.push(message)
        }
    })

    const chats = await ctx.state.currentPatient.getChats();

    let chatsToSend = [];

    for (const element of chats) {
        if (element.block === false) {
            person = await element.getDentist();
            data = {
                'chat': element.id,
                'person': person
            }
            chatsToSend.push(data);
        };
    };

    await ctx.render('messages/new', {
        ruta,
        patient,
        idpatient,
        type,
        messages,
        message,
        chatsToSend,
        messagesReceive,
        messagesSent,
        createMessagePath: ctx.router.url('messages-create-patient'),
        messagePath: id => ctx.router.url('message', id),
        patientPath: id => ctx.router.url('patient', id),
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
    message.idSend = ctx.state.currentDentist.id;
    message.rolReceive = 'Patient';
    message.rolSend = 'Dentist';
    iddentist = await ctx.state.currentDentist.id;
    const ruta = '/dentists/' + String(iddentist)
    chatsToSend = [];
    chats = await ctx.state.currentDentist.getChats();
    for (const element of chats) {
        if (element.id.toString() === ctx.request.body.chatId) {
            message.idReceive = element.patientId
        }
    }
    try {
        await message.save({ fields: PERMITTED_FIELDS });
        ctx.redirect(ctx.router.url('messagesdentist'))
    } catch (error) {
        console.log('Cae en el error')
        await ctx.render('messages/new', {
            message,
            ruta,
            errors: error.errors,
            createMessagePath: ctx.router.url('messages-create-dentist')
        });
    }
});

router.post('messages-create-patient', '/patient', async (ctx) => {
    const message = ctx.orm.message.build(ctx.request.body);
    const { patient } = ctx.state;
    idpatient = await ctx.state.currentPatient.id;
    const ruta = '/patients/' + String(idpatient)
    message.idSend = ctx.state.currentPatient.id;
    message.rolReceive = 'Dentist';
    message.rolSend = 'Patient';
    chatsToSend = [];
    chats = await ctx.state.currentPatient.getChats();
    for (const element of chats) {
        if (element.id.toString() === ctx.request.body.chatId) {
            message.idReceive = element.dentistId
        }
    }
    try {
        await message.save({ fields: PERMITTED_FIELDS });
        ctx.redirect(ctx.router.url('messagespatient'))
    } catch (error) {
        await ctx.render('messages/new', {
            ruta,
            patient,
            idpatient,
            message,
            errors: error.errors,
            patientPath: id => ctx.router.url('patient', id),
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