import React from "react";
import { Col } from "shards-react";

const PageTitle = props => {

  return (
    <Col xs="12" sm="4" className="text-center text-md-left mb-sm-0">
      <span className="text-uppercase page-subtitle">ALUNO</span>
      <h3 className="page-title">Perfil do aluno</h3>
    </Col>
  )
  
};

export default PageTitle;