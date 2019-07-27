import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import ReactCardFlip from "react-card-flip";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoding: false,
      isFlipped: false
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

  handleClick = e => {
    e.preventDefault();
    this.setState({ isFlipped: !this.state.isFlipped });
  };

  render() {
    return (
      <>
        <div className="profile-header">Your Profile</div>
        <div className="profile">
          {" "}
          <ReactCardFlip
            isFlipped={this.state.isFlipped}
            flipSpeedBackToFront={0.1}
            flipSpeedFrontToBack={0.1}
          >
            <div key="front">
              <img
                className="card-image"
                src="//static.pexels.com/photos/59523/pexels-photo-59523.jpeg"
              />
              <button onClick={this.handleClick}>Flip Card</button>
            </div>

            <div key="back">
              <img
                className="card-image"
                src="//img.buzzfeed.com/buzzfeed-static/static/2014-04/enhanced/webdr06/4/16/enhanced-11136-1396643149-13.jpg?no-auto"
              />
              <button onClick={this.handleClick}>Flip Card</button>
            </div>
          </ReactCardFlip>
        </div>
      </>
    );
  }
}

class Front extends Component {
  render() {
    return <div>Czosnek</div>;
  }
}

class Back extends Component {
  render() {
    return <div> cebula </div>;
  }
}

export default UserProfile;
ReactDOM.render(
  <UserProfile />,
  document.getElementsByClassName("userProfile")[0]
);
