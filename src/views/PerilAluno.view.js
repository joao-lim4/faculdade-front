import React from 'react';
import PerfilAluno from '../components/perfil-aluno/PerfilAluno.component';


const PerfilAlunoView = props => {
    return (
        <React.Fragment>
            <PerfilAluno {...props}/>
        </React.Fragment>
    )
}


export default PerfilAlunoView;