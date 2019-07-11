import React from 'react';
import ReactDOM from 'react-dom';
import EpicMenu from './EpicMenu';
import Profile from './profileAcces';
// import 'bootstrap/dist/css/bootstrap.css'




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
            <div className = 'bg'>
            <div className='ripple-background'>
            <div className='circle xxlarge shade1'></div>
            <div className='circle xlarge shade2'></div>
            <div className='circle large shade3'></div>
            <div className='circle mediun shade4'></div>
            <div className='circle small shade5'></div>
            </div>
            </div>
            
            </div>
        )
    }
}

ReactDOM.render(<MainNav />, document.getElementById('app'))