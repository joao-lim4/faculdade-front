import React, { useEffect, useState } from "react";
import { Container } from './Style';
import {
    // Container,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    Button
} from "shards-react";
import Api from '../../Api';
import PageTitle from "../common/PageTitle";
import Lottie from 'react-lottie';
import Animation from '../../assets/61372-404-error-not-found.json';

const ListarAlunos = ({props, history}) => {

    const [alunosList, setAlunosList] = useState([]);


    useEffect(() => {
        (async () => {
            let response = await Api.AuthRequest("verificar", null, "GET");
            if(response.sucesso){
                let res = await Api.AuthRequest("vacinados/listar", null, "GET");
                if(res.success){
                    setAlunosList(res.data.vacinados);
                }else{
                    setAlunosList([]);
                }
            }else{
                if("status" in response && response.status === 401){
                    history.replace("/sair", "urlhistory");
                }
            }

        })()
    }, []);


    return (
        <Container>

            <Row noGutters className="page-header py-4">
                <PageTitle title="Todos os alunos cadastrados" subtitle="VACINADOs" md="12" className="ml-sm-auto mr-sm-auto" />
            </Row>
            
            <hr />  


        <Row>
            {alunosList.length ? alunosList.map((aluno, i) => (
                <Col lg="4" key={i}>
                    <Card small className="card-post mb-4">
                        <CardBody>
                            <h5 className="card-title">Informações</h5>
                            <span className="text-muted">Principais informações do aluno</span>
                            <br/>
                            <br/>
                            <Row>
                                <Col lg="6">
                                    <span className="text-muted">Idade: {aluno.idade}</span>
                                </Col>
                                <Col lg="6">
                                    <span className="text-muted">Sexo: {aluno.sexo}</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="6">
                                    <span className="text-muted">Pais: {aluno.pais}</span>
                                </Col>
                                <Col lg="6">
                                    <span className="text-muted">Vacinado: {aluno.vacinado === 0 ? "Não" : "Sim"}</span>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter className="border-top d-flex">
                            <div className="card-post__author d-flex">
                                <a
                                    href={`/alunos/show/id=${aluno.id}`}
                                    className="card-post__author-avatar card-post__author-avatar--small"
                                    style={{ backgroundImage: `url(${aluno.path})` }}
                                >
                                    {aluno.nome}
                                </a>
                                <div className="d-flex flex-column justify-content-center ml-3">
                                    <span className="card-post__author-name">
                                        {aluno.nome}
                                    </span>
                                    <small className="text-muted">{}</small>
                                </div>
                            </div>
                            <div onClick={() => history.replace(`/alunos/show/id=${aluno.id}`, "urlhistory")} className="my-auto ml-auto">
                                <Button size="sm" theme="white">
                                    Visualizar
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </Col>
            )) : (
                <div style={{width: '100%', height: 400, display:"flex", justifyContent: "center",alignItems: "center", flexDirection: "column"}}>
                    <Lottie 
                        options={{
                            loop: true,
                            autoplay: true, 
                            animationData: Animation,
                            rendererSettings: {
                                preserveAspectRatio: 'xMidYMid slice'
                            }
                        }}
                        height={400}
                        width={400}
                    />
        
                    <span style={{fontSize: 20}}>Nehum resultado</span>
        
                </div>
            )}
        </Row>


        </Container>
    )
}


export default ListarAlunos;