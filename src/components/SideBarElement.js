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
          <i className={this.state.iconAwesome}></i>
          <p>{this.state.title}</p>
        </NavLink>
      </li>
    );
  }
}

export default SideBarElement
