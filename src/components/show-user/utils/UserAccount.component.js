import React from "react";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormSelect,
  FormInput,
  Button
} from "shards-react";



const UserAccountDetails = ({props, formValue, updateForm, salvarVacinado, saveImage, setModalEscolha, nameFile, gerarKey, keyValue, gerarSenha}) => {


   

	return (
		<Card small className="mb-4">
			<CardHeader className="border-bottom">
				<h6 className="m-0">Informações do úsuario</h6>
				<h6 className={`m-0 ${keyValue.active ? "text-success" : "text-danger"}`} >{keyValue.key}</h6>
			</CardHeader>
			<ListGroup flush>
				<ListGroupItem className="p-3">
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
													value={formValue.name}
													onChange={text => updateForm("name", text)}
													type="text"
													placeholder="Nome"
												/>
											</Col>
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
												<label htmlFor="Senha">Senha</label>
												<FormInput
													id="Senha"
													value={formValue.password}
													onChange={text => updateForm("password", text)}
													type="password"
													placeholder="Senha"
												/>
											</Col>
											<Col md="4" className="form-group">
												<label htmlFor="passwor_confirm">Confirme a senha</label>
												<FormInput 
													id="passwor_confirm" 
													type="password"
													placeholder="Confirme a senha"
													value={formValue.password_confirm}
													onChange={text => updateForm("password_confirm", text)}
												/>
											</Col>
											<Col md="4" className="form-group">
                                            <label htmlFor="nivel">Nível</label>
                                            <FormSelect 
                                                id="nivel"
                                                value={formValue.nivel_id}
                                                onChange={text => updateForm("nivel_id", text)}
                                            >	
												<option value="">Escolha um nível</option>
												<option value="1">Master</option>
                                                <option value="2">Admin</option>
                                                <option value="3">Colaborador</option>
                                            </FormSelect>
                                        </Col>	
										</Row>
										<Button type="submit">Atualizar</Button>  
										<Button theme="white" onClick={() => gerarKey()} className="ml-3" type="button">Assinar este formulário</Button>  
										<Button theme="white" onClick={() => gerarSenha()} className="ml-3" type="button">Gerar uma nova senha</Button>  

									</Col>
								</Row>

							</ListGroupItem>
						</ListGroup>
					</Form>
				</ListGroupItem>
			</ListGroup>
		</Card>
	)

}

export default UserAccountDetails;
