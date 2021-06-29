import React, { useState, useEffect } from 'react';
import {
    Row,
    Container,
    Form,
    Col,
    FormGroup,
    FormInput,
    FormSelect,
    ListGroup,
    ListGroupItem,
    Button,
    Card,
    CardHeader,
} from "shards-react";
import PageTitle from '../common/PageTitle';
import { Modal, ContainerText } from '../new-vacinado/Style'
import Api from '../../Api';

const getWidth = () => window.innerWidth 
  || document.documentElement.clientWidth 
  || document.body.clientWidth;

const Gerar = ({props, history}) => {

    const [formValue, setFormValue] = useState({
        user_id: '',
        sexo: '',
        vacinado: '',
        pais: '',
        data_in: '',
        data_fim: '',
        turma: '',
        curso: '',
        turno: '',
        assintomatico: 0,
        infectado: 0,
        bebida: 0,
        type: 'xlsx'
    });

    const [width, ] = useState(getWidth());

    const [successModal, setSuccessModal] = useState({
        active: false,
        uri: ''
    });

    const [error, setError] = useState({
        error: false,
        message: ""
    });

    const updateForm = (key, value) => {
        let formClone = {...formValue};
        formClone[key] = value.target.value;
        setFormValue(formClone);
    }

    const generateData = (d) => {
        let date = d.split('-');
        return `${date[2]}/${date[1]}/${date[0]}`;
    }


    const gerarArquivo = async (e) => {
        e.preventDefault();

        let url = "?d=1";
        url += formValue.type !== '' ?  "&type=" + formValue.type : 'xlsx';
        url += formValue.user_id !== '' ? "&user_id=" + formValue.user_id : '';
        url += formValue.sexo !== '' ? "&sexo=" + formValue.sexo : '';
        url += formValue.vacinado !== '' ? "&vacinado=" + formValue.vacinado : '';
        url += formValue.pais !== '' ? "&pais=" + formValue.pais : '';
        url += formValue.data_in !== '' ? "&data_in" + generateData(formValue.data_id) : '';
        url += formValue.data_fim !== '' ? "&data_fim" + generateData(formValue.data_fim) : '';
        url += formValue.assintomatico !== '' ? "&assintomatico=" + formValue.assintomatico : '';
        url += formValue.infectado !== '' ? "&infectado=" + formValue.infectado : '';
        url += formValue.bebida !== '' ? "&bebida=" + formValue.bebida : '';
        
        let response = await Api.AuthRequest("documento/create" + url, null, "GET");
 
        if(response.success){
            setSuccessModal({
                active: true,
                uri: response.data.uri
            });
        }else{
            setError({
                error: true,
                message: response.message
            });
        }   
    }

    const baixarArquivo = async () => {
        window.open(successModal.uri, "_blank");

        setTimeout(() => {
            setSuccessModal({
                active: false,
                uri: ""
            })
        }, 300);
    }

    useEffect(() => {
        (async () => {
            let response = await Api.AuthRequest("verificar", null, "GET");
		
            if("status" in response && response.status === 401){
                history.replace("/sair", "urlhistory");
            }
			
        })();
    }, [])


    return (
        
        <Container>

            <Modal width={width < 700 ? "sm" : "md"} show={error.error}>
                <ContainerText>
                    <span className="__error-message">{error.message}</span>
                </ContainerText>
                <hr className="__hr"/>
                <div className="__view-button">
                    <Button onClick={() => setError({error: false, message: ""})} type="submit">Fechar</Button>  
                </div>
            </Modal> 

            <Modal width={width < 700 ? "sm" : "md"} show={successModal.active}>

                <div style={{width: "100%", height: 120, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img alt="check" src="/check.png" style={{width: 100, height: 100}}/>
                </div>

                <hr className="__hr"/>
                <div className="__view-button">
                    <Button onClick={() => setSuccessModal({active: false, uri: ''})} type="submit">Fechar</Button>  
                    <Button theme="white" className="ml-3" onClick={() => baixarArquivo()} type="submit">Baixar arquivo</Button>  
                </div>
            </Modal> 


            <div style={{width: "100%"}}>
                <Row noGutters className="page-header py-4">
                    <PageTitle title="Gerar um novo documento" subtitle="DOCUMENTOS" md="12" className="ml-sm-auto mr-sm-auto" />
                </Row>

                <Form onSubmit={(e) => gerarArquivo(e) }>
                    <Card className="mb-5">
                        <CardHeader style={{padding: ".75rem 1.25rem" }} className="border-bottom">
                            <h6 className="m-0 ml-0 mr-0">Filtre como quiser, nenhum filtro é obrigatorio!</h6>
                        </CardHeader>
                        <ListGroup flush>
                            <ListGroupItem className="p-3">
                                <Row form>
                                    <Col md="3">
                                        <FormGroup>
                                            <label htmlFor="usuario_id">Úsuario ID</label>
                                            <FormInput
                                                id="usuario_id"
                                                type="number"
                                                placeholder="Úsuario id"
                                                value={formValue.user_id}
                                                onChange={text => updateForm("user_id", text)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="3" className="form-group">
                                        <label htmlFor="sexo">Sexo</label>
                                        <FormSelect 
                                            id="sexo"
                                            value={formValue.sexo}
                                            onChange={text => updateForm("sexo", text)}
                                        >
                                            <option>Sexo</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Feminino">Feminino</option>
                                            <option value="Não informar">Não informar</option>
                                            <option value="Outros">Outros</option>
                                        </FormSelect>
                                    </Col>
                                    <Col md="3" className="form-group">
                                        <label htmlFor="Vacinado">Vacinado</label>
                                        <FormSelect 
                                            id="Vacinado"
                                            value={formValue.vacinado}
                                            onChange={text => updateForm("vacinado", text)}
                                        >
                                            <option>Vacinado</option>
                                            <option value="1">Sim</option>
                                            <option value="0">Não</option>
                                        </FormSelect>
                                    </Col>
                                    <Col md="3" className="form-group">
                                        <label htmlFor="pais">País</label>
                                        <FormSelect 
                                            id="pais"
                                            value={formValue.pais}
                                            onChange={text => updateForm("pais", text)}
                                        >   
                                            <option>Pais</option>
                                            <option value="Brasil">Brasil</option>
                                            <option value="Outros">Outros</option>
                                        </FormSelect>
                                    </Col>
                                </Row>

                                <Row form>
                                    <Col md="4">
                                        <FormGroup>
                                            <label htmlFor="data_in">Data de início</label>
                                            <FormInput
                                                id="data_in"
                                                type="date"
                                                value={formValue.data_in}
                                                onChange={text => updateForm("data_in", text)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="4">
                                        <FormGroup>
                                            <label htmlFor="data_fim">Data final</label>
                                            <FormInput
                                                id="data_fim"
                                                type="date"
                                                value={formValue.data_fim}
                                                onChange={text => updateForm("data_fim", text)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="4">
                                        <FormGroup>
                                            <label htmlFor="tipo">Tipo</label>
                                            <FormSelect 
                                                id="tipo"
                                                value={formValue.type}
                                                onChange={text => updateForm("type", text)}
                                            >   
                                                <option>Selecione o tipo</option>
                                                <option value="xlsx">Excel</option>
                                                <option value="pdf">PDF</option>
                                            </FormSelect>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row form>
                                    <Col md="4">
                                        <FormGroup>
                                            <label htmlFor="Turma">Turma</label>
                                            <FormInput
                                                id="Turma"
                                                type="text"
                                                placeholder="Turma"
                                                value={formValue.turma}
                                                onChange={text => updateForm("turma", text)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="4">
                                        <FormGroup>
                                            <label htmlFor="curso">Curso</label>
                                            <FormInput
                                                id="curso"
                                                type="text"
                                                placeholder="Curso"
                                                value={formValue.curso}
                                                onChange={text => updateForm("curso", text)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="4" className="form-group">
                                        <label htmlFor="turno">Turno</label>
                                        <FormSelect 
                                            id="turno"
                                            value={formValue.turno}
                                            onChange={text => updateForm("turno", text)}
                                        >
                                            <option value="">Selecione um turno</option>
                                            <option value="Manhã">Manhã</option>
                                            <option value="Noite">Noite</option>
                                            <option value="Integral">Integral</option>
                                        </FormSelect>
                                    </Col>
                                </Row>
                                

                                <Row>
                                    <Col>
                                        <Row form>
                                            <Col md="12" className="form-group">
                                            <label htmlFor="Assintomatico">Assintomático:</label>
                                            <label htmlFor="Assintomatico">Essa informação deve ser marcada caso o aluno em algum momento da pandemia ele tenha o Covid-19 porém foi um caso assintomático onde ele conseguiu se recuperar rapidamente. ( Também deve marcar caso o aluno tenha pego a covid-19 e só soube que pegou algum tempo depois, através de exames.)</label>
                                                <FormSelect 
                                                    id="Assintomatico"
                                                    value={formValue.assintomatico}
                                                    onChange={text => updateForm("assintomatico", text)}
                                                >
                                                    <option value="0">Não</option>
                                                    <option value="1">Sim</option>
                                                </FormSelect>
                                            </Col>
                                        </Row>
                                        <Row form>
                                            <Col md="12" className="form-group">
                                            <label htmlFor="Infectado">Infectado:</label>
                                            <label htmlFor="Infectado">Essa informação deve ser marcada caso o aluno tenha pego o covid-19 não sendo um caso assintomático. Ou seja, caso o aluno tenho e pego e ficado mal, marque a opção SIM.</label>
                                                <FormSelect 
                                                    id="Infectado"
                                                    value={formValue.infectado}
                                                    onChange={text => updateForm("infectado", text)}
                                                >
                                                    <option value="0">Não</option>
                                                    <option value="1">Sim</option>
                                                </FormSelect>
                                            </Col>
                                        </Row>
                                        <Row form>
                                            <Col md="12" className="form-group">
                                            <label htmlFor="Bebida">Bebida alcoólica:</label>
                                            <label htmlFor="Bebida">Essa informação deve ser marcada caso o aluno que tenha sido vacinado e tenha feito uso de bebida alcoólica antes ou depois da vacina em um intervalo de tempo de 14 dias.</label>
                                                <FormSelect 
                                                    id="Bebida"
                                                    value={formValue.bebida}
                                                    onChange={text => updateForm("bebida", text)}
                                                >
                                                    <option value="0">Não</option>
                                                    <option value="1">Sim</option>
                                                </FormSelect>
                                            </Col>
                                        </Row>
                                        <Button type="submit" theme="white">GERAR DOCUMENTO</Button>  
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>

                </Form>
            </div>
        </Container>
    )
}



export default Gerar;