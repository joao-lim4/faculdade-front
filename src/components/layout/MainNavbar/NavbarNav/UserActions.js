import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

const UserActions = props => {

  const [visible, setVisible] = useState(false);
  const [infos, setInfos] = useState(null);

  useEffect(() => {
    (() => {
      setInfos(JSON.parse(localStorage.getItem("__User")));
    })();
  }, []);


  const toggle = () => {
    setVisible(!visible);
  }


  return (
    <NavItem tag={Dropdown} caret toggle={toggle}>
      <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
        <img
          className="user-avatar rounded-circle mr-2"
          style={{width: 40, height: 40, maxWidth: 40, maxHeight: 40}}
          src={infos === null ? "" : infos.path}
          alt="User Avatar"
        />{" "}
        <span className="d-none d-md-inline-block">{infos === null ? '' : infos.name}</span>
      </DropdownToggle>
      <Collapse tag={DropdownMenu} right small open={visible}>
        {/* <DropdownItem tag={Link} to="user-profile">
          <i className="material-icons">&#xE7FD;</i> Profile
        </DropdownItem> */}
        <DropdownItem tag={Link} to="/usuarios/meu-perfil">
          <i className="material-icons">&#xE8B8;</i> Meu perfil
        </DropdownItem>
        <DropdownItem tag={Link} to="/funcionalidades/meus-arquivos">
          <i className="material-icons">&#xE2C7;</i> Arquivos
        </DropdownItem>
        {/* <DropdownItem tag={Link} to="transaction-history">
          <i className="material-icons">&#xE896;</i> Transactions
        </DropdownItem> */}
        <DropdownItem divider />
        <DropdownItem tag={Link} to="/sair" className="text-danger">
          <i className="material-icons text-danger">&#xE879;</i> Sair
        </DropdownItem>
      </Collapse>
    </NavItem>
  );
}

export default UserActions;
