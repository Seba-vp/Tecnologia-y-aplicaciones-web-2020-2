import React, { useState } from 'react';
import PatientForm from './PatientForm';

const Form = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm() {
        setIsSubmitted(true)
    }
    return (
        <div>
            <PatientForm />
        </div>
    );
};

export default hot(module)(Form);