import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
          users: res.data.data,
          value: res.data.data[0].nick
        });
      });
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    let userToBeAdded = this.state.users.find(
      user => user.nick === this.state.value
    );
    if (this.state.addedUsers.length < 4) {
      if (!this.state.addedUsers.includes(userToBeAdded)) {
        this.setState({
          addedUsers: [...this.state.addedUsers, userToBeAdded]
        });
      }
    } else {
      alert("number of players is already enough");
    }
    event.preventDefault();
  };

  render() {
    const { value, users, addedUsers } = this.state;
    return (
      <>
       
        <div className="col-md-6 ">
          <label className="users-label">Users</label>
        </div>
        <div className="col-md-6 ">
          <select
            value={value}
            onChange={this.handleChange}
            className="users-select"
          >
            {users.map((user, index) => (
              <option
                className="users-select-option"
                key={user.id}
                value={user.nick}
              >
                {user.nick}
              </option>
            ))}
          </select>
          
        </div>
        <div className=" users-btn">
          <button
            onClick={this.handleSubmit}
            className="users-select-button "
          >
            <FontAwesomeIcon icon={faPlusSquare} size="3x"/>
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
