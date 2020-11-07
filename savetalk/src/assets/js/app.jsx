import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import PainFilter from './components/PainFilter/PainFilter';
import Spinner from './components/Spinner/Spinner';

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
