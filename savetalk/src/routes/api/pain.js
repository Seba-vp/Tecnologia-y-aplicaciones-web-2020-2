const KoaRouter = require('koa-router');
const router = new KoaRouter();


const PERMITTED_FIELDS = [
    'name',
    'description',
    'category',
    'patientId'
]

router.post('pain-new', '/new', async (ctx) => {

    const { jwtDecoded: {sub} } = ctx.state;  //Estoy agarrando el atributo "sub" 
    const finalLetter = sub.substr(sub.length - 1);  //Agarro el último caracter de "sub"
    
    if (finalLetter === "p") {
        const realPatientId = sub.substr(0, sub.length - 1);
        const patient = await ctx.orm.patient.findByPk(realPatientId);
        
        if (!patient) {
            ctx.throw(404);
            ctx.body = {
                error: "Este token NO es para PACIENTE"
            }
        }
        // Obtengo los atributos del dolor, y agrego el id de patient
        const attributes = {
            ...ctx.request.body,
            patientId: patient.id
        }
        const pain = ctx.orm.pain.build(attributes);
        try {
            await pain.save({ fields: PERMITTED_FIELDS });  
            ctx.body = {
                notice: "Dolor creado correctamente"
            }        //Lo insertamos en la base de datos
        } catch (error) {
            ctx.body = {
                error: "No se pudo guardar dolor en base de datos"
            }
            }

        ctx.body = {
            notice: "Dolor creado correctamente"
        }
        
    } else {

        ctx.status = 401;
        ctx.body = {
            error: "Este token NO es para PACIENTE"
        }
    }

});

router.get('pain-all', '/all', async (ctx) => {

    const { jwtDecoded: {sub} } = ctx.state;  //Estoy agarrando el atributo "sub" 
    const finalLetter = sub.substr(sub.length - 1);  //Agarro el último caracter de "sub"

    if (finalLetter === "d") {
        const realDentistId = sub.substr(0, sub.length - 1);
        const dentist = await ctx.orm.dentist.findByPk(realDentistId);

        if (!dentist) {
            ctx.throw(404);
            ctx.body = {
                error: "Dentista no encontrado"
            }    
        }
        const pains = await ctx.orm.pain.findAll({ include: ctx.orm.date });

        let painsToSend = [];
    
        pains.forEach(pain => {
            let painHasAConfirmDate = false;
    
            pain.dates.forEach(date => {
    
                if (date.state === 1 || date.state === 2) {
                    painHasAConfirmDate = true;
                }
    
            });
    
            if (painHasAConfirmDate === false) {
                painsToSend.push(pain);
            }
    
        });


        ctx.body = {
            pains: painsToSend
        }
        
    } else {

        ctx.status = 401;
        ctx.body = {
            error: "Este token NO es para Dentista"
        }
    }

});

module.exports = router;