import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import Table from "../components/table";

class UsersTable extends React.Component {

    
    state = {
        users: []
    };

    componentWillMount() {
        axios.get('/api/v1/users.json', {}, { 'Content-Type': 'application/json' })
            .then(res => {
                console.log(res.data.data)
                this.setState({ users: res.data.data.sort((a,b) => b.points - a.points ) || (b.nick - a.nick) })
                console.log(this.state);
            });
    }
    render() {
        return (
            <div>
                <Table usersData={this.state.users}></Table>
            </div>
        )

    }
}
ReactDOM.render(<UsersTable />, document.getElementById("table"));