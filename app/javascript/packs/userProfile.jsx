import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentWillMount() {
    axios
      .get("/api/v1/users/current", {}, { "Content-Type": "application/json" })
      .then(res => {
        this.setState({
          users: res.data.data
        });
      });
  }

  render() {
    return <div className="profile"> {this.state.users.avatar}</div>;
  }
}

export default UserProfile;
ReactDOM.render(
  <UserProfile />,
  document.getElementsByClassName("userProfile")[0]
);
