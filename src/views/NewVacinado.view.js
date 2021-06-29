import React from 'react';
import NewVacinado from '../components/new-vacinado/NewVacinado.component';

const NewVacinadoView = props => {
    return (
        <React.Fragment>
            <NewVacinado {...props}/>
        </React.Fragment>
    )
}


export default NewVacinadoView;