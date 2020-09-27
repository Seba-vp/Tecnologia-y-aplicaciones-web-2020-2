const KoaRouter = require('koa-router');

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
    return ctx.render('notifications/new',{
        createNotificationPath: ctx.router.url('notifications-create')
    });
})

router.post('notifications-create','/', async (ctx)=>{
    const notification = ctx.orm.notification.build(ctx.request.body);
    await notification.save({fields:PERMITED_FIELDS});
    ctx.redirect(ctx.router.url('notifications'));
})

//Hasta aca lo nuevo

router.get('notification', '/:id', (ctx) => {
    const {notification} = ctx.state;
    return ctx.render('notifications/show', {notification});
});

module.exports = router;