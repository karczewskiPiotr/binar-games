import React, { Component } from "react";
import ReactDOM from "react-dom";
import AchivementsForm from "../components/achivementsForm";

class AchivementsList extends Component{
  state = {
    achivements: [],
    value: ""
  };

  addOption = achivement => {
    this.setState({
      achivements: [achivement, ...this.state.achivements]
    })
  }
  handleDelete = id => {
    id.preventDefault();
    console.log(id)
    // this.setState({
    //   achivements: this.state.achivements.filter(achivement => achivement.id !== id)
    // })
  }
 

  render() {
    return (
      <>
        <div className="col-md-6 ">
          <label className="achivements-label">Achivements</label>
        </div>
        <div className="col-md-6 ">
          <div className="a-form">
            <AchivementsForm onSubmit={this.addOption} eventId={this.props.eventId} />
          </div>
        </div>
        <div className="col-md-auto justify-content-center display-achivements">
          {this.state.achivements.map(achivement => (
            <div key={achivement.id}>
              <li className="achivements-select-list">{achivement.text}
                { <button onClick={this.handleDelete.bind(achivement)}>x</button> }
              </li>
              <input name="event[achivements][]" value={achivement.text} type="hidden" />
            </div>
        ))}
        </div>
      </>
    )
  }
}


ReactDOM.render(
  <AchivementsList />,
  document.getElementsByClassName("achivements-list")[0]
);