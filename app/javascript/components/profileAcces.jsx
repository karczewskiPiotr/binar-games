import React from "react";
import bell from "../../../bell.png";
import logo from "../../../bin.png";

export default class Profile extends React.Component {
  render() {
    return (
      <div className="logoName">
        <div className="logo-wrapper">
          <a href="https://www.google.com/">
            <img className="logo" src={logo} />
          </a>
          <div className="binargames my-auto">
            <h2 className="binar">inar</h2>
            <h2 className="games">Games</h2>
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
              <div className="dropdown-font" href="#">
                Log out
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
