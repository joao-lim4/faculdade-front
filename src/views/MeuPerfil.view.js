import React from 'react';
import MeuPerfilComponent from '../components/meu-perfil/MeuPerfil.component';

const MeuPerfil = props => {
    return (
        <React.Fragment>
            <MeuPerfilComponent {...props}/>
        </React.Fragment>
    )
}


export default MeuPerfil;