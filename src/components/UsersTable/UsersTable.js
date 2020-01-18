import React, { Component } from "react";
import FilterInput from "../FilterInput";
import List from "../List";

import * as firebase from "firebase";
import "../../firebase/config";
var db = firebase.firestore();

export default class UsersTable extends Component {
  state = {
    people: [],
    filterInput: "",
    filteredPeople: []
  };

  onChangeInputFilter = e => {
    this.setState({ filterInput: e.target.value }, () =>
      this.filterPeople(this.state.filterInput)
    );
  };

  deletePerson = id => {
    this.setState(prevState => ({
      people: prevState.people.filter(person => person.id !== id)
    }));
    this.setState(prevState => ({
      filteredPeople: prevState.filteredPeople.filter(
        person => person.id !== id
      )
    }));

    db.collection("users")
      .doc(`${id}`)
      .delete();
  };

  filterPeople = input => {
    let filteredPeople = this.state.people.filter(
      person =>
        person.firstName.toLowerCase().startsWith(input) ||
        person.secondName.toLowerCase().startsWith(input)
    );
    this.setState({ filteredPeople: filteredPeople });
  };

  componentDidMount() {
    db.collection("users").onSnapshot(snapshot => {
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      this.setState({ people: users });
    });
  }

  componentWillUnmount() {
    this.setState({ people: [], filteredPeople: [] });
  }

  render() {
    let { people } = this.state;
    if (this.state.filteredPeople.length) {
      people = this.state.filteredPeople;
    }

    return (
      <div>
        <FilterInput
          filterInput={this.state.filterInput}
          onChangeInputFilter={this.onChangeInputFilter}
        />
        <table className="table table-hover table-striped mx-auto table-dark">
          <thead className="text-light">
            <tr>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Отчество</th>
              <th>Серия</th>
              <th>Номер</th>
              <th>Почта</th>
              <th>Телефон</th>
              <th colSpan="2">Управление</th>
            </tr>
          </thead>
          <tbody className="text-light">
            {people && people.length ? (
              <List people={people} deletePerson={this.deletePerson} />
            ) : (
              <tr>
                <td>Пока что не записей.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
