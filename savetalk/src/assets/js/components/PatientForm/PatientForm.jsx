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
        validateAge = <p>Dudamos que una persona tan jóven esté usando la aplicación, intruduce tu edad real</p>
    } else if (age > 123) {
        validateAge = <p>Jeanne Louise Calment fue la persona más longeva, ¿La estás superando? introduce tu edad real</p>
    } else if (!Number.isInteger(Number(age))) {
        validateAge = <p>Ingresa un número entero porfavor</p>
    } else if (/\N+.\N/.test(age)) {
        validateAge = <p>Ingresa un número porfavor</p>
    }


    if (!rut) {
        validateRut = <p>Debes introducir tu RUT</p>
    } else if (!/\S+-\S+/.test(rut)) {
        validateRut = <p>Tu RUT debe ser de la forma XXXXXXXX-X o XX.XXX.XXX-X  </p>
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
            <form method="post"  action={string} className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                <h1> Modifica tu información </h1>
                <h1> {string} </h1>
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
                    {validateName}
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
                    {validateAge}
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
                    {validateEmail}
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
                        value={rut}
                        onChange={event => setRut(event.target.value)}
                    />
                    {validateRut}
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
                    {validatePhone}
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

                    {validatePassword}
                </div>
                {allValidate}
            </form>
        </div>
    );
};

export default hot(module)(PatientForm);