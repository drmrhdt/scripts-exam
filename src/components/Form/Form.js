import React, { Component } from "react";
import MaskedInput from "react-text-mask";
import { withRouter, Link } from "react-router-dom";

import * as firebase from "firebase";
import "../../firebase/config";
var db = firebase.firestore();

class Form extends Component {
  state = {
    videoMemory: null,
    title: "",
    chipset: "",
    article: null,
    formFactor: "",
    price: null,
    type: this.props.match.params.type,
    cores: null,
    frequency: null
  };

  addItem = () => {
    if (this.props.match.params.type === "motherboards") {
      db.collection(`${this.props.match.params.type}`).add({
        price: this.state.price,
        article: this.state.article,
        formFactor: this.state.formFactor,
        title: this.state.title,
        chipset: this.state.chipset,
        date: Date.now()
      });
    } else if (this.props.match.params.type === "processors") {
      db.collection(`${this.props.match.params.type}`).add({
        price: this.state.price,
        article: this.state.article,
        cores: this.state.cores,
        title: this.state.title,
        frequency: this.state.frequency,
        chipset: this.state.chipset,
        date: Date.now()
      });
    } else if (this.props.match.params.type === "videoCards") {
      db.collection(`${this.props.match.params.type}`).add({
        price: this.state.price,
        article: this.state.article,
        videoMemory: this.state.videoMemory,
        title: this.state.title,
        date: Date.now()
      });
    }
  };

  updateItem = () => {
    if (this.props.match.params.type === "motherboards") {
      db.collection(`${this.props.match.params.type}`)
        .doc(`${this.props.match.params.id}`)
        .update({
          price: this.state.price,
          article: this.state.article,
          formFactor: this.state.formFactor,
          title: this.state.title,
          chipset: this.state.chipset,
          date: Date.now()
        });
    } else if (this.props.match.params.type === "processors") {
      db.collection(`${this.props.match.params.type}`)
        .doc(`${this.props.match.params.id}`)
        .update({
          price: this.state.price,
          article: this.state.article,
          cores: this.state.cores,
          title: this.state.title,
          frequency: this.state.frequency,
          chipset: this.state.chipset,
          date: Date.now()
        });
    } else if (this.props.match.params.type === "videoCards") {
      db.collection(`${this.props.match.params.type}`)
        .doc(`${this.props.match.params.id}`)
        .update({
          price: this.state.price,
          article: this.state.article,
          videoMemory: this.state.videoMemory,
          title: this.state.title,
          date: Date.now()
        });
    }
  };

  deleteItem = () => {
    db.collection(`${this.props.match.params.type}`)
      .doc(`${this.props.match.params.id}`)
      .delete();
  };

