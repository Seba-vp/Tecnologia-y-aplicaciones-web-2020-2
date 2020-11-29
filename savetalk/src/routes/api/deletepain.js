const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.delete('pain-delete', '/delete', async (ctx) => {

    console.log('Acceso')
    console.log(ctx.params)
    console.log(ctx.request.body)

    const { idpain } = ctx.params.idpain;
    const { jwtDecoded: { sub } } = ctx.state;  //Estoy agarrando el atributo "sub" 
    const finalLetter = sub.substr(sub.length - 1);  //Agarro el último caracter de "sub"

    if (finalLetter === "p") {
        const realPatientId = sub.substr(0, sub.length - 1);
        const patient = await ctx.orm.patient.findByPk(realPatientId);
        if (!patient) {
            ctx.throw(404);
        }

        console.log(idpain)

        const pain = await ctx.orm.pain.findByPk(idpain);

        if (!pain) {
            ctx.throw(404);
        }

        painPatient = await pain.getPatient();

        if (patient.id !== painPatient.id) {
            ctx.body = {
                error: 'No puedes eliminar el dolor de otro paciente'
            }
        } else {

            console.log('A punto de eliminar')
            await pain.destroy();
            console.log('Eliminado')

            ctx.body = {
                idpain: idpain,
                message: 'Dolor eliminado exitosamente',
            }

        };

    } else {

        ctx.status = 401;
        ctx.body = {
            error: "Este token NO es para PACIENTE"
        }
    }

});

module.exports = router;