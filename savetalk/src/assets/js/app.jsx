import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import PainFilter from './components/PainFilter/PainFilter';
import Spinner from './components/Spinner/Spinner';
import DynamicStars from './components/Star';
import PatientForm from './components/PatientForm/PatientForm';

const reactAppContainer = document.getElementById('react-app');

if (reactAppContainer) {
  ReactDOM.render(<App />, reactAppContainer);
}

const painFilterContainer = document.getElementById('pain-filter');

if (painFilterContainer) {
  ReactDOM.render(<PainFilter
    serverData={painFilterContainer.dataset}
  />, painFilterContainer);
}

const spinnerContainer = document.getElementById('spinner');

if (spinnerContainer) {
  ReactDOM.render(<Spinner
    serverData={spinnerContainer.dataset}
  />, spinnerContainer);
}


const starContainer = document.getElementById('star-raiting');

if (starContainer) {
  ReactDOM.render(<DynamicStars
    serverData={starContainer.dataset}
  />, starContainer);
}

const patientFormContainer = document.getElementById('patient-form');

if (patientFormContainer) {
  ReactDOM.render(<PatientForm
    serverData={patientFormContainer.dataset}
  />, patientFormContainer);
}
