import React from 'react';
import ReactDOM from 'react-dom';
import EpicMenu from './EpicMenu'

class MainNav extends React.Component{

    render(){
        let links = [
            {label: 'Users', link: '#User'},
            {label: 'Games', link: '#Games'},
            {label: 'Events', link: '#Events'},
            {label: 'Profile', link: '#Profile'}
        ];
        


        return(
            <EpicMenu links = {links}/>
        )
    }
}

ReactDOM.render(<MainNav />, document.getElementById('app'))