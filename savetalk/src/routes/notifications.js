const KoaRouter = require('koa-router');

const router = new KoaRouter();

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
        notificationPath: id => ctx.router.url('notification', id)
    });
});

router.get('notification', '/:id', (ctx) => {
    const {notification} = ctx.state;
    return ctx.render('notifications/show', {notification});
});

module.exports = router;