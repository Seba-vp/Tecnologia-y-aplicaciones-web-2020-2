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

router.post('message-new', '/new', async (ctx) => {

    const { jwtDecoded: {sub} } = ctx.state;  //Estoy agarrando el atributo "sub" 
    const finalLetter = sub.substr(sub.length - 1);  //Agarro el último caracter de "sub"
    
    if (finalLetter === "p") {
        const realPatientId = sub.substr(0, sub.length - 1);
        const patient = await ctx.orm.patient.findByPk(realPatientId);
        
        if (!patient) {
            ctx.throw(404);
        }
        
        // Obtengo los atributos del mensaje, y agrego el id de patient
        const attributes = {
            ...ctx.request.body,
           idSend: patient.id,
           rolSend: 'Patient',
           rolReceive: 'Dentist'
        };
        const message = ctx.orm.message.build(attributes);
        try {
            await message.save({ fields: PERMITTED_FIELDS });
            ctx.body = {
                notice: "Mensaje creado correctamente (Desde paciente)"
            }        //Lo insertamos en la base de datos
        } catch (error) {
            ctx.body = {
                error: "No se pudo guardar el mensaje en BDD"
            }
            }

        ctx.body = {
            notice: "Mensaje creado correctamente"
        }
        
    } 
    
    
    else if (finalLetter === "d") {
        const realDentistId = sub.substr(0, sub.length - 1);
        const dentist = await ctx.orm.dentist.findByPk(realDentistId);
        
        if (!dentist) {
            ctx.throw(404);
        }
    
        // Obtengo los atributos del mensaje, y agrego el id de dentista
        const attributes = {
            ...ctx.request.body,
           idSend: dentist.id,
           rolSend: 'Dentist',
           rolReceive: 'Patient'
        };
        const message = ctx.orm.message.build(attributes);
        try {
            await message.save({ fields: PERMITTED_FIELDS });
            ctx.body = {
                notice: "Mensaje creado correctamente (Desde Dentista)"
            }        //Lo insertamos en la base de datos
        } catch (error) {
            ctx.body = {
                error: "No se pudo guardar el mensaje en BDD"
            }
            }

        ctx.body = {
            notice: "Mensaje creado correctamente"
        }
        
    }else {

        ctx.status = 401;
        ctx.body = {
            error: "Este token NO es valido para paciente ni dentista"
        }
    }

});

module.exports = router;