const KoaRouter = require('koa-router');
const notification = require('../models/notification');

const router = new KoaRouter();

//Nuevo
const PERMITED_FIELDS = [
    'kind',
    'user_id',
    'description',
    'email',
];
// hasta aca

router.param('id', async (id, ctx, next) => {
    const notification = await ctx.orm.notification.findByPk(id);
    if (!notification) {
        ctx.throw(404);
    }
    ctx.state.notification = notification;
    return next();
});

router.get('notifications', '/', async (ctx) => {
    const notifications = await ctx.orm.notification.findAll();
    await ctx.render('notifications/index', {
        notifications,
        notificationPath: id => ctx.router.url('notification', id),
//Lo de abajo es nuevo
        newNotificationPath: ctx.router.url('notifications-new'),
    });
});

router.get('notifications-new', '/new', (ctx) => {
    const notification = ctx.orm.notification.build();
    return ctx.render('notifications/new',{
        notification,
        createNotificationPath: ctx.router.url('notifications-create')
    });
})

router.post('notifications-create','/', async (ctx)=>{
    const notification = ctx.orm.notification.build(ctx.request.body);

    try{
    await notification.save({fields:PERMITED_FIELDS});
    ctx.redirect(ctx.router.url('notifications'));
    }catch (error) {
        await ctx.render('notifications/new',{
            notification,
            errors: error.errors,
            createNotificationPath: ctx.router.url('notifications-create'),
        });
    }
})

//Hasta aca lo nuevo

router.get('notification', '/:id', (ctx) => {
    const {notification} = ctx.state;
    return ctx.render('notifications/show', {
        notification,
        deleteNotificationPath: id => ctx.router.url('notification-delete', id)
    });
});

// monton de if's 

router.get('notification-delete', '/delete/:id', (ctx) => {
    const {notification} = ctx.state;
    return ctx.render('notifications/delete', {
        notification,
        deleteNotificationPathDataBase: id => ctx.router.url('notification-delete-database', id)
    });
})

router.post('notification-delete-database', 'delete/:id', async (ctx) => {
    const {notification} = ctx.state;
    await notification.destroy();
    ctx.redirect(ctx.router.url('notifications'));
});

module.exports = router;