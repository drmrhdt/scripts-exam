import React, { Component } from "react";

export default class FilterInput extends Component {
  render() {
    return (
      <input
        type="text"
        className="form-control bg-secondary text-light w-100 mb-4"
        id="inputFilter"
        placeholder="Введите первые буквы имени или фамилии..."
        value={this.props.filterInput}
        name="firstName"
        onChange={this.props.onChangeInputFilter}
      />
    );
  }
}
