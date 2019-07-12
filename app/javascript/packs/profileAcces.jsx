import React from 'react';
import ReactDOM from 'react-dom';
import Image from 'react-image-resizer';
import logo from '../../../bin.png';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import bell from '../../../bell.png'

class Profile extends React.Component{
render() {
    return(
        <div>
         <div className='logoName'> 
        <a  href = "https://www.google.com/">
            <img className='logo' src={logo}></img>
      
        </a>
        <div className='binargames'>
        <h2 className = 'binar'>INAR</h2>
        <h2 classname ='games'>GAMES</h2>
        </div>
        </div>  
        <div className='drop'>
            <a href='#notifications'><img className='bell' src={bell}></img></a>
        <div className="dropdown">
  <button className="dropbtn">More</button>
  <div className="dropdown-content">
    <a className = 'dropdown-font' href="#">Settings</a>
    <a className = 'dropdown-font' href="#">Log out</a>
  </div>
</div> 
            

        </div>
        
        </div>
    )
}

}
//ReactDOM.render(<Profile />, document.getElementById('app'))
export default Profile;