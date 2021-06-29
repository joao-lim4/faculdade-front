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

const getWidth = () => window.innerWidth 
  || document.documentElement.clientWidth 
  || document.body.clientWidth;

const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user"
};


const NewUsuarioComponent = ({props, match, history}) => {
    const [formValue, setFormValue] = useState({
        name: "",
        password: "",
        password_confirm: "",
        email: "",
        nivel_id: "",
    });

    const [pathUser, setPathUser] = useState("https://www.camargoecamposrh.com.br/wp-content/uploads/2017/05/default-user.png")

    const [key, setKey] = useState({
        key: "Fomulário não assinado",
        active: false,
        __key: ""
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
            name: "",
            password: "",
            password_confirm: "",
            email: "",
        });
        setImageProps({
            base64: "",
            active: false
        });
        setFile(null);
        setNameFile("Escolha um arquivo");
        setKey({
            key: "Fomulário não assinado",
            active: false,
            __key: ""
        });
        setPathUser("https://www.camargoecamposrh.com.br/wp-content/uploads/2017/05/default-user.png");
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


    useEffect(() => {
        (async () => {
            let response = await Api.AuthRequest("verificar", null, "GET");
            if("status" in response && response.status === 401){
                history.replace("/sair", "urlhistory");
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
                
                setPathUser(imageSrc)

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

        if(formValue.password !== '' && formValue.password_confirm !== ''){
            if(formValue.password !== formValue.password_confirm){
                return "As senhas não conferem!"
            }
        }else{
            if(formValue.password !== "" && formValue.password_confirm === ""){
                return "O campo Senha deve ser preenchido!";
            }

            if(formValue.password_confirm !== '' && formValue.password === ""){
                return "As senhas não conferem!";
            }
        }

        if(formValue.path === "https://www.camargoecamposrh.com.br/wp-content/uploads/2017/05/default-user.png"){
            return "Insira um foto do úsuario";
        }

        for(let key in formValue){
            if(key !== "password" && key !== "password_confirm" ){
                if(formValue[key] === ""){
                    return false;
                }
            }
        }

        return true;
    }

    const salvarVacinado = async e => {
        e.preventDefault();

        if(!key.active || key.key === "Fomulário não assinado" || key.__key === ""){
            return setError({
                error: true,
                message: "Assine o formulário para continuar!"
            });
        }
        let validate = validateForm()
        if(validate === true){
            let formData = new FormData();

            if(FileContent !== null){
                formData.append("path", FileContent);
            }

            formData.append("key", key.__key);
            let user = JSON.parse(localStorage.getItem("__User"));
            if(user){
                formData.append("user_id", user.id);
            }

            for(let key in formValue){
                if(key !== "path"){
                    formData.append(String(key), formValue[key]);
                }
            }

            let response = await Api.AuthRequest("registrar", formData , "POST", true);
            
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
            if(typeof validate === "string"){
                return setError({
                    error: true,
                    message: validate
                })
            }else{
                setError({
                    error: true,
                    message: "Preencha todos os campos para continuar!"
                });
            }
        }
        
    }

    const saveImage = f => {
        if(typeof f !== "undefined"){
            setNameFile(f.name.split(".")[0]);
            if(f instanceof File){
                setFile(f);
    
                var reader  = new FileReader();
    
                reader.onloadend = function () {
                    setPathUser(reader.result);
                }
    
                if (f) {
                    reader.readAsDataURL(f);
                } else {
                    updateForm("path","https://www.camargoecamposrh.com.br/wp-content/uploads/2017/05/default-user.png", true );
                }
            }else{
                setFile(null);
            }
        }
    }

    const gerarKey = async () => {
        let response = await Api.AuthRequest("key/generate", null, "GET");
        if(response.success){
            setKey({
                active: true,
                key: "Formulário asssinado com " + response.data.key,
                __key: response.data.key
            });
        }else{
            setError({
                error: true,
                message: "Error ao assinar o formulãrio!"
            });
            resetState();
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
                <PageTitle title="Perfil do úsuario" subtitle="PERFIL" md="12" className="ml-sm-auto mr-sm-auto" />
            </Row>

            <Row>
                <Col lg="4">
                    <UserDetails path={pathUser} userInfos={formValue} />
                </Col>
                <Col lg="8">
                    <UserAccountDetails 
                        formValue={formValue}    
                        updateForm={(k,v) => updateForm(k,v)}
                        salvarVacinado={e => salvarVacinado(e)}
                        saveImage={f => saveImage(f)}
                        setModalEscolha={v => setModalEscolha(v)}
                        nameFile={nameFile}
                        keyValue={key}
                        gerarKey={() => gerarKey()}
                    />
                </Col>
            </Row>
        </Container>
    )
}


export default NewUsuarioComponent