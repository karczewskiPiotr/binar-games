import React from 'react';
import ReactDOM from 'react-dom';


class EpicMenu extends React.Component{
    
    render(){
        let listOfLinks = this.props.links.map((link, index) =>{
        let linkList = location.pathname.startsWith(link.link) ? (
            <a className="menuLink menuLinkActive" href={link.link}>{link.label}</a>
            ) : (
                <a className="menuLink" href={link.link}>{link.label}</a>
);
    
            return(
                <li key={index} className="menuListItem">
                {linkList}
                </li>
        );
    });
        return(
        <nav className="menu">
        
           <div className="menuRight">
               <ul className="menuList">
            {listOfLinks}
                </ul>
            </div>
        </nav>)
    }
}
export default EpicMenu;