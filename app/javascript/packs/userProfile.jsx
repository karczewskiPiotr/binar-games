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
              !this.state.isLoading ? "loading" : this.state.users.org_events
            }
            ownEvents={
              !this.state.isLoading ? "loading" : this.state.users.events
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

  onClickEvent = event => {
    this.handleClick("Events");
    (this.buttonPress = () => {
      this.setState({
        showEvent: !this.state.showEvent,
        showAchievement: false
      });
    })();
  };
  onClickAchi = event => {
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
          <ReactTooltip />
          <ReactCardFlip
            isFlipped={this.state.isFlipped}
            flipSpeedBackToFront={0.3}
            flipSpeedFrontToBack={0.3}
          >
            <div className="front-card-out" key="front">
              <div className="front-card">
                <div className="front-card-nick">{this.state.users.nick}</div>
                <img
                  className="card-image"
                  src={
                    this.state.users.avatar
                      ? this.state.users.avatar
                      : "./profile/defAvatar.png"
                  }
                />
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
                  <div>
                    {!this.state.isLoading
                      ? "loading"
                      : this.state.users.user_games.length}
                  </div>
                </div>
              </div>
              <div className="back-card-buttons">
                <button
                  onClick={this.onClickEvent}
                  className={
                    this.state.showEvent
                      ? "back-card-button button-color"
                      : "btn-hover btn-color back-card-button"
                  }
                >
                  <img className="button-logo-img" src="./profile/event.png" />
                </button>

                <button
                  onClick={this.onClickAchi}
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
        {(this.state.showEvent || this.state.showAchievement) === false ? (
          <div />
        ) : (
          this._renderSubComp()
        )}
      </>
    );
  }
}

class Events extends React.Component {
  constructor() {
    super();
    this.state = {
      showOwnedEvents: false
    };
  }

  changeList = () => {
    this.setState({
      showOwnedEvents: !this.state.showOwnedEvents
    });
  };

  render() {
    return (
      <div className="toggle-list fade-in">
        <h2 className="toggle-list-h2">Your Events</h2>
        <button
          className="card-button btn-hover btn-color card-button-event"
          onClick={this.changeList}
        >
          {this.state.showOwnedEvents ? "created events" : "take a part"}
        </button>
        <div className="toggle-list-text">
          <main className="st_viewport">
            <div className="st_wrap_table" data-table_id="0">
              <header className="st_table_header">
                <div className="st_row">
                  <div className="st_column _title">Title</div>
                  <div className="st_column _event_time">Time</div>
                  <div className="st_column _event_date">Date</div>
                </div>
              </header>

              <div className="st_table">
                {this.state.showOwnedEvents
                  ? this.props.events.map(event => {
                      return (
                        <div className="st_row fade-in">
                          <ReactTooltip />
                          <div className="st_column _title">
                            <a
                              href={`/events/${event.id}`}
                              data-tip="more details"
                            >
                              {event.title}
                            </a>
                          </div>
                          <div className="st_column _event_time">
                            {event.event_time.slice(11, 16)}
                          </div>
                          <div className="st_column _event_date">
                            {event.event_date}
                          </div>
                        </div>
                      );
                    })
                  : this.props.ownEvents.map(event => {
                      return (
                        <div className="st_row fade-in">
                          <div className="st_column _title">
                            <a href={`/events/${event.id}`}>{event.title}</a>
                          </div>
                          <div className="st_column _event_time">
                            {event.event_time.slice(11, 16)}
                          </div>
                          <div className="st_column _event_date">
                            {event.event_date}
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
          </main>
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
