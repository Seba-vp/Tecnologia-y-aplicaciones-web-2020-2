import React, { useState } from 'react';
import { hot } from 'react-hot-loader';

function PainFilter (props) {

    //TODO LO QUE ESTÁ AQUI ES EL WEBEO KL QUE HAY QUE HACER PARA OBTENER LA DATA DEL BACKEND
    const {serverData} = props;
    const prePainObject = serverData['pains'];
    const preDentistObject = serverData['dentist'];

    const pains = JSON.parse(prePainObject);
    const dentist = JSON.parse(preDentistObject);
    //console.log(pains);  //este console.log() se ve en la consola del google chrome
    //console.log(dentist);
    //TODO LO QUE ESTÁ AQUI ES EL WEBEO KL QUE HAY QUE HACER PARA OBTENER LA DATA DEL BACKEND

    const [enteredPain, setEnteredPain] = useState('');

    const painsToShow = pains.map(pain => {

        const string = `dentistpain/${pain.id}/${dentist.id}`;

        if ( pain.name.toLowerCase().includes(enteredPain.toLowerCase()) ) {
            return (
                <div key={pain.id} className="card2" >
                    <h2> {pain.name} </h2>
                    <div className="button" >
                        <a href={string} > Ver más </a>
                    </div>
                </div>
            );
        } else {
            return;
        }
    });

    return (
        <div>

            <label>Filtra por Nombre del Dolor: </label>
            <input 
                type="text"
                value={enteredPain}
                onChange={event => setEnteredPain(event.target.value)}
            />

            {painsToShow}

        </div>
        
    );
};

export default hot(module)(PainFilter);