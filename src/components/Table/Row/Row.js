import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Row extends Component {
  state = {
    article: "",
    chipset: "",
    date: null,
    formFactor: "",
    price: null
  };

  componentDidMount() {
    this.setState({
      ...this.props.item
    });
  }

  render() {
    const fromTimestamp = new Date(this.state.date);
    const time = `${fromTimestamp.getHours()}:${fromTimestamp.getMinutes()}`;
    const date =
      fromTimestamp.getDate() < 10
        ? "0" + fromTimestamp.getDate()
        : fromTimestamp.getDate();
    const month = fromTimestamp.getMonth();
    const monthForTime = month + 1 < 10 ? "0" + (month + 1) : month + 1;
    const year = fromTimestamp.getFullYear();
    const dateString = `${date}.${monthForTime}.${year}`;

    return (
      <tr>
        <td className="text-wrap text-break">{this.state.title}</td>
        <td>{this.state.article}</td>
        <td>
          {time}
          <br></br>
          {dateString}
        </td>
        {this.props.match.params.type === "motherboards" ? (
          <>
            <td>{this.state.chipset}</td>
            <td>{this.state.formFactor}</td>
          </>
        ) : null}
        {this.props.match.params.type === "videoCards" ? (
          <>
            <td>{this.state.videoMemory}</td>
          </>
        ) : null}
        {this.props.match.params.type === "processors" ? (
          <>
            <td>{this.state.chipset}</td>
            <td>{this.state.cores}</td>
            <td>{this.state.frequency}</td>
          </>
        ) : null}
        <td>{this.state.price}</td>
        <td>
          <Link
            to={`/${this.props.match.params.type}/edit/${this.state.id}`}
            className="btn btn-warning"
          >
            Изменить
          </Link>
        </td>
      </tr>
    );
  }
}

export default withRouter(Row);
