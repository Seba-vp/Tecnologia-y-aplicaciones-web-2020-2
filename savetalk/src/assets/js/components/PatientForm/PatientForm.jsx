import React from 'react';
import { hot } from 'react-hot-loader';
import useForm from './useForm';
import validate from './validateInfo';
import './Form.css'

const PatientForm = () => {

    const { handleChange, values, handleSubmit, errors } = useForm(validate);

    return (
        <div className="card">
            <form className="form" method="post" action="<%= updatePatientPathDataBase(patient.id) %>" enctype="multipart/form-data" >
                <h1> Modifica tu información </h1>
                <div className="form-inputs">
                    <label htmlFor="name" className="form-label">
                        Nombre
                    </label>
                    <input
                        id='name'
                        type="text"
                        name='name' c
                        lassName="form-input"
                        placeholder='Cambia tu nombre'
                        value={values.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p>{errors.name}</p>}
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
                        placeholder='Cambia tu edad'
                        value={values.age}
                        onChange={handleChange}
                    />
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
                        placeholder='Cambia tu Email'
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p>{errors.email}</p>}
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
                        placeholder='Cambia tu ciudad'
                        value={values.city}
                        onChange={handleChange}
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
                        placeholder='Cambia tu dirección'
                        value={values.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="picture" className="form-label">
                        Foto de perfil
                    </label>
                    <input
                        id="picture"
                        type="file"
                        name='picture'
                        className="form-input"
                        placeholder='Email'
                        value={values.picture}
                        onChange={handleChange}
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
                        placeholder='Cambia tu RUT'
                        value={values.rut}
                        onChange={handleChange}
                    />
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
                        placeholder='Cambia tu Isapre'
                        value={values.isapre}
                        onChange={handleChange}
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
                        placeholder='phone'
                        value={values.phone}
                        onChange={handleChange}
                    />
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
                        placeholder='Cambia tu contraseña'
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p>{errors.password}</p>}
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
                        placeholder='Confirma tu contraseña'
                        value={values.password2}
                        onChange={handleChange}
                    />
                    {errors.password2 && <p>{errors.password2}</p>}
                </div>
                <div class="card2">
                    <button type='submit' className="form-input-btn">
                        Modificar
                </button>
                </div>
            </form>
        </div>
    );
};

export default hot(module)(PatientForm);