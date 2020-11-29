import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import useForm from './useForm';
import validate from './validateInfo';
import './Form.css';

const PatientForm = (props) => {
    const checkRut2 = (ruttocheck) => {

    }

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
    const [rut, setRut] = useState(patient.rut);
    const [isapre, setIsapre] = useState(patient.isapre);
    const [phone, setPhone] = useState(patient.phone);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    let allValidate = <p>Quedan campos por cambiar para modificar tu perfil</p>

    let validatePassword = ''
    let validateName = ''
    let validateRut = ''
    let validateEmail = ''
    let validateAge = ''
    let validatePhone = ''

    if (!password || !password2) {
        validatePassword = <p>Debes introducir tu contraseña y confirmarla para realizar cambios</p>
    } else if (password !== password2) {
        validatePassword = <p>Las contraseñas son distintas</p>
    }

    if (phone) {
        if (phone.length !== 9)
            validatePhone = <p>tu número de telefono debe tener 9 digitos</p>
    };

    if (!name.trim()) {
        validateName = <p>No puedes dejar tu nombre en blanco</p>
    };

    if (!email) {
        validateEmail = <p>Debes introducir tu mail</p>
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        validateEmail = <p>Tu mail es inválido</p>
    }

    if (!age) {
        validateAge = <p>Debes introducir tu edad</p>
    } else if (age < 5) {
        validateAge = <p>Dudamos que una persona tan joven esté usando la aplicación, intruduce tu edad real</p>
    } else if (age > 123) {
        validateAge = <p>Jeanne Louise Calment fue la persona más longeva, ¿La estás superando? introduce tu edad real</p>
    } else if (!Number.isInteger(Number(age))) {
        validateAge = <p>Ingresa un número entero porfavor</p>
    } else if (/\N+.\N/.test(age)) {
        validateAge = <p>Ingresa un número porfavor</p>
    }


    if (!rut) {
        validateRut = <p>Debes introducir tu RUT</p>
    } else if (rut.length > 7) {
        validateRut = <p>F</p>
    }


    if ((!validatePassword) && (!validateName) && (!validateEmail) && (!validateRut) && (!validateAge) && (!validatePhone)) {

        allValidate = (
            <div className="card2">
                <input type="submit" value="Modificar" />
            </div>
        );
    }

    return (
        <div className="card">
            <form method="post" action={string} className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                <h1> Modifica tu información </h1>
                <table>
                    <tbody>
                        <tr>
                            <div className="form-inputs">
                                <td>
                                    <label htmlFor="name" className="form-label">
                                        Nombre
                            </label>
                                </td>
                                <td>
                                    <input
                                        id='name'
                                        type="text"
                                        name='name'
                                        className="form-input"
                                        value={name}
                                        onChange={event => setName(event.target.value)}
                                        required
                                    />
                                </td>
                            </div>
                        </tr>
                        <tr><td><p className="errortype">{validateName}</p></td></tr>
                        <tr>
                            <div className="form-inputs">
                                <td>
                                    <label htmlFor="age" className="form-label">
                                        Edad
                                    </label>
                                </td>
                                <td>
                                    <input
                                        id="age"
                                        type="number"
                                        name='age'
                                        className="form-input"
                                        value={age}
                                        onChange={event => setAge(event.target.value)}
                                        required
                                    />
                                </td>
                            </div>
                        </tr>
                        <tr><td><p className="errortype">{validateAge}</p></td></tr>
                        <tr>
                            <div className="form-inputs">
                                <td>
                                    <label htmlFor="email" className="form-label">
                                        E-mail
                            </label>
                                </td>
                                <td>
                                    <input
                                        id="email"
                                        type="email"
                                        name='email'
                                        className="form-input"
                                        value={email}
                                        onChange={event => setEmail(event.target.value)}
                                        required
                                    />
                                </td>
                            </div>
                        </tr>
                        <tr><td><p className="errortype">{validateEmail}</p></td></tr>
                        <tr>
                            <div className="form-inputs">
                                <td>
                                    <label htmlFor="city" className="form-label">
                                        Ciudad
                            </label>
                                </td>
                                <td>
                                    <input
                                        id="city"
                                        type="text"
                                        name='city'
                                        className="form-input"
                                        value={city}
                                        onChange={event => setCity(event.target.value)}
                                    />
                                </td>
                            </div>
                        </tr>
                        <tr>
                            <div className="form-inputs">
                                <td>
                                    <label htmlFor="address" className="form-label">
                                        Dirección
                            </label>
                                </td>
                                <td>
                                    <input
                                        id="address"
                                        type="text"
                                        name='address'
                                        className="form-input"
                                        value={address}
                                        onChange={event => setAddres(event.target.value)}
                                    />
                                </td>
                            </div>
                        </tr>
                        <tr>
                            <div className="form-inputs">
                                <td>
                                    <label htmlFor="rut" className="form-label">
                                        RUT
                            </label>
                                </td>
                                <td>
                                    <input
                                        id="rut"
                                        type="text"
                                        name='rut'
                                        className="form-input"
                                        maxlength="12"
                                        value={rut}
                                        onChange={event => setRut(event.target.value)}

                                    />
                                </td>
                            </div>
                        </tr>
                        <tr><td><p className="errortype">{validateRut}</p></td></tr>
                        <tr>
                            <div className="form-inputs">
                                <td>
                                    <label htmlFor="isapre" className="form-label">
                                        ISAPRE
                            </label>
                                </td>
                                <td>
                                    <input
                                        id="isapre"
                                        type="text"
                                        name='isapre'
                                        className="form-input"
                                        value={isapre}
                                        onChange={event => setIsapre(event.target.value)}
                                    />
                                </td>
                            </div>
                        </tr>
                        <tr>
                            <div className="form-inputs">
                                <td>
                                    <label htmlFor="phone" className="form-label">
                                        Telefono
                            </label>
                                </td>
                                <td>
                                    <input
                                        d="phone"
                                        type="text"
                                        name='phone'
                                        className="form-input"
                                        value={phone}
                                        onChange={event => setPhone(event.target.value)}
                                    />
                                </td>
                            </div>
                        </tr>
                        <tr><td><p className="errortype">{validatePhone}</p></td></tr>
                        <tr>
                            <div className="form-inputs">
                                <td>
                                    <label htmlFor="password" className="form-label">
                                        Contraseña
                            </label>
                                </td>
                                <td>
                                    <input
                                        id="password"
                                        type="password"
                                        name='password'
                                        className="form-input"
                                        value={password}
                                        onChange={event => setPassword(event.target.value)}
                                    />
                                </td>
                            </div>
                        </tr>
                        <tr>
                            <div className="form-inputs">
                                <td>
                                    <label htmlFor="password2" className="form-label">
                                        Confirma tu contraseña
                            </label>
                                </td>
                                <td>
                                    <input
                                        id="password2"
                                        type="password"
                                        name='password2'
                                        className="form-input"
                                        value={password2}
                                        onChange={event => setPassword2(event.target.value)}
                                    />
                                </td>
                            </div>
                        </tr>
                        <tr><td><p className="errortype">{validatePassword}</p></td></tr>
                        <tr><td><p className="errortype">{allValidate}</p></td></tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

function checkRut(rut) {
    // Despejar Puntos
    var valor = rut.value.replace('.', '');
    // Despejar Guión
    valor = valor.replace('-', '');

    // Aislar Cuerpo y Dígito Verificador
    cuerpo = valor.slice(0, -1);
    dv = valor.slice(-1).toUpperCase();

    // Formatear RUN
    rut.value = cuerpo + '-' + dv

    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if (cuerpo.length < 7) { rut.setCustomValidity("RUT Incompleto"); return false; }

    // Calcular Dígito Verificador
    suma = 0;
    multiplo = 2;

    // Para cada dígito del Cuerpo
    for (i = 1; i <= cuerpo.length; i++) {

        // Obtener su Producto con el Múltiplo Correspondiente
        index = multiplo * valor.charAt(cuerpo.length - i);

        // Sumar al Contador General
        suma = suma + index;

        // Consolidar Múltiplo dentro del rango [2,7]
        if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

    }

    // Calcular Dígito Verificador en base al Módulo 11
    dvEsperado = 11 - (suma % 11);

    // Casos Especiales (0 y K)
    dv = (dv == 'K') ? 10 : dv;
    dv = (dv == 0) ? 11 : dv;

    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado != dv) { rut.setCustomValidity("RUT Inválido"); return false; }

    // Si todo sale bien, eliminar errores (decretar que es válido)
    rut.setCustomValidity('');
}

export default hot(module)(PatientForm);