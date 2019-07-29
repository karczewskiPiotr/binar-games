import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import ReactCardFlip from "react-card-flip";
import logo from "../../../bin.png";
import cup from "../../../cup.png";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
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
        <div className="profile">
          <ReactTooltip />{" "}
          <ReactCardFlip
            isFlipped={this.state.isFlipped}
            flipSpeedBackToFront={0.3}
            flipSpeedFrontToBack={0.3}
          >
            <div className="front-card-out" key="front">
              <div className="front-card">
                <div className="front-card-nick">{this.state.users.nick}</div>
                <img className="card-image" src={this.state.users.avatar} />
                <div
                  className={
                    !this.state.isFlipped ? "arrow bounce" : "arrow-off"
                  }
                />
                <button
                  className="card-button btn-hover btn-color"
                  onClick={this.handleClick}
                >
                  Flip Card
                </button>
                <div className="logo-card">
                  <img className="logo-card-img" src={logo} />
                  <div className="logo-card-text">
                    <div className="binar">inar</div>
                    <div className="games">Games</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="back-card-out" key="back">
              <div className="back-card-stats">
                <div className="back-card-stats-ranking">
                  <div
                    className="back-card-stats-ranking-text"
                    data-tip="your current position in ranking"
                  >
                    RANKING
                  </div>
                  <img className="back-card-stats-ranking-img" src={cup} /> : 1
                </div>
                <div className="back-card-stats-row">
                  <div className="back-card-stats-points">
                    <div
                      className="back-card-stats-points-text"
                      data-tip="your scored points"
                    >
                      POINTS
                    </div>
                    <div>{this.state.users.points}</div>
                  </div>
                  <div
                    className="back-card-stats-games"
                    data-tip="number of your games"
                  >
                    <div className="back-card-stats-points-text">GAMES</div>
                    <div>{this.state.users.points}</div>
                  </div>
                </div>
              </div>
              <div className="back-card-events">
                <div className="back-card-events-text" data-tip="your events">
                  EVENTS
                </div>
                {!this.state.isLoading
                  ? "loading"
                  : this.state.users.organized_events.map(event => (
                      <a
                        className="event-link"
                        href={"http://localhost:3000/events/" + event.id}
                      >
                        {event.title}
                      </a>
                    ))}
              </div>
              <button
                className="card-button btn-hover btn-color"
                onClick={this.handleClick}
              >
                Back
              </button>
            </div>
          </ReactCardFlip>
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
