import React, { Component } from "react";
import {
  MdFilter1,
  MdFilter2,
  MdFilter3,
  MdFilter4,
  MdFilter5,
  MdFilter6,
  MdFilter7,
  MdFilter8,
  MdFilter9,
  MdFilter9Plus,
  MdAddToPhotos,
  MdAdd
} from "react-icons/md";
import { distanceInWords } from "date-fns";
import pt from "date-fns/locale/pt";

import api from "../../services/api";
import logo from "../../assets/logo.svg";
import "./styles.css";

export default class Main extends Component {
  state = {
    newBox: "",
    boxes: []
  };

  buttonIcons = [
    MdAddToPhotos,
    MdFilter1,
    MdFilter2,
    MdFilter3,
    MdFilter4,
    MdFilter5,
    MdFilter6,
    MdFilter7,
    MdFilter8,
    MdFilter9,
    MdFilter9Plus
  ];

  async componentDidMount() {
    const response = await api.get("boxes/");
    this.setState({ boxes: response.data });
  }

  handleSubmit = async event => {
    event.preventDefault();

    const response = await api.post("box/create", {
      title: this.state.newBox
    });

    this.props.history.push(`/box/${response.data._id}`);
  };

  handleInputChange = event => {
    this.setState({
      newBox: event.target.value
    });
  };

  handleClick = event => {
    //event.preventDefault();
    const boxId = event.target.id;

    this.props.history.push(`/box/${boxId}`);
  };

  render() {
    return (
      <div id="main-container">
        <form onSubmit={this.handleSubmit}>
          <div id="logo">
            <img src={logo} alt="" />
            <p id="logo-text">KusterBox</p>
          </div>
          <input
            type="text"
            placeholder="Criar um box"
            value={this.state.newBox}
            onChange={this.handleInputChange}
          />
          <button type="submit">Criar</button>
        </form>

        <ul>
          {this.state.boxes &&
            this.state.boxes.map(box => (
              <li key={box._id}>
                <a
                  className="fileInfo"
                  href={`/box/${box._id}`}
                  target="_blank"
                >
                  {React.createElement(this.buttonIcons[box.files.length], {
                    size: 24,
                    color: "#A5Cfff",
                    id: box._id
                  })}
                  <strong>{box.title}</strong>
                </a>

                <span>
                  há{" "}
                  {distanceInWords(box.createdAt, new Date(), {
                    locale: pt
                  })}
                </span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
