import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';


class UsersTable extends React.Component {

    compare = (a,b) => (b>a) - (b<a);
    
    state = {
        users: [],
        following: []
    };

    componentWillMount() {
        axios.get('/api/v1/users.json', {}, { 'Content-Type': 'application/json' })
            .then(res => {
                this.setState({ users: res.data.data.sort((a,b) => this.compare(a.points,b.points) || this.compare(b.nick.toUpperCase(),a.nick.toUpperCase()) )})
                
            });
            axios.get('/api/v1/users/current/following.json', {}, { 'Content-Type': 'application/json' })
            .then(resp => {
                
                this.setState({ following: resp.data.data })
                console.log(this.state.following)
            });
    }

    click = (user_id) => {
        axios.post('/api/v1/users/current/following.json', 
        {user_id: user_id}
        ).then(this.componentWillMount())
    }
    

    click2 = (user_id) => {
      axios.post('/api/v1/users/current/unfollow.json',
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
                    <th>Numer</th>
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
                           following.some((keyValuePair) => keyValuePair["id"] === user.id)?  <button  onClick={()=>this.click2(user.id)} >unfollow</button>  : <button onClick={()=>this.click(user.id)} >follow</button> 
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