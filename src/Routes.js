import React from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import { Auth } from './Auth'
import Login from './components/Login/Login.component';
import NewVacinadoView from './views/NewVacinado.view';
import SairView from './views/Sair.view';
import ListarAlunosView from "./views/ListarAlunos.view";
import PerfilAlunoView from "./views/PerilAluno.view";
import LogsView from './views/Log.view';
import GerarDocs from "./views/GerarArquivos.view";
import MeusArquivos from "./views/MeusArquivos.view";
import MeuPerfil from "./views/MeuPerfil.view";
import NewUsuarioView from './views/NewUsuario.view';
import ListarUsuariosView from "./views/ListarUsuarios.view";
import ShowUser from "./views/ShowUser.view";

import Lottie from 'react-lottie';
import Animation from './assets/61372-404-error-not-found.json';


const PrivateRoute = ({component: Component, ...rest}) => {
	
	
	return (
		<Route {...rest} render={ props => {
			return (
				 Auth() ? (
					<DefaultLayout {...props}>
						<Component {...props}/>
					</DefaultLayout>
				) : (
					<Redirect to={{pathname: "/login", state: { from:  props.location }}} />
				)
			)
		}}
		/>
	)
}


const notFound = (props) => {


	return (
		<div style={{width: '100%', height: "100vh", display:"flex", justifyContent: "center",alignItems: "center", flexDirection: "column"}}>
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

			<button className="btn  btn-primary" onClick={() => props.history.replace("/", "urlhistory")}  href="dsad">Voltar para o início</button>

		</div>
	)
}


const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/login" component={Login}/>
				<PrivateRoute exact path="/" component={() => <Redirect to="/dashboard" />} />
				<PrivateRoute exact path="/dashboard" component={BlogOverview}/>
				<PrivateRoute exact path="/usuarios/meu-perfil" component={MeuPerfil}/>
				<PrivateRoute exact path="/usuarios/logs" component={LogsView}/>
				<PrivateRoute exact path="/usuarios/show/id=:id" component={ShowUser}/>
				<PrivateRoute exact path="/usuarios/listar" component={ListarUsuariosView}/>
				<PrivateRoute exact path="/funcionalidades/novo-vacinado" component={NewVacinadoView}/>
				<PrivateRoute exact path="/funcionalidades/gerar-documentos" component={GerarDocs}/>
				<PrivateRoute exact path="/funcionalidades/meus-arquivos" component={MeusArquivos}/>
				<PrivateRoute exact path="/funcionalidades/novo-usuario" component={NewUsuarioView}/>
				<PrivateRoute exact path="/alunos/listar" component={ListarAlunosView}/>
				<PrivateRoute exact path="/alunos/show/id=:id" component={PerfilAlunoView}/>
				<PrivateRoute exact path="/sair" component={SairView} />
				<Route component={notFound}/>
			</Switch>
		</BrowserRouter>
	)
}

export default Routes;
