import React, {Component} from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class AddPoints extends Component {

  state = {
    users: [],
    points: []
  };

  componentWillMount() {
    axios
      .get("/api/v1/events/event_user", { params: {id: 1} } , { "Content-Type": "application/json" })
      .then(res => {
        this.setState({
          users: res.data.data
        });
      });
  }
  click = points => {
    axios
      .post("/api/v1/events/event_user", { points: points });
  };

render () {
  let users = this.state.users;

  return(
    
    users.map(user => (
      <div>
      <p>{user.nick}</p> 
      <select>
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select> 
    <button onClick={this.click}
    className="users-select-button "> 
    </button>
    </div>


    )
    )

  )
}
}
ReactDOM.render(
  <AddPoints />,
  document.getElementsByClassName("players")[0]
);