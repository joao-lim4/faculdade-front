import React from 'react';
import MeusArquivosComponent from '../components/meus-arquivos/MeusArquvios.component';

const MeusArquivos = props => {
    return (
        <React.Fragment>
            <MeusArquivosComponent {...props}/>
        </React.Fragment>
    )
}

export default MeusArquivos;