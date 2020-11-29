const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.delete('dentist-delete', '/delete', async (ctx) => {

    const { jwtDecoded: { sub } } = ctx.state;  //Estoy agarrando el atributo "sub" 
    const finalLetter = sub.substr(sub.length - 1);  //Agarro el último caracter de "sub"

    if (finalLetter === "d") {
        const realDentistId = sub.substr(0, sub.length - 1);
        const dentist = await ctx.orm.dentist.findByPk(realDentistId);
        if (!dentist) {
            ctx.throw(404);
        }

        await dentist.destroy();

        ctx.body = {
            message: 'DENTISTA ELIMINADO',
        };

    } else {

        ctx.status = 401;
        ctx.body = {
            error: "Este token NO es para DENTISTA"
        }
    }

});

module.exports = router;