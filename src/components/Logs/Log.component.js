import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, FormGroup, FormInput, Button,  Form } from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import Api from '../../Api';

const Logs = ({props, history}) => {

    const [logs, setLogs] = useState([]);
    const [formValue, setFormValue] = useState({
        id: '',
        user_id: '',
        data_in: '',
        data_fim: '',
    });

    useEffect(() => {
        (async () => {
            let response = await Api.AuthRequest("verificar", null, "GET");
			if(response.sucesso){
                let res = await Api.AuthRequest("log/listar", null, "GET");
                if(res.success){
                    setLogs(res.data.logs);
                }else{
                    setLogs(null);
                } 
			}else{
				if("status" in response && response.status === 401){
					history.replace("/sair", "urlhistory");
				}
			}
        })();
    }, []);


    const updateForm = (k,v) => {
        let cl = {...formValue};
        cl[k] = v;
        setFormValue(cl);
    }


    const generateData = (d) => {
        let date = d.split('-');
        return `${date[2]}/${date[1]}/${date[0]}`;
    }

    const pesquisar = async (e) => {
        e.preventDefault();

        let url = "?d=1";
        url += formValue.id !== "" ? "&id=" + formValue.id : "";
        url += formValue.user_id !== "" ? "&user_id=" + formValue.user_id : "";
        url += formValue.data_in !== "" ? "&data_in=" + generateData(formValue.data_in) : "";
        url += formValue.data_fim !== "" ? "&data_fim=" + generateData(formValue.data_fim) : "";


        let response = await Api.AuthRequest("log/listar" + url, null, "GET");
        if(response.success){
            setLogs(response.data.logs);
        }else{
            setLogs(null);
        } 

    }

    return (
        <Container fluid className="main-content-container px-4">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
                <PageTitle sm="4" title="LOGS" subtitle="Admin LOGS" className="text-sm-left" />
            </Row>

            <Form
                onSubmit={(e) => pesquisar(e)}
            >

                <Row>
                    <Col md="3">
                        <FormGroup>
                            <label htmlFor="id">ID</label>
                            <FormInput
                                id="id"
                                type="number"
                                placeholder="Filtre por um ID"
                                value={formValue.id}
                                onChange={(e) => updateForm("id", e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                            <label htmlFor="usuario-id">Úsuario ID</label>
                            <FormInput
                                id="usuario-id"
                                type="number"
                                placeholder="Filtre por um úsuario ID"
                                value={formValue.user_id}
                                onChange={(e) => updateForm("user_id", e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                            <label htmlFor="date-in">Data início</label>
                            <FormInput
                                id="date-in"
                                type="date"
                                placeholder="Data de início"
                                value={formValue.data_in}
                                onChange={(e) => updateForm("data_in", e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                            <label htmlFor="date-fim">Data Final</label>
                            <FormInput
                                id="date-fim"
                                type="date"
                                placeholder="Data final"
                                value={formValue.data_fim}
                                onChange={(e) => updateForm("data_fim", e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col md="6">
                        <Button style={{width: 150, height: 41,}} type="submit" theme="white">Pesquisar</Button>
                    </Col>
                </Row>
            </Form>

            {/* Default Light Table */}
            <Row>
                <Col>
                    <Card small className="mb-4">
                        <CardHeader className="border-bottom">
                            <h6 className="m-0">LOGS</h6>
                        </CardHeader>
                        <CardBody className="p-0 pb-3">
                            <table className="table mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th scope="col" className="border-0">
                                        ID
                                    </th>
                                    <th scope="col" className="border-0">
                                        Úsuario
                                    </th>
                                    <th scope="col" className="border-0">
                                        Log
                                    </th>
                                    <th scope="col" className="border-0">
                                        Criado
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.length ? logs.map((v,i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{v.id}</td>
                                            <td>{v.user_id}</td>
                                            <td>{v.log_message}</td>
                                            <td>{v.created_at}</td>
                                        </tr>
                                    )
                                }) : false}
                            </tbody>
                            </table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Logs;