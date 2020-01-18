import React, { Component } from "react";
import validator from "email-validator";
import { telephoneReg, seriesReg, numberReg } from "../../regex/regex";
import MaskedInput from "react-text-mask";
import { withRouter, Link } from "react-router-dom";

import * as firebase from "firebase";
import "../../firebase/config";
var db = firebase.firestore();

class Form extends Component {
  state = {
    firstName: "",
    secondName: "",
    middleName: "",
    series: null,
    number: null,
    email: "",
    telephone: ""
  };

  addPerson = () => {
    db.collection("users")
      .add({
        firstName: this.state.firstName,
        secondName: this.state.secondName,
        middleName: this.state.middleName,
        series: this.state.series,
        number: this.state.number,
        email: this.state.email,
        telephone: this.state.telephone
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };

  changePerson = () => {
    db.collection("users")
      .doc(`${this.props.match.params.id}`)
      .update({
        firstName: this.state.firstName,
        secondName: this.state.secondName,
        middleName: this.state.middleName,
        series: this.state.series,
        number: this.state.number,
        email: this.state.email,
        telephone: this.state.telephone
      });
  };

  isDisabled = () => {
    return (
      validator.validate(this.state.email) &&
      this.state.telephone.match(telephoneReg) &&
      this.state.series.match(seriesReg) &&
      this.state.number.match(numberReg) &&
      this.state.firstName &&
      this.state.secondName
    );
  };

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async componentDidMount() {
    if (this.props.mode === "edit") {
      db.collection("users")
        .doc(this.props.match.params.id)
        .get()
        .then(doc => {
          if (doc.exists) {
            this.setState({
              ...doc.data()
            });
          } else {
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    }
  }

  clearInputs = () => {
    this.setState({
      firstName: "",
      secondName: "",
      middleName: "",
      series: null,
      number: null,
      email: "",
      telephone: ""
    });
  };

  componentWillUnmount() {
    this.clearInputs();
  }

  render() {
    const disabled = !this.isDisabled();

    return (
      <div className="w-75 mx-auto pt-4">
        <div className="form-group row">
          <label htmlFor="inputFirstName" className="col-sm-2 col-form-label">
            Имя<span className="red">*</span>
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control bg-secondary text-light"
              id="inputFirstName"
              placeholder="Введите имя"
              value={this.state.firstName}
              name="firstName"
              onChange={this.onChangeInput}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputSecondName" className="col-sm-2 col-form-label">
            Фамилия<span className="red">*</span>
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control bg-secondary text-light"
              id="inputSecondName"
              placeholder="Введите фамилию"
              value={this.state.secondName}
              name="secondName"
              onChange={this.onChangeInput}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputMiddleName" className="col-sm-2 col-form-label">
            Отчество
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control bg-secondary text-light"
              id="inputMiddleName"
              placeholder="Введите отчество"
              value={this.state.middleName}
              name="middleName"
              onChange={this.onChangeInput}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">
            Паспорт<span className="red">*</span>
          </label>
          <div className="col-sm-10">
            <label htmlFor="inputSeries" className="col-sm-2 col-form-label">
              Серия<span className="red">*</span>
            </label>
            <MaskedInput
              mask={[/\d/, /\d/, /\d/, /\d/]}
              guide={true}
              keepCharPositions={true}
              className="form-control bg-secondary text-light "
              id="inputSeries"
              placeholder="0000"
              value={this.state.series}
              name="series"
              onChange={this.onChangeInput}
            />
            <label htmlFor="inputNumber" className="col-sm-2 col-form-label">
              Номер<span className="red">*</span>
            </label>
            <MaskedInput
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
              guide={true}
              keepCharPositions={true}
              className="form-control bg-secondary text-light"
              id="inputNumber"
              placeholder="000000"
              value={this.state.number}
              name="number"
              onChange={this.onChangeInput}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
            Email<span className="red">*</span>
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control bg-secondary text-light"
              id="inputEmail"
              placeholder="example@mail.com"
              value={this.state.email}
              name="email"
              onChange={this.onChangeInput}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputTelephone" className="col-sm-2 col-form-label">
            Телефон<span className="red">*</span>
          </label>
          <div className="col-sm-10">
            <MaskedInput
              mask={[
                "+",
                /[7]/,
                "(",
                /[1-9]/,
                /\d/,
                /\d/,
                ")",
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/
              ]}
              guide={true}
              keepCharPositions={true}
              className="form-control bg-secondary text-light"
              id="inputTelephone"
              placeholder="+7(999)999-99-99"
              value={this.state.telephone}
              name="telephone"
              onChange={this.onChangeInput}
            />
          </div>
        </div>
        {this.props.mode === "edit" ? (
          disabled ? (
            <button className="disabled btn btn-primary" disabled>
              Сохранить
            </button>
          ) : (
            <Link
              to="/"
              className="btn btn-primary"
              onClick={this.changePerson}
            >
              Сохранить
            </Link>
          )
        ) : disabled ? (
          <button className="disabled disabled-btn btn btn-primary" disabled>
            Добавить
          </button>
        ) : (
          <Link to="/" className="btn btn-primary" onClick={this.addPerson}>
            Добавить
          </Link>
        )}
      </div>
    );
  }
}

export default withRouter(Form);
