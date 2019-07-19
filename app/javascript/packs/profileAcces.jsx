import React from "react";
import bell from "../../../bell.png";
import logo from "../../../bin.png";

export default class Profile extends React.Component {
  handleSbumit = e => {
    e.preventDefault();
    console.log("wylogowwałes sie prawie");
  };

  render() {
    return (
      <div className="logoName">
        <div className="logo-wrapper">
          <a href="https://www.google.com/">
            <img className="logo" src={logo} />
          </a>
          <div className="binargames my-auto">
            <h2 className="binar">INAR</h2>
            <h2 className="games">GAMES</h2>
          </div>
        </div>
        <div className="drop">
          <a href="#notifications">
            <img className="bell" src={bell} />
          </a>
          <div className="dropdown">
            <button className="dropbtn">More</button>
            <div className="dropdown-content">
              <a className="dropdown-font" href="#">
                Settings
              </a>
              <button className="dropdown-font" onClick={this.handleSubmit}>
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
