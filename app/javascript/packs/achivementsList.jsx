import React, { Component } from "react";
import ReactDOM from "react-dom";
import AchivementsForm from "../components/achivementsForm";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class AchivementsList extends Component{
  state = {
    achivements: [],
    value: ""
  };

  addOption = achivement => {
    if(this.state.achivements.length < 5) {
      this.setState({
        achivements: [achivement, ...this.state.achivements]
      })
    } else {
      alert("Can't add more then 5 achievements");
    }
  }
  handleDelete = option => {
    const newAchivements = this.state.achivements.filter(achivement =>{
      return achivement !== option
    })
    this.setState({
      achivements: [...newAchivements]
    })
  
  }
 

  render() {
    return (
      <>
        <div className="col-md-6 ">
          <label className="achivements-label">Achievements</label>
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
                { <button 
                    onClick={() => this.handleDelete(achivement)}
                    className="remove-achievement"
                  > 
                  <FontAwesomeIcon icon={faTimes} size="xs"/>
                </button> }
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