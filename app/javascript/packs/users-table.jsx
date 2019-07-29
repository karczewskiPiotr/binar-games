import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';


class UsersTable extends React.Component {
  compare = (a, b) => (b > a) - (b < a);
   
    state = {
        users: [],
        following: []
    };

    componentWillMount() {
        axios.get('/api/v1/users', {}, { 'Content-Type': 'application/json' })
            .then(res => {
                this.setState({ users: res.data.data.sort((a,b) => this.compare(a.points,b.points) || this.compare(b.nick.toUpperCase(),a.nick.toUpperCase()) )})
                
            });
            axios.get('/api/v1/users/current/following', {}, { 'Content-Type': 'application/json' })
            .then(resp => {
                
                this.setState({ following: resp.data.data })
                console.log(this.state.following)
            });
    }

    click = (user_id) => {
        axios.post('/api/v1/users/current/following', 
        {user_id: user_id}
        ).then(this.componentWillMount())
    }
    

    click2 = (user_id) => {
      axios.post('/api/v1/users/current/unfollow',
        {user_id: user_id}
      ).then(this.componentWillMount())
    }
   
    render() {
        let users = this.state.users
        let following = this.state.following
        
        return (
            
            <div>
                <div className = 'listDiv' > 
            <div className = 'bg'>
              <table className = 'table' >
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Nick</th>
                    <th>Points</th>
                    <th>Fav</th>
                  </tr> 
                </thead>
                <tbody>
                  {
                    this.state.users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.nick}</td>
                        <td>{user.points}</td>
                        <td>
                          {
                           following.some((keyValuePair) => keyValuePair["id"] === user.id)?  
                           <button className = "fav" onClick={()=>this.click2(user.id)} >
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                           <path fill="none" d="M0 0h24v24H0V0z"/>
                           <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
                           </button>  : 
                           <button className = 'fav' onClick={()=>this.click(user.id)} >
                           <svg xmlns="http://www.w3.org/2000/svg" fill = '#ff0000' width="24" height="24" viewBox="0 0 24 24">
                           <path fill="none" d="M0 0h24v24H0V0z"/>
                           <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                           </button> 
                          }
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        )
       
    }
}
ReactDOM.render(<UsersTable />, document.getElementById("table"));
