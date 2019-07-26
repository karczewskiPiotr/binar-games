import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import cup from "../../../winner-cup.png";
import star from "../../../star.png";
import event from "../../../event.png";
import ReactTooltip from "react-tooltip";

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
          <ReactTooltip />
          <h1 className="profile-header">Your Profile</h1>
          <div className="row profile-card-out">
            <div className="profile-card">
              <div className="profile-card-background">
                <img
                  className="profile-card-img"
                  src={this.state.users.avatar}
                  alt="user avatar"
                />
              </div>
              <div className="profile-card-nick">
                <h2>{this.state.users.nick}</h2>
              </div>
              <div className="row">
                <img
                  className="profile-card-star"
                  src={star}
                  data-tip="your points"
                />
                <div className="profile-card-points">
                  {" "}
                  : {this.state.users.points}{" "}
                </div>
                <img
                  className="profile-card-cup"
                  src={cup}
                  data-tip="your ranking position"
                />
                <div className="profile-card-ranking">: 0</div>
              </div>
              <div className="row">
                <img
                  className="profile-card-event"
                  src={event}
                  data-tip="your last few events"
                />
                <div className="profile-card-events" />
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
