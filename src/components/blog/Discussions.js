import React, { useEffect, useState, } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Row,
  Col
} from "shards-react";
import Api from '../../Api';
import Lottie from 'react-lottie';
import Animation from '../../assets/61372-404-error-not-found.json';

const Discussions = ({  history, users, reloadUsers }) => {

  const [usuarios, setUsuarios] = useState([]);
  const [apagando, setApagando] = useState(false);

  useEffect(() => {
    if(users.length){
      setUsuarios(users)
    };
  }, [users]);


  const generateData = date => {
    let nd = date.split(" ")[0].split("-");
    let nh = date.split(" ")[1];

    return `${nd[2]}/${nd[1]}/${nd[0]} ás ${nh}`;
  }

  const deleteRegistro = async (userId) => {
    if(!apagando){
      setApagando(true);
      let response = await Api.AuthRequest(`vacinados/destroy/${userId}`, null, "GET");
      if(response.success){
        setApagando(false);
        return reloadUsers();
      }else{
        // alert("Error");
      }
    }
  }

  return (
    <Card small className="blog-comments">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Últimos vacinados</h6>
      </CardHeader>

      <CardBody className="p-0">
        {usuarios.length ? usuarios.map((user, idx) => (
          <div key={idx} className="blog-comments__item d-flex p-3">
            
            <div className="blog-comments__avatar mr-3">
              <img src={user.path} alt={user.nome} />
            </div>

            <div className="blog-comments__content">
              
              <div className="blog-comments__meta text-mutes">
                <span className="text-secondary" >
                  {user.nome} foi cadastrado  
                </span>
                <span className="text-mutes"> - {generateData(user.created_at)}</span>
              </div>

              
              <p className="m-0 my-1 mb-2 text-muted">Esse úsuario se cadastrou recentemente</p>

              
              <div className="blog-comments__actions">
                <ButtonGroup size="sm">
                  <Button onClick={() => deleteRegistro(user.id)} theme="white">
                    <span className="text-danger">
                      <i className="material-icons">clear</i>
                    </span>{" "}
                    Apagar registro
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        )) : (
          <div style={{width: '100%', height: 300, display:"flex", justifyContent: "center",alignItems: "center", flexDirection: "column"}}>
            <Lottie 
                options={{
                    loop: true,
                    autoplay: true, 
                    animationData: Animation,
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice'
                    }
                }}
                height={200}
                width={200}
            />

            <span style={{fontSize: 20}}>Nehum resultado</span>

          </div>
        )}
      </CardBody>

      <CardFooter className="border-top">
        <Row>
          <Col className="text-center view-report">
            <Button onClick={() => history.replace("alunos/listar", "urlhistory")} theme="white" type="submit">
              Ver Todos
            </Button>
          </Col>
        </Row>
      </CardFooter>
    </Card>

  )
}
  



// Discussions.propTypes = {
//   /**
//    * The component's title.
//    */
//   title: PropTypes.string,
//   /**
//    * The discussions dataset.
//    */
//   discussions: PropTypes.array
// };

// Discussions.defaultProps = {
//   title: "Discussions",
//   discussions: [
//     {
//       id: 1,
//       date: "3 days ago",
//       author: {
//         image: require("../../images/avatars/1.jpg"),
//         name: "John Doe",
//         url: "#"
//       },
//       post: {
//         title: "Hello World!",
//         url: "#"
//       },
//       body: "Well, the way they make shows is, they make one show ..."
//     },
//     {
//       id: 2,
//       date: "4 days ago",
//       author: {
//         image: require("../../images/avatars/2.jpg"),
//         name: "John Doe",
//         url: "#"
//       },
//       post: {
//         title: "Hello World!",
//         url: "#"
//       },
//       body: "After the avalanche, it took us a week to climb out. Now..."
//     },
//     {
//       id: 3,
//       date: "5 days ago",
//       author: {
//         image: require("../../images/avatars/3.jpg"),
//         name: "John Doe",
//         url: "#"
//       },
//       post: {
//         title: "Hello World!",
//         url: "#"
//       },
//       body: "My money's in that office, right? If she start giving me..."
//     }
//   ]
// };

export default Discussions;
