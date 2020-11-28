const KoaRouter = require('koa-router');
const router = new KoaRouter();

const PERMITTED_FIELDS = [
    'age',
    'name',
    'password',
    'phone',
    'address',
    'city',
    'picture',
    'email',
    'rut',
    'isapre'
]

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

router.patch('update-patient-data', '/data/update', async (ctx) => {

    const { jwtDecoded: {sub} } = ctx.state;  
    const finalLetter = sub.substr(sub.length - 1); 

    if (finalLetter === "p") {
        const realPatientId = sub.substr(0, sub.length - 1);
        const patient = await ctx.orm.patient.findByPk(realPatientId);
        if (!patient) {
            ctx.throw(404);
            return;
        }

        const { name, age, phone, address, city, email, rut, isapre, password } = ctx.request.body;

        if (name === undefined || age === undefined || phone === undefined || address === undefined || 
            city === undefined || email === undefined || rut === undefined || isapre === undefined ||
            password === undefined) {
            
            ctx.status = 400;
            ctx.body = {
                error: "No seguiste las instrucciones. DEBES COMPLETAR TODOS LOS ATRIBUTOS QUE SE INDICAN EN LA DOCUMENTACION"
            };
            return;
        }

        if (patient.name !== name) {
            patient.name = name;
        }
        if (patient.age !== age) {
            patient.age = age;
        }
        if (patient.phone !== phone) {
            patient.phone = phone;
        }
        if (patient.address !== address) {
            patient.address = address;
        }
        if (patient.city !== city) {
            patient.city = city;
        }
        if (patient.email !== email) {
            patient.email = email;
        }
        if (patient.rut !== rut) {
            patient.rut = rut;
        }
        if (patient.isapre !== isapre) {
            patient.isapre = isapre;
        }
        if (patient.password !== password) {
            patient.password = password;
        }

        try {
            
            await patient.save({ fields: PERMITTED_FIELDS });

            ctx.body = {
                name: patient.name,
                age: patient.age,
                phone: patient.phone,
                address: patient.address,
                city: patient.city,
                email: patient.email,
                rut: patient.rut,
                isapre: patient.isapre,
                password: "No te la reenviamos por tu seguridad, pero fue cambiada exitosamente!"
            }

        } catch (err) {
            ctx.status = 400;
            ctx.body = {
                error: "Algo salió mal, intente de nuevo. Recuerde completar la información y no dejar espacios en blanco porfavor"
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