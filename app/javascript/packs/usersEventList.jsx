import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class UsersEventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      addedUsers: [],
      users: []
    };
  }

  componentWillMount() {
    axios
      .get("/api/v1/users.json", {}, { "Content-Type": "application/json" })
      .then(res => {
        this.setState({
          users: res.data.data
        });
      });
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    this.setState({ addedUsers: [...this.state.addedUsers, this.state.value] });
    alert("new user was added");
    event.preventDefault();
  };

  render() {
    const { value, users, addedUsers } = this.state;
    return (
      <form>
        <label>
          Users:
          <select value={value} onChange={this.handleChange}>
            {users.map(user => (
              <option key={user.id} value={user.nick}>
                {user.nick}
              </option>
            ))}
          </select>
        </label>
        <button onClick={this.handleSubmit}>Add user</button>
        {addedUsers.map(addedUser => (
          <li>{addedUser}</li>
        ))}
      </form>
    );
  }
}

ReactDOM.render(
  <UsersEventList />,
  document.getElementsByClassName("users-list")[0]
);
