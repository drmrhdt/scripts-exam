import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import FilterInput from "../FilterInput";
import Row from "./Row";

import * as firebase from "firebase";
import "../../firebase/config";
var db = firebase.firestore();

class Table extends Component {
  state = {
    items: [],
    filterInput: "",
    filteredItems: [],
    sorted: null
  };

  onChangeInputFilter = e => {
    this.setState({ filterInput: e.target.value }, () =>
      this.filterItems(this.state.filterInput)
    );
  };

  filterItems = input => {
    let filteredItems = this.state.items.filter(
      item =>
        item.article.toString().startsWith(input) ||
        item.title.toLowerCase().startsWith(input)
    );
    this.setState({ filteredItems: filteredItems });
  };

  sortByName = () => {
    if (this.state.sortedByName !== "asc") {
      this.setState({ sortedByName: "asc", sortedByDate: null });
    } else {
      this.setState({ sortedByName: "desc", sortedByDate: null });
    }
  };

  sortByDate = () => {
    if (this.state.sortedByDate !== "asc") {
      this.setState({ sortedByDate: "asc", sortedByName: null });
    } else {
      this.setState({ sortedByDate: "desc", sortedByName: null });
    }
  };

  componentDidMount() {
    db.collection(`${this.props.match.params.type}`).onSnapshot(snapshot => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      this.setState({ items: items });
    });
  }

  componentDidUpdate(nextProps) {
    if (nextProps.match.params.type !== this.props.match.params.type) {
      db.collection(`${this.props.match.params.type}`).onSnapshot(snapshot => {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        this.setState({ items: items });
      });
    } else {
      return false;
    }
  }

  componentWillUnmount() {
    this.setState({ items: [], filteredItems: [] });
  }

  render() {
    let { items } = this.state;
    if (this.state.filteredItems.length) {
      items = this.state.filteredItems;
    }

    const sortedByName =
      this.state.sortedByName === "asc"
        ? items
            .sort((a, b) => a.title.localeCompare(b.title))
            .map(item => <Row key={item.id} item={item} />)
        : items
            .sort((a, b) => b.title.localeCompare(a.title))
            .map(item => <Row key={item.id} item={item} />);

    const sortedByDate =
      this.state.sortedByDate === "asc"
        ? items
            .sort((a, b) => b.date - a.date)
            .map(item => <Row key={item.id} item={item} />)
        : items
            .sort((a, b) => a.date - b.date)
            .map(item => <Row key={item.id} item={item} />);

    return (
      <div>
        <div className="d-flex align-items-center flex-wrap mb-4">
          <FilterInput
            filterInput={this.state.filterInput}
            onChangeInputFilter={this.onChangeInputFilter}
          />
          <div className="d-flex align-items-center">
            <span className="mx-3">Сортировать по</span>
            <button
              to={`/${this.props.match.params.type}/add`}
              className="btn btn-outline-warning"
              onClick={this.sortByName}
            >
              По названию
            </button>
            <button
              to={`/${this.props.match.params.type}/add`}
              className="btn btn-outline-warning"
              onClick={this.sortByDate}
            >
              По дате
            </button>
          </div>
          <Link
            to={`/${this.props.match.params.type}/add`}
            className="btn btn-primary ml-auto"
          >
            Добавить
          </Link>
        </div>
        <table className="table table-hover text-center table-striped mx-auto table-dark table-responsive-sm table-responsive-md table-responsive-lg">
          <thead className="text-light">
            <tr>
              <th>Название</th>
              <th>Артикул</th>
              <th>Дата добавления</th>
              {this.props.match.params.type === "motherboards" ||
              this.props.match.params.type === "processors" ? (
                <th>Чипсет</th>
              ) : null}

              {this.props.match.params.type === "motherboards" ? (
                <th>Форм-фактор</th>
              ) : null}

              {this.props.match.params.type === "processors" ? (
                <>
                  <th>Количество ядер</th>
                  <th>Частота</th>
                </>
              ) : null}

              {this.props.match.params.type === "videoCards" ? (
                <th>Объем памяти видеокарты</th>
              ) : null}

              <th>Цена</th>
              <th colSpan="2">Управление</th>
            </tr>
          </thead>
          <tbody className="text-light">
            {items && items.length ? (
              this.state.sortedByName ? (
                sortedByName
              ) : this.state.sortedByDate ? (
                sortedByDate
              ) : (
                items.map(item => (
                  <Row key={item.id} id={item.id} item={item} />
                ))
              )
            ) : (
              <tr>
                <td>Пока что нет записей.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(Table);
