import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import useForm from './useForm';
import validate from './validateInfo';


const PatientForm = (props) => {


    const { serverData } = props;
    const prePatientObject = serverData['patient'];
    const patient = JSON.parse(prePatientObject);

    const string = `${patient.id}`;

    const { handleChange, values, handleSubmit, errors } = useForm(validate);

    // { values.name = patient.name }

    const [name, setName] = useState(patient.name);
    const [age, setAge] = useState(patient.age);
    const [email, setEmail] = useState(patient.email);
    const [city, setCity] = useState(patient.city);
    const [address, setAddres] = useState(patient.address);
    let [rut, setRut] = useState(patient.rut);
    const [isapre, setIsapre] = useState(patient.isapre);
    const [phone, setPhone] = useState(patient.phone);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    let allValidate = 'Quedan campos por cambiar para modificar tu perfil'

    let validatePassword = ''
    let validateName = ''
    let validateRut = ''
    let validateEmail = ''
    let validateAge = ''
    let validatePhone = ''

    if (!password || !password2) {
        validatePassword = 'Debes introducir tu contraseña y confirmarla para realizar cambios'
    } else if (password !== password2) {
        validatePassword = 'Las contraseñas son distintas'
    }

    if (phone) {
        if (phone.length !== 9)
            validatePhone = 'tu número de telefono debe tener 9 digitos'
    };

    if (!name.trim()) {
        validateName = 'No puedes dejar tu nombre en blanco'
    };

    if (!email) {
        validateEmail = 'Debes introducir tu mail'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        validateEmail = 'Tu mail es inválido'
    }

    if (!age) {
        validateAge = 'Debes introducir tu edad'
    } else if (age < 5) {
        validateAge = 'Dudamos que una persona tan joven esté usando la aplicación, intruduce tu edad real'
    } else if (age > 123) {
        validateAge = 'Jeanne Louise Calment fue la persona más longeva, ¿La estás superando? introduce tu edad real'
    } else if (!Number.isInteger(Number(age))) {
        validateAge = 'Ingresa un número entero porfavor'
    } else if (/\N+.\N/.test(age)) {
        validateAge = 'Ingresa un número porfavor'
    }

    if (rut.length < 11) {
        validateRut = 'Debes introducir tu RUT'
    }
    if (!rut) {
        validateRut = 'Debes introducir tu RUT'
    } else if (rut.length > 0) {
        rut = rut.replace(/\./g, '').replace('-', '');

        if (rut.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) {
            rut = rut.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
        }
        else if (rut.match(/^(\d)(\d{3}){2}(\w{0,1})$/)) {
            rut = rut.replace(/^(\d)(\d{3})(\d{3})(\w{0,1})$/, '$1.$2.$3-$4');
        }
        else if (rut.match(/^(\d)(\d{3})(\d{0,2})$/)) {
            rut = rut.replace(/^(\d)(\d{3})(\d{0,2})$/, '$1.$2.$3');
        }
        else if (rut.match(/^(\d)(\d{0,2})$/)) {
            rut = rut.replace(/^(\d)(\d{0,2})$/, '$1.$2');
        }
    }


    if ((!validatePassword) && (!validateName) && (!validateEmail) && (!validateRut) && (!validateAge) && (!validatePhone)) {

        allValidate = (
            <input className="form-input-btn" type="submit" value="Modificar" />
        );
    }

    return (
        <div className="form-container">
            <div className="form-content-right">
                <form method="post" action={string} className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <h1> Modifica tu información </h1>

                    <div className="form-inputs">

                        <label htmlFor="name" className="form-label">
                            Nombre
                            </label>

                        <input
                            id='name'
                            type="text"
                            name='name'
                            className="form-input"
                            value={name}
                            onChange={event => setName(event.target.value)}
                            required
                        />
                        <p className="errortype">{validateName}</p>
                    </div>
                    <div className="form-inputs">
                        <label htmlFor="age" className="form-label">
                            Edad
                                    </label>


                        <input
                            id="age"
                            type="number"
                            name='age'
                            className="form-input"
                            value={age}
                            onChange={event => setAge(event.target.value)}
                            required
                        />
                        <p className="errortype">{validateAge}</p>
                    </div>


                    <div className="form-inputs">

                        <label htmlFor="email" className="form-label">
                            E-mail
                            </label>

                        <input
                            id="email"
                            type="email"
                            name='email'
                            className="form-input"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            required
                        />
                        <p className="errortype">{validateEmail}</p>
                    </div>

                    <div className="form-inputs">

                        <label htmlFor="city" className="form-label">
                            Ciudad
                            </label>

                        <input
                            id="city"
                            type="text"
                            name='city'
                            className="form-input"
                            value={city}
                            onChange={event => setCity(event.target.value)}
                        />

                    </div>

                    <div className="form-inputs">
                        <label htmlFor="address" className="form-label">
                            Dirección
                            </label>
                        <input
                            id="address"
                            type="text"
                            name='address'
                            className="form-input"
                            value={address}
                            onChange={event => setAddres(event.target.value)}
                        />
                    </div>
                    <div className="form-inputs">
                        <label htmlFor="rut" className="form-label">
                            RUT
                            </label>
                        <input
                            id="rut"
                            type="text"
                            name='rut'
                            className="form-input"
                            maxLength="12"
                            value={rut}
                            onChange={event => setRut(event.target.value)}

                        />
                        <p className="errortype">{validateRut}</p>
                    </div>

                    <div className="form-inputs">

                        <label htmlFor="isapre" className="form-label">
                            ISAPRE
                            </label>


                        <input
                            id="isapre"
                            type="text"
                            name='isapre'
                            className="form-input"
                            value={isapre}
                            onChange={event => setIsapre(event.target.value)}
                        />

                    </div>

                    <div className="form-inputs">

                        <label htmlFor="phone" className="form-label">
                            Telefono
                            </label>

                        <input
                            d="phone"
                            type="text"
                            name='phone'
                            className="form-input"
                            value={phone}
                            onChange={event => setPhone(event.target.value)}
                        />
                        <p className="errortype">{validatePhone}</p>
                    </div>

                    <div className="form-inputs">

                        <label htmlFor="password" className="form-label">
                            Contraseña
                            </label>

                        <input
                            id="password"
                            type="password"
                            name='password'
                            className="form-input"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />

                    </div>

                    <div className="form-inputs">

                        <label htmlFor="password2" className="form-label">
                            Confirma tu contraseña
                            </label>

                        <input
                            id="password2"
                            type="password"
                            name='password2'
                            className="form-input"
                            value={password2}
                            onChange={event => setPassword2(event.target.value)}
                        />
                        <p className="errortype">{validatePassword}</p>
                        <p className="errortype">{allValidate}</p>

                    </div>
                </form >
            </div>
        </div >
    );
};


export default hot(module)(PatientForm);