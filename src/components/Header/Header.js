import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <nav className="w-25 d-flex justify-content-between mx-auto mb-4">
        <Link to="/">Список</Link>
        <Link to="/add">Добавить</Link>
      </nav>
    );
  }
}
