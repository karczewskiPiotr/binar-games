import { React, ReactDOM, Component } from "react";

class Events extends Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }
}

ReactDOM.render(<Events />, document.getElementByClassName("events-wrapper"));
export default events;
