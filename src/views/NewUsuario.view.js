import React from 'react';
import NewUsuarioComponent from '../components/new-usuario/NewUsuario.component';

const NewUsuarioView = props => {
    return (
        <React.Fragment>
            <NewUsuarioComponent {...props}/>
        </React.Fragment>
    )
}

export default NewUsuarioView;