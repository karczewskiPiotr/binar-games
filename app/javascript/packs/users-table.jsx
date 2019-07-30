import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Table from "../components/table";

class UsersTable extends React.Component {
  compare = (a, b) => (b > a) - (b < a);

  state = {
    users: []
  };

  componentWillMount() {
    axios
      .get("/api/v1/users.json", {}, { "Content-Type": "application/json" })
      .then(res => {
        this.setState({
          users: res.data.data.sort(
            (a, b) =>
              this.compare(a.points, b.points) ||
              this.compare(b.nick.toUpperCase(), a.nick.toUpperCase())
          )
        });
      });
  }
  render() {
    return (
      <div>
        <Table usersData={this.state.users} />
      </div>
    );
  }
}
ReactDOM.render(<UsersTable />, document.getElementById("table"));
