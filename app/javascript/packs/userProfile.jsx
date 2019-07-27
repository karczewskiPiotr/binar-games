import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ReactTooltip from "react-tooltip";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoding: false
    };
  }

  componentWillMount() {
    axios
      .get("/api/v1/users/current", {}, { "Content-Type": "application/json" })
      .then(res => {
        this.setState({
          users: res.data.data,
          isLoading: true
        });
      });
  }

  render() {
    return <div className="profile" />;
  }
}

export default UserProfile;
ReactDOM.render(
  <UserProfile />,
  document.getElementsByClassName("userProfile")[0]
);
