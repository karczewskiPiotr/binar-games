import React, { Component } from "react";

 export default class AchivementsForm extends Component{
  state= {
     text: "",
     id: 0
  };

   handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.id < 5) {
      this.props.onSubmit({
        id: this.state.id,
        text: this.state.text,
        checked: false
      })
      this.setState({
        text: "",
        id: this.state.id + 1
      })
    } else {
      alert("Can't add more then 5 achivements");
    }
  }
  render(){
    return (
      <form  onSubmit={this.handleSubmit}>
        <input 
          className="typing"
          name="text"
          value={this.state.text}
          onChange={this.handleChange}
          placeholder="Add achivement..."
        />
        {/* <button onClick={this.handleSubmit}> Add</button> */}
      </form>
      
    )
  }
}