import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Row extends Component {
  state = {
    id: 0,
    firstName: "",
    secondName: "",
    middleName: "",
    series: null,
    number: null,
    email: "",
    telephone: ""
    // mode: "read"
  };

  deletePerson = () => {
    this.props.deletePerson(this.props.id);
  };

  componentDidMount() {
    this.setState({
      ...this.props.person
    });
  }

  render() {
    return (
      <tr>
        <td>{this.state.firstName}</td>
        <td>{this.state.secondName}</td>
        <td>{this.state.middleName}</td>
        <td>{this.state.series}</td>
        <td>{this.state.number}</td>
        <td className="text-wrap text-break">{this.state.email}</td>
        <td>{this.state.telephone}</td>
        <td>
          <Link to={`/edit/${this.state.id}`} className="btn btn-warning">
            Изменить
          </Link>
        </td>
        <td>
          <button className="btn btn-danger" onClick={this.deletePerson}>
            Удалить
          </button>
        </td>
      </tr>
    );
  }
}
