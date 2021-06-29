import React from "react";
import { Col } from "shards-react";

const PageTitle = ({props, title, subtitle}) => {

  return (
    <Col xs="12" sm="4" className="text-center text-md-left mb-sm-0">
      <span className="text-uppercase page-subtitle">{subtitle}</span>
      <h3 className="page-title">{title}</h3>
    </Col>
  )
  
};

export default PageTitle;