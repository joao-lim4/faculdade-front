import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    Row,
    Col,
    Container,
    Button
} from "shards-react";
import PageTitle from './utils/PageTitle.component';
import UserDetails from './utils/UserDetails.component';
import UserAccountDetails from './utils/UserAccount.component';
import Api from '../../Api';
import Webcam from "react-webcam";
import {  Modal, ContainerText, ContainerFlexModal, ContainerItem, ContainerWebCan, ContainerImagePreView  } from '../new-vacinado/Style';
import { IoIosFolder, IoMdCamera, IoMdClose, IoIosImages } from 'react-icons/io';
import Lottie from 'react-lottie';
import Animation from '../../assets/61372-404-error-not-found.json';


const getWidth = () => window.innerWidth 
  || document.documentElement.clientWidth 
  || document.body.clientWidth;

const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user"
};

const PerfilAluno = ({props, match, history}) => {

    const [formValue, setFormValue] = useState({
        nome: '',
        idade: '', 
        sexo: '', 
        cpf: '', 
        pais: 'Brasil',
        vacinado: 0,
        assintomatico: 0, 
        infectado: 0, 
        bebida: 0,
        email: '',
        contato: '',
    });

    const [loadForm, setLoadForm] = useState(true);

    const [userInfos, setUserInfos] = useState(undefined);
    const [userContent, setUserContent] = useState("");

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
    const [nameFile, setNameFile] = useState("Escolha um arquivo");


    const webcamRef = useRef(null);

    const [FileContent,setFile] = useState(null);


    const [successModal, setSuccessModal] = useState({
        active: false
    });

    const dataURLtoFile = (dataurl, filename) => {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    const updateForm = (key, value, file=false) => {
        let formClone = {...formValue};
        formClone[key] = !file ? value.target.value : value;
        setFormValue(formClone);
    }

    const resetState = () => {
        setFormValue({
            nome: '',
            idade: '', 
            sexo: '', 
            cpf: '', 
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

    const getInitState = async ( ) => {
        let response = await Api.AuthRequest("vacinados/show/" + match.params.id, null, "GET");
        if(response.success){
            setUserInfos(response.data.vacinado);
            setUserContent(response.data.conteudo);
            
            setFormValue({
                nome: response.data.vacinado.nome,
                idade: response.data.vacinado.idade, 
                sexo: response.data.vacinado.sexo, 
                cpf: response.data.vacinado.cpf, 
                pais: response.data.vacinado.pais,
                vacinado: response.data.vacinado.vacinado,
                assintomatico: response.data.vacinado.assintomatico, 
                infectado: response.data.vacinado.infectado, 
                bebida: response.data.vacinado.bebida,
                email: response.data.vacinado.email,
                contato: response.data.vacinado.contato,
            });
            setLoadForm(false);
        }else{
            setUserInfos(null);
        }
    }

    useEffect(() => {
        (async () => {
            let response = await Api.AuthRequest("verificar", null, "GET");
            if(response.sucesso){
                getInitState();
            }else{
                if("status" in response && response.status === 401){
                    history.replace("/sair", "urlhistory");
                }
            }
        })();
    }, []);

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

        return true;
    }

    const salvarVacinado = async e => {
        e.preventDefault();

        if(validateForm()){
            let formData = new FormData();
            if(FileContent !== null){
                formData.append("path", FileContent);
            }

            for(let key in formValue){
                formData.append(String(key), formValue[key]);
            }

            let response = await Api.AuthRequest("vacinados/update/" + match.params.id , formData , "POST", true);
            
            if(response.success){
                setSuccessModal({active: true});
                resetState();
                getInitState();
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

    return (
        <Container fluid className="main-content-container px-4">

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
                <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
            </Row>

            <Row>
                {typeof userInfos === "undefined" ? false : userInfos === null ? (
                    <div style={{width: "100%", height:"75vh", display:'flex', justifyContent: 'center',alignItems: 'center', flexDirection: 'column'}}>
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
                        <span style={{fontSize: 30}}>Aluno não encontrado!</span>
                        <br />
                        <Button
                            theme="white"
                            style={{width: 130, height: 40}}
                            onClick={() => history.replace("/alunos/listar", "urlhistory")}
                        >
                            Voltar
                        </Button>
                    </div>
                ) : (
                    <React.Fragment>
                        <Col lg="4">
                            <UserDetails conteudo={userContent} userInfos={userInfos} />
                        </Col>
                        <Col lg="8">
                            {!loadForm ? (
                                <UserAccountDetails 
                                    formValue={formValue}    
                                    updateForm={(k,v) => updateForm(k,v)}
                                    salvarVacinado={e => salvarVacinado(e)}
                                    saveImage={f => saveImage(f)}
                                    setModalEscolha={v => setModalEscolha(v)}
                                    nameFile={nameFile}
                                />
                            ) : false
                            }
                        </Col>
                    </React.Fragment>
                )
                }
            </Row>
        </Container>
    )
}


export default PerfilAluno;