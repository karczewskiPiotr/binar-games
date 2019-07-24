import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class UserProfile extends Component {
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
    return <div className="profile"> czosnek </div>;
  }
}

export default UserProfile;
ReactDOM.render(
  <UserProfile />,
  document.getElementsByClassName("userProfile")[0]
);
