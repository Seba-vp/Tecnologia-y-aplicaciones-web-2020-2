const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.get('patient-data', '/data', async (ctx) => {

    const { jwtDecoded: {sub} } = ctx.state;  //Estoy agarrando el atributo "sub" 
    const finalLetter = sub.substr(sub.length - 1);  //Agarro el último caracter de "sub"

    if (finalLetter === "p") {
        const realPatientId = sub.substr(0, sub.length - 1);
        const patient = await ctx.orm.patient.findByPk(realPatientId);
        if (!patient) {
            ctx.throw(404);
        }

        ctx.body = {
            id: patient.id,
            age: patient.age,
            name: patient.name,
            phone: patient.phone,
            address: patient.address,
            city: patient.city,
            email: patient.email,
            rut: patient.rut,
            isapre: patient.isapre
        }
        
    } else {

        ctx.status = 401;
        ctx.body = {
            error: "Este token NO es para PACIENTE"
        }
    }

});

module.exports = router;