import React from "react";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";

const UserDetails = ({props, userInfos, conteudo}) => {

    return (

        <Card small className="mb-4 pt-3">
            <CardHeader className="border-bottom text-center">
                <div className="mb-3 mx-auto">
                    <img
                    className="rounded-circle"
                    src={userInfos.path}
                    alt={userInfos.nome}
                    width="110"
                    />
                </div>
                <h4 className="mb-0">{userInfos.nome}</h4>
                <span className="text-muted d-block mb-2">{userInfos.email}</span>
            </CardHeader>
            <ListGroup flush>
            <ListGroupItem className="px-4">
                <div className="progress-wrapper">
                <strong className="text-muted d-block mb-2">
                    Informações do úsuario
                </strong>
                <Progress
                    className="progress-sm"
                    value={100}
                >
                    <span className="progress-value">
                    {100}%
                    </span>
                </Progress>
                </div>
            </ListGroupItem>
            </ListGroup>
        </Card>
    )
}


export default UserDetails;
