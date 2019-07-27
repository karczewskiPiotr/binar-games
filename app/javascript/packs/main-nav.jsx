import React from "react";
import ReactDOM from "react-dom";
import EpicMenu from "../components/EpicMenu";
import Profile from "../components/profileAcces";

class MainNav extends React.Component {
  render() {
    let links = [
      { label: "Profile", link: "/user_profile" },
      { label: "Users", link: "/users" },
      { label: "Games", link: "/games" },
      { label: "Events", link: "/events" }
    ];

    return (
      <div>
        <Profile />
        <div className="container center">
          <EpicMenu links={links} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<MainNav />, document.getElementById("main"));
