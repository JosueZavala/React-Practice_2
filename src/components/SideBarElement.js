import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/SideBarElement.css';

class SideBarElement extends React.Component{
constructor(props){
  super(props);
  this.state = {
    iconAwesome: props.iconAwesome,
    title: props.title,
    navTo: props.navTo
  }
}

  render() {

    return (
      <li>
        <NavLink to={this.state.navTo}>
          <p>{this.state.title} <i id="menu-icon" className={this.state.iconAwesome}></i></p>
        </NavLink>
      </li>
    );
  }
}

export default SideBarElement
