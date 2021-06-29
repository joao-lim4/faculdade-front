import React, { useState, useCallback, useRef, useEffect }  from 'react';
import { Container, ContainerFlex, Modal, ContainerText, ContainerFlexModal, ContainerItem, ContainerWebCan, ContainerImagePreView  } from './Style'
import {
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
    FormInput,
    FormSelect,
    Button
} from "shards-react";
import InputMask from "react-input-mask";
import { IoIosFolder, IoMdCamera, IoMdClose, IoIosImages } from 'react-icons/io';
import Webcam from "react-webcam";
import Api from '../../Api';
import PageTitle from '../common/PageTitle';

const getWidth = () => window.innerWidth 
  || document.documentElement.clientWidth 
  || document.body.clientWidth;

const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user"
};
const NewVacinado = ({props, history}) => {

    const [formValue, setFormValue] = useState({
        nome: '',
        idade: '', 
        sexo: '', 
        cpf: '', 
        turma: '',
        curso: '',
        turno: '',
        pais: 'Brasil',
        vacinado: 0,
        assintomatico: 0, 
        infectado: 0, 
        bebida: 0,
        email: '',
        contato: '',
    });

    const [width, ] = useState(getWidth());
    const [imageProps, setImageProps] = useState({
        base64: "",
        active: false
    })

    const [error, setError] = useState({
        error: false,
        message: ""
    });
    const [modalEscolha, setModalEscolha] = useState({
        active: false, 
        webCam: false,
    });
    const [FileContent,setFile] = useState(null);

    const [successModal, setSuccessModal] = useState({
        active: false
    });

    const [nameFile, setNameFile] = useState("Escolha um arquivo");

    const webcamRef = useRef(null);

    const dataURLtoFile = (dataurl, filename) => {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    const resetState = () => {
        setFormValue({
            nome: '',
            idade: '', 
            sexo: '', 
            cpf: '', 
            turma: '',
            curso: '',
            turno: '',
            pais: 'Brasil',
            vacinado: 0,
            assintomatico: 0, 
            infectado: 0, 
            bebida: 0,
            email: '',
            contato: '',
        });
        setImageProps({
            base64: "",
            active: false
        });
        setFile(null);
        setNameFile("Escolha um arquivo");
    }
    
    const updateForm = (key, value, file=false) => {
        let formClone = {...formValue};
        formClone[key] = !file ? value.target.value : value;
        setFormValue(formClone);
    }

    const capture = useCallback(
      (e) => {
        e.preventDefault()
        let imageSrc = webcamRef.current.getScreenshot();
        if(typeof imageSrc === 'string' ){
            setImageProps({
                active: true,
                base64: imageSrc,
            });

            setNameFile("Imagem capturada pela WebCam");
            
            let file = dataURLtoFile(imageSrc, "test.jpeg");

            if(file instanceof File){
                setFile(file);
            }else{
                setFile(null);
            }
        }
      },
      [webcamRef]
    );


    const validateForm = () => {
        for(let key in formValue){
            if(formValue[key] === ""){
                return false;
            }
        }

        if(FileContent === null){
            return false;
        }

        return true;
    }


    const selectArquivo = () => {
        setModalEscolha({
            active: false,
        });

        setTimeout(() => {
            document.getElementById("trigger-button").click();
        }, 200);
    }

    const closeWebCanAndImage = () => {
        setModalEscolha({
            active: false,
            webCam: false,
        });

        setTimeout(() => {
            document.getElementById("trigger-button").click();
        }, 200);
    }

    const saveImage = f => {
        if(typeof f !== "undefined"){
            setNameFile(f.name.split(".")[0]);
            if(f instanceof File){
                setFile(f);
            }else{
                setFile(null);
            }
        }
    }

    const salvarVacinado = async e => {
        e.preventDefault();
        if(validateForm()){
            let formData = new FormData();
            formData.append("path", FileContent);

            for(let key in formValue){
                formData.append(String(key), formValue[key]);
            }

            let response = await Api.AuthRequest("vacinados/create", formData , "POST", true);
            
            if(response.success){
                setSuccessModal({active: true});
                resetState();
            }else{
                setError({
                    error: true,
                    message: "Algo de errado aconteceu, tente novamente mais tarde!"
                });
            }
        }else{
            setError({
                error: true,
                message: "Preencha todos os campos para continuar!"
            })
        }
        
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
                    <Button onClick={() => setSuccessModal({active: false})} type="submit">Fechar</Button>  
                </div>
            </Modal> 

            <Modal width={width < 700 ? "sm" : "md"} webCam={modalEscolha.webCam} show={modalEscolha.active}>
            {/* folder-outline */}
                <ContainerFlexModal webCam={modalEscolha.webCam}>
                    {!modalEscolha.webCam ? (
                        <ContainerFlexModal>
                            <ContainerItem onClick={() => selectArquivo()}>
                                <IoIosFolder className="__icon-button" color="#007bff" />
                            </ContainerItem>
                            <ContainerItem onClick={() => setModalEscolha({active: true, webCam: true})}>
                                <IoMdCamera className="__icon-button" color="#007bff" />
                            </ContainerItem>
                        </ContainerFlexModal>
                    ) : (
                        <ContainerWebCan>
                            <Webcam
                                audio={false}
                                height={400}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width={400}
                                style={{borderRadius: 10}}
                                videoConstraints={videoConstraints}
                            />

                            <ContainerImagePreView show={imageProps.active}>
                                <img alt="preview" src={imageProps.base64} className="__image-preview"/>
                            </ContainerImagePreView>

                            <div onClick={() => setModalEscolha({active: false, webCam: false})} className="__close-web-cam">
                                <IoMdClose color="#000000" className="__icon-close"/>
                            </div>

                            <div onClick={() => closeWebCanAndImage()} className="__button-galeria">
                                <IoIosImages color="#000000" className="__icon-image" />
                            </div>

                            <div onClick={capture} className="__webCanButton">
                                <div className="__bg-button-web-cam"/>
                            </div>
                        </ContainerWebCan>                           
                    )
                    }
                </ContainerFlexModal>
                {!modalEscolha.webCam ? (
                    <React.Fragment>
                        <hr className="__hr"/>
                        <div className="__view-button">
                            <Button onClick={() => setModalEscolha({active: false, webCam: false})} type="submit">Fechar</Button>  
                        </div>
                    </React.Fragment>
                ) : false

                }
            </Modal>            

            <Row noGutters className="page-header py-4">
                <PageTitle title="Adicione um novo vacinado" subtitle="NOVO VACINADO" md="12" className="ml-sm-auto mr-sm-auto" />
            </Row>
            <hr />

            <ContainerFlex>
                <Form onSubmit={e => salvarVacinado(e)}>
                    <ListGroup flush>
                        <ListGroupItem className="p-3">
                            <Row>
                                <Col>
                                    <Row form>
                                        <Col md="4" className="form-group">
                                            <label htmlFor="nome">Nome</label>
                                            <FormInput
                                                id="nome"
                                                value={formValue.nome}
                                                onChange={text => updateForm("nome", text)}
                                                type="text"
                                                placeholder="Nome"
                                            />
                                        </Col>
                                        <Col md="4">
                                            <label htmlFor="idade">Idade</label>
                                            <FormInput
                                                id="idade"
                                                value={formValue.idade}
                                                onChange={text => updateForm("idade", text)}
                                                type="number"
                                                placeholder="Idade"
                                            />
                                        </Col>
                                        <Col md="4" className="form-group">
                                            <label htmlFor="sexo">Sexo</label>
                                            <FormSelect 
                                                id="sexo"
                                                value={formValue.sexo}
                                                onChange={text => updateForm("sexo", text)}
                                            >
                                                <option value="">Sexo</option>
                                                <option value="Masculino">Masculino</option>
                                                <option value="Feminino">Feminino</option>
                                                <option value="Não informar">Não informar</option>
                                                <option value="Outros">Outros</option>
                                            </FormSelect>
                                        </Col>
                                    </Row>

                                    <Row form>
                                        <Col md="4">
                                            <label htmlFor="CPF">CPF</label>
                                            <InputMask 
                                                className="form-control"
                                                id="CPF"
                                                mask="999.999.999-99" 
                                                value={formValue.cpf} 
                                                placeholder="CPF"
                                                onChange={text => updateForm("cpf", text)}
                                            />
                                        </Col>
                                        <Col md="4" className="form-group">
                                            <label htmlFor="pais">País</label>
                                            <FormSelect 
                                                id="pais"
                                                value={formValue.pais}
                                                onChange={text => updateForm("pais", text)}
                                            >
                                                <option value="Brasil">Brasil</option>
                                                <option value="Outros">Outros</option>
                                            </FormSelect>
                                        </Col>
                                        <Col md="4" className="form-group">
                                            <label htmlFor="Vacinado">Vacinado</label>
                                            <FormSelect 
                                                id="Vacinado"
                                                value={formValue.vacinado}
                                                onChange={text => updateForm("vacinado", text)}
                                            >
                                                <option value="1">Sim</option>
                                                <option value="0">Não</option>
                                            </FormSelect>
                                        </Col>
                                    </Row>

                                    <Row form>
                                        <Col md="4" className="form-group">
                                            <label htmlFor="email">E-mail</label>
                                            <FormInput 
                                                id="email" 
                                                type="email"
                                                placeholder="E-mail"
                                                value={formValue.email}
                                                onChange={text => updateForm("email", text)}
                                            />
                                        </Col>
                                        <Col md="4" className="form-group">
                                            <label htmlFor="contato">Contato</label>
                                            <InputMask 
                                                className="form-control"
                                                id="contato"
                                                mask="(99) 99999-9999" 
                                                value={formValue.contato} 
                                                placeholder="Contato"
                                                onChange={text => updateForm("contato", text)}
                                            />
                                        </Col>
                                        <Col md="4" className="form-group">
                                            <label htmlFor="customFile2">Foto</label>
                                            <div className="custom-file mb-3">
                                                <input type="file" accept="image/jpg image/jpeg" onChange={(e) => saveImage(e.target.files[0])} style={{width:0,height:0,opacity: 0}} className="custom-file-input" id="trigger-button" />
                                                <input onClick={() => setModalEscolha({active: true})} type="text" className="custom-file-input" id="customFile2" />
                                                <label className="custom-file-label" htmlFor="customFile2">
                                                    {nameFile}
                                                </label>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row form>
                                        <Col md="4" className="form-group">
                                            <label htmlFor="turma">Turma</label>
                                            <FormInput 
                                                id="turma" 
                                                type="text"
                                                placeholder="Turma"
                                                value={formValue.turma}
                                                onChange={text => updateForm("turma", text)}
                                            />
                                        </Col>
                                        <Col md="4" className="form-group">
                                            <label htmlFor="curso">Curso</label>
                                            <FormInput 
                                                id="curso"
                                                type="text"
                                                value={formValue.curso} 
                                                placeholder="curso"
                                                onChange={text => updateForm("curso", text)}
                                            />
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


                                </Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                    <br />
                    <ListGroup flush>
                        <ListGroupItem className="p-3">
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
                                    <Button type="submit">Salvar</Button>  
                                </Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </Form>
            </ContainerFlex>

        </Container>
    )
}


export default NewVacinado;