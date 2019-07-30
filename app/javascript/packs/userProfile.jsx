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
      isLoading: false,
      isFlipped: false,
      buttonPressed: false,
      buttonPressed1: false
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

  renderComponent = (compName, e) => {
    this.setState({
      render: compName
    });
  };

  _renderSubComp() {
    switch (this.state.render) {
      case "Events":
        return <Events />;
      case "Achievement":
        return <Achievement />;
    }
  }

  handleClickFlip = e => {
    e.preventDefault();
    this.setState({ isFlipped: !this.state.isFlipped });
  };

  handleClick = (compName, e) => {
    this.setState({
      render: compName
    });
  };

  onClick = event => {
    this.handleClick("Events");
    (this.buttonPress = () => {
      this.setState({
        buttonPressed: !this.state.buttonPressed,
        buttonPressed1: false
      });
    })();
  };
  onClick1 = event => {
    this.handleClick("Achievement");
    (this.buttonPress1 = () => {
      this.setState({
        buttonPressed: false,
        buttonPressed1: !this.state.buttonPressed1
      });
    })();
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
                  onClick={this.handleClickFlip}
                >
                  Flip Card
                </button>
                <div className="logo-card">
                  <img className="logo-card-img" src="./profile/bin.png" />
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
                  <img
                    className="back-card-stats-ranking-img"
                    src="./profile/cup.png"
                  />{" "}
                  : 1
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
                <button
                  onClick={this.onClick}
                  className={
                    this.state.buttonPressed ? "buttonWhite" : "button"
                  }
                >
                  Events
                </button>
                <button
                  onClick={this.onClick1}
                  className={
                    this.state.buttonPressed1 ? "buttonWhite" : "button"
                  }
                >
                  Achievement
                </button>
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
        {this.state.buttonPressed === false ? <div /> : this._renderSubComp()}
        {this.state.buttonPressed1 === false ? <div /> : this._renderSubComp()}
      </>
    );
  }
}

class Events extends React.Component {
  render() {
    return (
      <div className="toggle-list">
        <h2 className="-toggle-list-h2">Your Events</h2>
        <div className="">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia
          hendrerit massa lobortis imperdiet. asdfasdfasdfas
        </div>
      </div>
    );
  }
}

class Achievement extends React.Component {
  render() {
    return (
      <div className="toggle-list">
        <h2 className="toggle-list-h2">Your Achievements</h2>
        <div className="">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia
          hendrerit massa lobortis imperdiet.
        </div>
      </div>
    );
  }
}

export default UserProfile;

ReactDOM.render(
  <UserProfile />,
  document.getElementsByClassName("userProfile")[0]
);
