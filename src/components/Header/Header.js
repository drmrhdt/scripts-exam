import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <nav className="w-100 d-flex justify-content-between mx-auto mb-4">
        <NavLink to="/main" activeStyle={{ color: "#ffffff" }}>
          Информация
        </NavLink>
        <NavLink to="/motherboards" activeStyle={{ color: "#ffffff" }}>
          Материнские платы
        </NavLink>
        <NavLink to="/videoCards" activeStyle={{ color: "#ffffff" }}>
          Видеокарты
        </NavLink>
        <NavLink to="/processors" activeStyle={{ color: "#ffffff" }}>
          Процессоры
        </NavLink>
      </nav>
    );
  }
}