  isDisabled = () => {
    if (this.props.match.params.type === "motherboards") {
      return (
        this.state.price &&
        this.state.article &&
        this.state.formFactor &&
        this.state.title &&
        this.state.chipset
      );
    } else if (this.props.match.params.type === "processors") {
      return (
        this.state.price &&
        this.state.article &&
        this.state.cores &&
        this.state.title &&
        this.state.frequency &&
        this.state.chipset
      );
    } else if (this.props.match.params.type === "videoCards") {
      return (
        this.state.price &&
        this.state.article &&
        this.state.videoMemory &&
        this.state.title
      );
    }
  };

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state);
    });
  };

  componentDidMount() {
    if (this.props.mode === "edit") {
      db.collection(`${this.props.match.params.type}`)
        .doc(this.props.match.params.id)
        .get()
        .then(doc => {
          if (doc.exists) {
            this.setState({
              ...doc.data()
            });
          }
        });
    }
  }

  render() {
    const disabled = !this.isDisabled();

    return (
      <div className="w-75 mx-auto pt-4">
        <div className="form-group row">
          <label htmlFor="inputTitle" className="col-sm-2 col-form-label">
            Название<span className="red">*</span>
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control bg-secondary text-light"
              id="inputTitle"
              placeholder="Название продукта"
              value={this.state.title}
              name="title"
              onChange={this.onChangeInput}
            />
          </div>
        </div>

        {this.props.match.params.type === "motherboards" ||
        this.props.match.params.type === "processors" ? (
          <div className="form-group row">
            <label htmlFor="inputChipset" className="col-sm-2 col-form-label">
              Чипсет<span className="red">*</span>
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control bg-secondary text-light"
                id="inputChipset"
                placeholder="Чипсет"
                value={this.state.chipset}
                name="chipset"
                onChange={this.onChangeInput}
              />
            </div>
          </div>
        ) : null}

        <div className="form-group row">
          <label htmlFor="inputArticle" className="col-sm-2 col-form-label">
            Артикул<span className="red">*</span>
          </label>
          <div className="col-sm-10">
            <MaskedInput
              mask={[
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/
              ]}
              className="form-control bg-secondary text-light "
              id="inputArticle"
              placeholder="000000000"
              value={this.state.article}
              name="article"
              onChange={this.onChangeInput}
            />
          </div>
        </div>

        {this.props.match.params.type === "motherboards" ? (
          <div className="form-group row">
            <label
              htmlFor="inputFormFactor"
              className="col-sm-2 col-form-label"
            >
              Форм-фактор<span className="red">*</span>
            </label>
            <div className="col-sm-10">
              <input
                className="form-control bg-secondary text-light"
                id="inputFormFactor"
                placeholder="Форм-фактор"
                value={this.state.formFactor}
                name="formFactor"
                onChange={this.onChangeInput}
              />
            </div>
          </div>
        ) : null}

        {this.props.match.params.type === "processors" ? (
          <>
            <div className="form-group row">
              <label htmlFor="inputCores" className="col-sm-2 col-form-label">
                Количество ядер<span className="red">*</span>
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control bg-secondary text-light"
                  id="inputCores"
                  placeholder="Количество ядер"
                  value={this.state.cores}
                  name="cores"
                  onChange={this.onChangeInput}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="inputFrequency"
                className="col-sm-2 col-form-label"
              >
                Частота<span className="red">*</span>
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control bg-secondary text-light"
                  id="inputFrequency"
                  placeholder="Частота"
                  value={this.state.frequency}
                  name="frequency"
                  onChange={this.onChangeInput}
                />
              </div>
            </div>
          </>
        ) : null}

        {this.props.match.params.type === "videoCards" ? (
          <div className="form-group row">
            <label
              htmlFor="inputVideoMemory"
              className="col-sm-2 col-form-label"
            >
              Объем памяти видеокарты<span className="red">*</span>
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control bg-secondary text-light"
                id="inputVideoMemory"
                placeholder="Oбъем памяти видеокарты"
                value={this.state.videoMemory}
                name="videoMemory"
                onChange={this.onChangeInput}
              />
            </div>
          </div>
        ) : null}

        <div className="form-group row">
          <label htmlFor="inputPrice" className="col-sm-2 col-form-label">
            Цена<span className="red">*</span>
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control bg-secondary text-light"
              id="inputPrice"
              placeholder="цена в рублях"
              value={this.state.price}
              name="price"
              onChange={this.onChangeInput}
            />
          </div>
        </div>

        <>
          {this.props.mode === "edit" ? (
            disabled ? (
              <>
                <button className="disabled btn btn-primary" disabled>
                  Сохранить
                </button>
                <Link
                  to={`/${this.props.match.params.type}`}
                  className="btn btn-danger"
                  onClick={this.deleteItem}
                >
                  Удалить
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={`/${this.props.match.params.type}`}
                  className="btn btn-primary"
                  onClick={this.updateItem}
                >
                  Сохранить
                </Link>
                <Link
                  to={`/${this.props.match.params.type}`}
                  className="btn btn-danger"
                  onClick={this.deleteItem}
                >
                  Удалить
                </Link>
              </>
            )
          ) : disabled ? (
            <button className="disabled disabled-btn btn btn-primary" disabled>
              Добавить
            </button>
          ) : (
            <Link
              to={`/${this.props.match.params.type}`}
              className="btn btn-primary"
              onClick={this.addItem}
            >
              Добавить
            </Link>
          )}
        </>
      </div>
    );
  }
}

export default withRouter(Form);
