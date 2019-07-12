import React from 'react';
import ReactDOM from 'react-dom';
import EpicMenu from './EpicMenu';
import Profile from './profileAcces';





class MainNav extends React.Component{

    render(){
        let links = [
            {label: 'Profile', link: '/profile',},
            {label: 'Users', link: '/user'},
            {label: 'Games', link: '/games'},
            {label: 'Events', link: '/events'}
            
        ];
        


        return(

            <div>
            <Profile  />
            <div className="container center">
                
            <EpicMenu links = {links} />

           
            </div>
            </div>
        )
    }
}

 ReactDOM.render(<MainNav />, document.getElementById('main'))