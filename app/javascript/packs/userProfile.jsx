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
      showEvent: false,
      showAchievement: false
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
        return (
          <Events
            events={
              !this.state.isLoading
                ? "loading"
                : this.state.users.organized_events
            }
          />
        );
      case "Achievement":
        return <Achievement />;
    }
  }

  handleClickFlip = e => {
    e.preventDefault();
    this.setState({
      isFlipped: !this.state.isFlipped,
      showEvent: false,
      showAchievement: false
    });
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
        showEvent: !this.state.showEvent,
        showAchievement: false
      });
    })();
  };
  onClick1 = event => {
    this.handleClick("Achievement");
    (this.buttonPress1 = () => {
      this.setState({
        showEvent: false,
        showAchievement: !this.state.showAchievement
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
              <div className="back-card-buttons">
                <button
                  onClick={this.onClick}
                  className={
                    this.state.showEvent
                      ? "back-card-button button-color"
                      : "btn-hover btn-color back-card-button"
                  }
                >
                  <img className="button-logo-img" src="./profile/event.png" />
                </button>

                <button
                  onClick={this.onClick1}
                  className={
                    this.state.showAchievement
                      ? "back-card-button button-color"
                      : "btn-hover btn-color back-card-button "
                  }
                >
                  <img
                    className="button-logo-img"
                    src="./profile/achievements.png"
                  />
                </button>
              </div>

              <button
                className="card-button btn-hover btn-color"
                onClick={this.handleClickFlip}
              >
                Back
              </button>
            </div>
          </ReactCardFlip>
        </div>
        {this.state.showEvent === false ? <div /> : this._renderSubComp()}
        {this.state.showAchievement === false ? <div /> : this._renderSubComp()}
      </>
    );
  }
}

class Events extends React.Component {
  render() {
    return (
      <div className="toggle-list fade-in">
        <h2 className="toggle-list-h2">Your Events</h2>
        <div className="toggle-list-text">
          {this.props.events.map(event => {
            return (
              <div>
                {event.title} <br /> {event.event_time.slice(11, 16)}
                <br /> {event.event_date} <hr />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

class Achievement extends React.Component {
  render() {
    return (
      <div className="toggle-list fade-in">
        <h2 className="toggle-list-h2">Your Achievements</h2>
        <div className="toggle-list-text">
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
