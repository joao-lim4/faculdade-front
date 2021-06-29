import React, { useEffect, useState } from 'react';
import {
    Row,
    Button,
    Container,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from "shards-react";
import PageTitle from '../common/PageTitle';
import Api from '../../Api';
import Lottie from 'react-lottie';
import Animation from '../../assets/61372-404-error-not-found.json';


const MeusArquivosComponent = ({props, history}) => {

    const [files, setFiles] = useState(undefined);

    const openFile = (uri) => {
        return window.open(uri, "_blank");
    }


    useEffect(() => {
        (async () => {
            let response = await Api.AuthRequest("verificar", null, "GET");
			if(response.sucesso){
                let res = await Api.AuthRequest("documento/listar", null, "GET");
                if(res.success){
                    setFiles(res.data.documentos);
                }else{
                    setFiles(null);
                }
			}else{
				if("status" in response && response.status === 401){
					history.replace("/sair", "urlhistory");
				}
			}
        })();
    }, []);
    
    const generateNome = nome => {
        return nome.split("files/")[1];
    }


    return (
        <Container style={{minHeight:"90vh"}}>
            <Row noGutters className="page-header py-4">
                <PageTitle title="Seus documentos" subtitle="DOCUMENTOS" md="12" className="ml-sm-auto mr-sm-auto" />
            </Row>

            <Row>
                {typeof files !== "undefined"  ? files === null ? (
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
                        <span style={{fontSize: 30}}>Nenhum arquivo encontrado!</span>
                    </div>
                ) : files.length ? files.map((v,i) => {
                    return (
                        <Card className="mr-4 mb-4" style={{width: 350, maxHeight: 299}}>
                            <CardHeader>
                                {generateNome(v.path)}
                            </CardHeader>

                            <CardBody align="center">
                                {v.type === "xlsx" ? (
                                        <img alt="tipo do arquivo xlsx" src="/xls.png"  style={{height: 100}}/>
                                    ) : (
                                        <img alt="tipo do arquivo pdf" src="/pdf.png"  style={{height: 100}}/>
                                    ) 
                                }
                            </CardBody>
                            <hr  style={{margin: 0}}/>
                            <CardFooter>
                                <Button onClick={() => openFile(v.path)} theme="white">
                                    {v.type === "xlsx" ?  (
                                            <i className="material-icons mr-1" style={{fontSize: 14}}>file_download</i>
                                        ) : (
                                            <i className="material-icons mr-1" style={{fontSize: 14}}>visibility</i>
                                        )
                                    }
                                    {v.type === "xlsx" ? "Baixar arquivo" : "Visualizar arquivo"}
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                }) : (
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
                        <span style={{fontSize: 30}}>Nenhum arquivo encontrado!</span>
                    </div>
                ) : false
                }
            </Row>

        </Container>
    )
}


export default MeusArquivosComponent;