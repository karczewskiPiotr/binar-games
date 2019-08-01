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
    
    if(this.state.text.length > 1) {
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
      alert("Added achievements can't be shorter then 3 letters");
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
      </form>
      
    )
  }
}