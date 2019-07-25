import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import cup from "../../../winner-cup.png";
import star from "../../../star.png";

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
    return (
      <>
        <div className="profile">
          <h1 className="profile-header">Your Profile</h1>
          <div className="row profile-card-out">
            <div className="profile-card">
              <img
                className="profile-card-img"
                src={this.state.users.avatar}
                alt="user avatar"
              />
              <div className="profile-card-nick">
                <h2>{this.state.users.nick}</h2>
              </div>
              <div className="row">
                <img className="profile-card-star" src={star} />
                <div className="profile-card-points">
                  {" "}
                  : {this.state.users.points}{" "}
                </div>
              </div>
              <div className="row">
                <img className="profile-card-cup" src={cup} />
                <div className="profile-card-ranking">: 0</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UserProfile;
ReactDOM.render(
  <UserProfile />,
  document.getElementsByClassName("userProfile")[0]
);
