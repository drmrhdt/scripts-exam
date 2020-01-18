import React, { Component } from "react";
import Row from "../UsersTable/Row";

export default class List extends Component {
  render() {
    return this.props.people.map(person => (
      <Row
        key={person.id}
        id={person.id}
        person={person}
        deletePerson={this.props.deletePerson}
        changePerson={this.props.changePerson}
      />
    ));
  }
}
