import React, {useState, useEffect} from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import UsersOverview from "./../components/blog/UsersOverview";
import Discussions from "./../components/blog/Discussions";

import Api from '../Api';

const BlogOverview = (props) => {

	const [smallStats, setSmallTats] = useState([]);
	const [chart, setChart] = useState(null);
	const [users, setUsers] = useState(null);



	const getSmallTats = async () => {
		let response = await Api.AuthRequest("statisticas/small-list", null, "GET");
		if(response.success){
			setSmallTats([
				response.data.total_users,
				response.data.total_vacinados_hoje,
				response.data.total_users_otem,
				response.data.total_vacinados,
				response.data.total_docs,
			]);
		}
	}


	const getChart = async () => {
		let response = await Api.AuthRequest("statisticas/chart-vacinados", null, "GET");
		if(response.success){
			setChart(response.data.chartData);
		}
	}

	const getUsers = async () => {
		let response = await Api.AuthRequest("statisticas/ultimos", null, "GET");
		if(response.success){
			setUsers(response.data.vacinados);
		}
	}

	const reloadAll = () => {
		getSmallTats();
		getChart();
		getUsers();
	}

	useEffect(() => {
		(async () => {
			let response = await Api.AuthRequest("verificar", null, "GET");
			if(response.sucesso){
				getSmallTats();
				getChart();
				getUsers();
			}else{
				if("status" in response && response.status === 401){
					props.history.replace("/sair", "urlhistory");
				}
			}
		})();
	}, []);


  	return (
		<Container fluid className="main-content-container px-4">
			{/* Page Header */}
			<Row noGutters className="page-header py-4">
				<PageTitle title="DashBoard" subtitle="Dashboard" className="text-sm-left mb-3" />
			</Row>

			{/* Small Stats Blocks */}
			<Row>
			{smallStats.length ? smallStats.map((stats, idx) => (
				<Col className="col-lg mb-4" key={idx}>
				<SmallStats
					id={`small-stats-${idx}`}
					variation="1"
					chartData={stats.datasets}
					chartLabels={stats.chartLabels}
					label={stats.label}
					value={stats.value}
					percentage={stats.percentage}
					increase={stats.increase}
					decrease={stats.decrease}
				/>
				</Col>
			)) : false}
			</Row>

			<Row>
			{/* Users Overview */}
			{chart !== null ? (
				<Col lg="8" md="12" sm="12" className="mb-4">
					<UsersOverview chartData={chart} />
				</Col>
			) : false
			}

			{users !== null ? (
				<Col lg="4" md="6" sm="12" className="mb-4">
					<Discussions {...props} users={users} reloadUsers={() => reloadAll()}/>
				</Col>
			) : false

			}
			</Row>
		</Container>
  	)

};


export default BlogOverview;
