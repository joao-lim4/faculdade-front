import React, { useEffect } from 'react';
import { ContainerFlex, TextDefault } from './Style';


const Sair = ({props, history}) => {

    useEffect(() => {
        (() => {
            localStorage.clear();
            history.replace("/login", "urlhistory");
        })();
    }, []);

    return (
        <ContainerFlex>
            <TextDefault>SAINDO...</TextDefault>
        </ContainerFlex>
    )   
}

export default Sair;