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
      .get("/api/v1/users", {}, { "Content-Type": "application/json" })
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
    if (this.state.addedUsers.length < 4) {
      this.setState({
        addedUsers: [
          ...this.state.addedUsers,
          this.state.users.find(user => user.nick === this.state.value)
        ]
      });
    } else {
      alert("number of players is already enough");
    }
    event.preventDefault();
  };

  render() {
    const { value, users, addedUsers } = this.state;
    return (
      <>
        <div className="users">
          <div className="users-label">Users</div>
          <select
            value={value}
            onChange={this.handleChange}
            className="users-select"
          >
            {users.map(user => (
              <option
                className="users-select-option"
                key={user.id}
                value={user.nick}
              >
                {user.nick}
              </option>
            ))}
          </select>
          <button onClick={this.handleSubmit} className="users-select-button">
            Add
          </button>
        </div>
        {addedUsers.map(addedUser => (
          <React.Fragment key={addedUser.id}>
            <li className="users-select-list">{addedUser.nick}</li>
            <input
              type="hidden"
              name="event[user_ids][]"
              value={addedUser.id}
            />
          </React.Fragment>
        ))}
      </>
    );
  }
}

ReactDOM.render(
  <UsersEventList />,
  document.getElementsByClassName("users-list")[0]
);
