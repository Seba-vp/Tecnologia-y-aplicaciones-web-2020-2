const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.get('pains-data', '/pains', async (ctx) => {

    const { jwtDecoded: { sub } } = ctx.state;  //Estoy agarrando el atributo "sub" 
    const finalLetter = sub.substr(sub.length - 1);  //Agarro el último caracter de "sub"

    if (finalLetter === "p") {
        const realPatientId = sub.substr(0, sub.length - 1);
        const patient = await ctx.orm.patient.findByPk(realPatientId);
        if (!patient) {
            ctx.throw(404);
        }

        const pains = await patient.getPains();

        if (pains.length === 0) {
            ctx.body = {
                error: 'No tienes dolores'
            }
        } else {
            ctx.body = {
                pains: pains
            }
        }

    } else {

        ctx.status = 401;
        ctx.body = {
            error: "Este token NO es para PACIENTE"
        }
    }

});

module.exports = router;