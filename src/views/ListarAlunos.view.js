import React from 'react';
import ListarAlunos from '../components/listart-alunos/ListarAlunos.component';

const ListarAlunosView = props => {
    return (
        <React.Fragment>
            <ListarAlunos {...props}/>
        </React.Fragment>
    )
}


export default ListarAlunosView;