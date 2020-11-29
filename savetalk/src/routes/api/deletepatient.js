const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.delete('patient-delete', '/delete', async (ctx) => {

    const { jwtDecoded: { sub } } = ctx.state;  //Estoy agarrando el atributo "sub" 
    const finalLetter = sub.substr(sub.length - 1);  //Agarro el último caracter de "sub"

    if (finalLetter === "p") {
        const realPatientId = sub.substr(0, sub.length - 1);
        const patient = await ctx.orm.patient.findByPk(realPatientId);
        if (!patient) {
            ctx.throw(404);
        }

        await patient.destroy();

        ctx.body = {
            message: 'PACIENTE ELIMINADO',
        }

    } else {

        ctx.status = 401;
        ctx.body = {
            error: "Este token NO es para PACIENTE"
        }
    }

});

module.exports = router;