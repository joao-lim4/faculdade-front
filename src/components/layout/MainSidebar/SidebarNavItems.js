import React from "react";
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";
import { Store } from "../../../flux";

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      navItems: Store.getSidebarItems(),
      user: null
    };


    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.state.user = JSON.parse(localStorage.getItem("__User"));
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      navItems: Store.getSidebarItems()
    });
  }

  render() {
    const { navItems: items } = this.state;
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {items.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}

          {this.state.user !== null && this.state.user.nivel_id < 3 ? (
            <div style={{width: "100%"}}>
              <div style={{width: "100%", textAlign: "center", marginBottom: 0}}>
                <span style={{opacity: 0.7}}>PRIVILÉGIOS</span>
              </div>
                {this.state.user.nivel.nome === "Master" ? (
                  <>
                    <SidebarNavItem key={99} item={{
                        title: "Logs",
                        htmlBefore: '<i class="material-icons">earbuds</i>',
                        to: "/usuarios/logs",
                      }}
                    />   
                    <SidebarNavItem key={101} item={{
                        title: "Úsuarios",
                        htmlBefore: '<i class="material-icons">manage_accounts</i>',
                        to: "/usuarios/listar",
                      }}
                    />  
                  </>
                ) : false
                }
                {this.state.user.nivel.nome === "Master" || this.state.user.nivel.nome === "Admin" ? (
                  <SidebarNavItem key={100} item={{
                      title: "Novo Usuario",
                      htmlBefore: '<i class="material-icons">person_add_alt_1</i>',
                      to: "/funcionalidades/novo-usuario",
                    }}
                  />
                ) : false
                }
            </div>
          ) : false

          }
        </Nav>
      </div>
    )
  }
}

export default SidebarNavItems;
