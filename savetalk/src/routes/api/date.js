const KoaRouter = require('koa-router');
const router = new KoaRouter();


const PERMITTED_FIELDS = [
    'painId',
    'dentistId',
    'schedule',
    'price',
    'state',
    'message'
]

router.post('date-new', '/new', async (ctx) => {

    const { jwtDecoded: {sub} } = ctx.state;  //Estoy agarrando el atributo "sub" 
    const finalLetter = sub.substr(sub.length - 1);  //Agarro el último caracter de "sub"
    
    if (finalLetter === "d") {
        const realDentistId = sub.substr(0, sub.length - 1);
        const dentist = await ctx.orm.patient.findByPk(realDentistId);
        if (!dentist) {
            ctx.throw(404);
            ctx.body = {
                error: "No existe dentista"
            }
        }
        
        // Obtengo los atributos del dolor, y agrego el id de patient
        const attributes = {
            ...ctx.request.body,
            dentistId: dentist.id,
            state: '0',
        }
        const date = ctx.orm.date.build(attributes);
        try {
            await date.save({ fields: PERMITTED_FIELDS });
            ctx.body = {
                notice: "Cita creada correctamente"
            }        //Lo insertamos en la base de datos
        } catch (error) {
            ctx.body = {
                error: "No se pudo guardar la cita en base de datos"
            }
            }

        ctx.body = {
            notice: "Cita creada correctamente"
        }
        
    } else {

        ctx.status = 401;
        ctx.body = {
            error: "Este token NO es para Dentista"
        }
    }

});

module.exports = router;