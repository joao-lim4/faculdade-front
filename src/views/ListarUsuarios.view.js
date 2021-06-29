import React from 'react';
import ListarUsuarios from '../components/listar-usuarios/ListarUsuarios.component';
const ListarUsuariosView = props => {
    return (
        <React.Fragment>
            <ListarUsuarios {...props}/>
        </React.Fragment>
    )
}

export default ListarUsuariosView;