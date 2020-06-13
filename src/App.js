import React, { Component } from "react";
import axios from "axios";

export class App extends Component {
  state = {
    todoList: [],
    task: "",
  };
  getTaskInput = (e) => {
    this.setState({ task: e.target.value });
  };
  addItem = (e) => {
    let title = this.state.task;
    axios.post("http://localhost:3001/Tasks", { title }).then((res) => {
      console.log(res);
    });
    window.location.reload(false);
  };
  /****** DELETE ************ */
  removeItem = (id) => {
    axios.delete(`http://localhost:3001/Tasks/${id}`).then((res) => {
      console.log(res.data);
    });
    window.location.reload(false);
  };

  componentDidMount() {
    axios.get("http://localhost:3001/Tasks").then((response) => {
      this.setState({ todoList: response.data });
    });
  }
  render() {
    return (
      <div className="app">
        <input
          type="text"
          placeholder="Write your task..."
          onChange={this.getTaskInput}
        />
        <button onClick={this.addItem}>+</button>
        <ul>
          {this.state.todoList.map((el) => (
            <span className="task" key={el.id}>
              <li>{el.title}</li>
              <button onClick={() => this.removeItem(el.id)}>-</button>
            </span>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
