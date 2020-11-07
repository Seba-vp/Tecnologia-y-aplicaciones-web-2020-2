import React, { useState } from 'react';
import { hot } from 'react-hot-loader';

import LoadingIndicator from './LoadingIndicator';

function Spinner (props) {

    const [confirm, setConfirm] = useState(false);

    const {serverData} = props;
    const preDateObject = serverData['date'];
    const date = JSON.parse(preDateObject);

    const string = `dateconfirm/${date.id}`;

    const onClickHandler = () => {
        setConfirm(true);
    };

    let spinnerToShow = null;
    if (confirm) {
        spinnerToShow = <LoadingIndicator />;
    }


    return(
        <div className="card2">
            <form action={string} method="post" onClick={onClickHandler} >
                <input type="hidden" name="_method" value="patch" />
                <input type="submit" value="Confirmar Cita REACT" />
            </form>
            {spinnerToShow}
        </div>
    );

};

export default hot(module)(Spinner);
