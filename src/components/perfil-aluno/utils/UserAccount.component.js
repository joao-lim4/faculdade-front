import React from "react";
import {
  Card,
  CardHeader,
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



const UserAccountDetails = ({props, formValue, updateForm, salvarVacinado, saveImage, setModalEscolha, nameFile}) => {


   

	return (
		<Card small className="mb-4">
			<CardHeader className="border-bottom">
				<h6 className="m-0">Informações do usuario</h6>
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
													<option>Sexo</option>
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
												<label htmlFor="pais">Pais</label>
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
												<label htmlFor="Assintomatico">Assintomatico:</label>
												<label htmlFor="Assintomatico">Essa informação deve ser marcada caso o aluno em algum momento da pandemia ele teve o Covid-19 porém foi um caso assintomatico onde ele coseguiu se recuperar rapidamente. ( Tabém deve marcar caso o aluno tenha pego a covid-19 e so soube que pegou algum tempo depois, atraves de exames. )  </label>
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
												<label htmlFor="Infectado">Essa informação deve ser marcada caso o aluno tenha pego o covid-19 não sendo um caso assintomatico. Ou seja caso o aluno tenho e pego e ficado mal, marque a opção SIM. </label>
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
												<label htmlFor="Bebida">Bebida alcoolica:</label>
												<label htmlFor="Bebida">Essa informação deve ser marcada caso o aluno que tenha sido vacinado e tenha feito uso de bebida alcoolica antes ou depois da vacina em um intevalo de tempo de 14 dias.</label>
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
										<Button type="submit">Atualizar</Button>  
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
