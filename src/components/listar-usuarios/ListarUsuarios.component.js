import React, { useEffect, useState } from 'react';
import { Container } from '../listart-alunos/Style';
import {
    // Container,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    Button,
    Form,
    ListGroup,
    ListGroupItem,
    FormInput,
} from "shards-react";
import Api from '../../Api';
import PageTitle from "../common/PageTitle";
import Lottie from 'react-lottie';
import Animation from '../../assets/61372-404-error-not-found.json';

const ListarUsuarios = ({history}) => {


    const [usuariosList, setUsuariosList] = useState([])
    const [formValue, setFormValue] = useState({
        id: '',
        nome: ''
    });

    const verificarUserNivel = () => {
        
        let user = JSON.parse(localStorage.getItem("__User"));
        
        if(user){
            if(user.nivel.nome === "Master"){
                return true;
            }else{
                return false;
            }
        }
    }

    const pesquisarUser = async () => {
        let url = '?d=1';

        url += formValue.id !== '' ? '&id=' + formValue.id : "";
        url += formValue.nome !== '' ? '&nome=' + formValue.nome : "";

        let response = await Api.AuthRequest("usuarios/listar" + url, null, "GET");
        if(response.success){
            setUsuariosList(response.data.usuarios);
        }else{
            setUsuariosList([]);
        }

    }

    useEffect(() => {
        (async () => {
            if(verificarUserNivel()){
                pesquisarUser()
            }else{
                history.replace("/", "urlhistory");
            }
        })();
    }, []);


    const updateForm = (key, value) => {
        let formClone = {...formValue};
        formClone[key] = value.target.value;
        setFormValue(formClone);
    }

    const pesquisar = e => {
        e.preventDefault();
        pesquisarUser();
    }

    return (
        <Container>

            <Row noGutters className="page-header py-4">
                <PageTitle title="Úsuarios cadastrados" subtitle="ÚSUARIOS" md="12" className="ml-sm-auto mr-sm-auto" />
            </Row>
            
            <hr />  

            <Form onSubmit={e => pesquisar(e)}>
                <ListGroup flush className="mb-4">
                    <ListGroupItem className="p-3">
                        <Row>
                            <Col>
                                <Row form>
                                    <Col md="6" className="form-group">
                                        <label htmlFor="id">ID do úsuario</label>
                                        <FormInput
                                            id="id"
                                            value={formValue.id}
                                            onChange={text => updateForm("id", text)}
                                            type="number"
                                            placeholder="ID"
                                        />
                                    </Col>
                                    <Col md="6">
                                        <label htmlFor="nome">Nome</label>
                                        <FormInput
                                            id="nome"
                                            value={formValue.nome}
                                            onChange={text => updateForm("nome", text)}
                                            type="text"
                                            placeholder="Nome"
                                        />
                                    </Col>
                                </Row>
                                <Button type="submit">Pesquisar</Button>  
                            </Col>
                        </Row>
                    </ListGroupItem>
                </ListGroup>
            </Form>

            <Row>
                {usuariosList.length ? usuariosList.map((usuario, i) => (
                    <Col lg="4" key={i}>
                        <Card small className="card-post mb-4">
                            <CardBody>
                                <h5 className="card-title">Informações</h5>

                                <hr />

                                <span>Nível: {usuario.nivel.nome}</span>
                                <br />
                                <span>E-mail: {usuario.email}</span>

                            </CardBody>
                            <CardFooter className="border-top d-flex">
                                <div className="card-post__author d-flex">
                                    <a
                                        href={`/usuarios/show/id=${usuario.id}`}
                                        className="card-post__author-avatar card-post__author-avatar--small"
                                        style={{ backgroundImage: `url(${usuario.path})` }}
                                    >
                                        {usuario.name}
                                    </a>
                                    <div className="d-flex flex-column justify-content-center ml-3">
                                        <span className="card-post__author-name">
                                            {usuario.name}
                                        </span>
                                        <small className="text-muted">{}</small>
                                    </div>
                                </div>
                                <div onClick={() => history.replace(`/usuarios/show/id=${usuario.id}`, "urlhistory")} className="my-auto ml-auto">
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


export default ListarUsuarios;