const KoaRouter = require('koa-router');
const router = new KoaRouter();

const PERMITTED_FIELDS = [
    'kind',
    'name',
    'password',
    'phone',
    'address',
    'city',
    'picture',
    'mail',
    'rut',
    'speciality',
    'university',
    'year'
]

router.get('dentist-data', '/data', async (ctx) => {

    const { jwtDecoded: {sub} } = ctx.state;  //Estoy agarrando el atributo "sub" 
    const finalLetter = sub.substr(sub.length - 1);  //Agarro el último caracter de "sub"

    if (finalLetter === "d") {
        const realDentistId = sub.substr(0, sub.length - 1);
        const dentist = await ctx.orm.dentist.findByPk(realDentistId);
        if (!dentist) {
            ctx.throw(404);
        }
        ctx.body = {
            id: dentist.id,
            voluntario: dentist.kind,
            speciality: dentist.speciality,
            rut: dentist.rut,
            university: dentist.university,
            universityYear: dentist.year,
            email: dentist.mail,
            name: dentist.name,
            phone: dentist.phone,
            address: dentist.address,
            city: dentist.city,
        };
        
    } else {

        ctx.status = 401;
        ctx.body = {
            error: "Este token NO es para DENTISTA"
        }
    }

});

router.patch('update-dentist-data', '/data/update', async (ctx) => {

    const { jwtDecoded: {sub} } = ctx.state;  
    const finalLetter = sub.substr(sub.length - 1); 

    if (finalLetter === "d") {
        const realDentistId = sub.substr(0, sub.length - 1);
        const dentist = await ctx.orm.dentist.findByPk(realDentistId);
        if (!dentist) {
            ctx.throw(404);
        }

        const { name, year, phone, address, city, email, rut, voluntario, speciality, university, password } = ctx.request.body;

        if (name === undefined || year === undefined || phone === undefined || address === undefined || 
            city === undefined || email === undefined || rut === undefined || voluntario === undefined ||
            password === undefined || speciality === undefined || university === undefined ) {
            
            ctx.status = 400;
            ctx.body = {
                error: "No seguiste las instrucciones. DEBES COMPLETAR TODOS LOS ATRIBUTOS QUE SE INDICAN EN LA DOCUMENTACION"
            };
            return;
        }

        if (dentist.name !== name) {
            dentist.name = name;
        }
        if (dentist.year !== year) {
            dentist.year = year;
        }
        if (dentist.phone !== phone) {
            dentist.phone = phone;
        }
        if (dentist.address !== address) {
            dentist.address = address;
        }
        if (dentist.city !== city) {
            dentist.city = city;
        }
        if (dentist.mail !== email) {
            dentist.mail = email;
        }
        if (dentist.rut !== rut) {
            dentist.rut = rut;
        }
        if (dentist.kind !== voluntario) {
            dentist.kind = voluntario;
        }
        if (dentist.speciality !== speciality) {
            dentist.speciality = speciality;
        }
        if (dentist.university !== university) {
            dentist.university = university;
        }
        if (dentist.password !== password) {
            dentist.password = password;
        }

        try {
            
            await dentist.save({ fields: PERMITTED_FIELDS });

            ctx.body = {
                name: dentist.name,
                year: dentist.year,
                phone: dentist.phone,
                address: dentist.address,
                city: dentist.city,
                email: dentist.mail,
                rut: dentist.rut,
                voluntario: dentist.kind,
                speciality: dentist.speciality,
                university: dentist.university,
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


router.get('see-dentist-dates-api', '/seeDates', async (ctx) => {

    const { jwtDecoded: {sub} } = ctx.state;  
    const finalLetter = sub.substr(sub.length - 1);  

    if (finalLetter === "d") {
        const realDentistId = sub.substr(0, sub.length - 1);
        const dentist = await ctx.orm.dentist.findByPk(realDentistId);
        if (!dentist) {
            ctx.throw(404);
            return;
        }

        const dates = await dentist.getDates();
        let infoDates = [];
        for (const date of dates) {
            const painAssociatedWithTheDate = await date.getPain();
            const patientAssociatedWithTheDate = await painAssociatedWithTheDate.getPatient();
            newDate = {
                date,
                pain: painAssociatedWithTheDate,
                patient: patientAssociatedWithTheDate
            };
            infoDates.push(newDate);
        }

        let datesFiltered = [];
        infoDates.forEach( info => {
        
            if (info.date.state === 1) {

                const dateToAdd = {
                    dateId: info.date.id,
                    status: "Cita confirmada por Paciente",
                    nombrePaciente: info.patient.name,
                    nombreDolor: info.pain.name,
                    descripcionDolor: info.pain.description,
                    fecha: info.date.schedule
                };
                datesFiltered.push(dateToAdd)

            } else if (info.date.state === 2) {

                const dateToAdd = {
                    dateId: info.date.id,
                    status: "Cita ya fue llevada a cabo",
                    nombrePaciente: info.patient.name,
                    nombreDolor: info.pain.name,
                    descripcionDolor: info.pain.description,
                    fecha: info.date.schedule
                };
                datesFiltered.push(dateToAdd)

            } else if (info.date.state === 0) {

                const dateToAdd = {
                    dateId: info.date.id,
                    status: "Cita en espera de la respuesta del paciente",
                    nombrePaciente: info.patient.name,
                    nombreDolor: info.pain.name,
                    descripcionDolor: info.pain.description,
                    fecha: info.date.schedule
                };
                datesFiltered.push(dateToAdd)

            } else if (info.date.state === -1) {

                const dateToAdd = {
                    dateId: info.date.id,
                    status: "Cita rechazada por el paciente",
                    nombrePaciente: info.patient.name,
                    nombreDolor: info.pain.name,
                    descripcionDolor: info.pain.description,
                };
                datesFiltered.push(dateToAdd)

            } else if (info.date.state === -2) {

                const dateToAdd = {
                    dateId: info.date.id,
                    status: "Cita Cancelada por Dentista",
                    nombrePaciente: info.patient.name,
                    nombreDolor: info.pain.name,
                    descripcionDolor: info.pain.description,
                };   
                datesFiltered.push(dateToAdd)

            }

        })

        ctx.body = datesFiltered;
        
    } else {

        ctx.status = 401;
        ctx.body = {
            error: "Este token NO es para DENTISTA"
        }
    }

});

router.patch('update-date-by-dentist', '/updateDateApi', async (ctx) => {

    const { jwtDecoded: {sub} } = ctx.state;  
    const finalLetter = sub.substr(sub.length - 1); 

    if (finalLetter === "d") {
        const realDentistId = sub.substr(0, sub.length - 1);
        const dentist = await ctx.orm.dentist.findByPk(realDentistId);
        if (!dentist) {
            ctx.throw(404);
        }

        const { dateId, state } = ctx.request.body;

        if ( (dateId === undefined || state === undefined) || (state != "citaRealizada" && state != "rechazarCita") ) {
            
            ctx.status = 400;
            ctx.body = {
                error: "No seguiste las instrucciones. DEBES COMPLETAR TODOS LOS ATRIBUTOS QUE SE INDICAN EN LA DOCUMENTACION CON LAS OPCIONES INDICADAS"
            };
            return;
        }

        const dates = await dentist.getDates();
        let foundDateId = false;   //Vamos a revisar si el id de la cita ingresada pertenece al dentista que tiene la token
        for (const date of dates) {
            if (date.id == dateId) {
                foundDateId = true;
            }
        }
        if (foundDateId === false) {
            ctx.status = 400;
            ctx.body = {
                error: "LA CITA CON EL ID INGRESADO NO PERTENECE AL DENTISTA QUE ESTA LOGEADO. SIGUE LAS INSTRUCCIONES"
            };
            return;
        }

        const date = await ctx.orm.date.findByPk(dateId);
        if (!date) {
            ctx.throw(404);
            return;
        }

        if (date.state !== 1 && date.state !== 0) {
            ctx.status = 400;
            ctx.body = {
                error: "No seguiste las instrucciones. INGRESASTE EL ID DE UNA CITA QUE YA FUE REALIZADA O YA FUE RECHAZADA. SIGUE LAS REGLAS!"
            };
            return;
        }

        if (state == "rechazarCita") {

            try {
                date.state = -2;
                await date.save();
                ctx.body = {
                    message: "Rechazó la cita exitosamente"
                }

            } catch (err) {
                ctx.status = 400;
                ctx.body = {
                    error: "No se pudo guardar en la base de datos los cambios"
                }
                
            }
            
        } else {

            try {
                date.state = 2;
                await date.save();     
                ctx.body = {
                    message: "Realizó la cita exitosamente"
                }    

            } catch (err) {
                ctx.status = 400;
                ctx.body = {
                    error: "No se pudo guardar en la base de datos los cambios"
                }
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