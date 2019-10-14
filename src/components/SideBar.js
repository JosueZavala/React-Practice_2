import React from 'react';
import SideBarElement from '../components/SideBarElement';
import '../Styles/SideBar.css';

class SideBar extends React.Component{

  constructor(props) {
    super(props);
    this.state = {addClass: true}
  }

  toggle() {
    this.setState({addClass: !this.state.addClass});
  }

  render() {

    return (

      <div id="wrapper" className={(this.state.addClass ? 'active' : '')}>
      <div id="sidebar-wrapper">
        <ul id="sidebar_menu" className="sidebar-nav">
          <li className="sidebar-brand" onClick={this.toggle.bind(this)}><a id="menu-toggle">Mobile Tool <i id="menu-icon" className="fa fa-bars" aria-hidden="true"></i></a></li>

        </ul>
        <ul className="sidebar-nav" id="sidebar">
            <SideBarElement
              iconAwesome="fa fa-file-text"
              title="Generate Catalog"
              navTo="/"
            />
            <SideBarElement
              iconAwesome="fa fa-server"
              title="Warehoses info"
              navTo="/WareHosuesInfo"
            />
            <SideBarElement
              iconAwesome="fa fa-money"
              title="Payment Restrictions"
              navTo="/PaymentRestrictions"
            />
        </ul>
      </div>
    </div>


      /*<div className="d-flex" id="wrapper">
        <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">Mobile Tool</div>
            <div className="sidebar">
              <ul className="nav">
                <SideBarElement
                  iconAwesome="fa fa-file-text"
                  title="Generate Catalog"
                  navTo="/"
                />
                <SideBarElement
                  iconAwesome="fa fa-server"
                  title="Warehoses info"
                  navTo="/WareHosuesInfo"
                />
                <SideBarElement
                  iconAwesome="fa fa-money"
                  title="Payment Restrictions"
                  navTo="/PaymentRestrictions"
                />
              </ul>
            </div>
        </div>
      </div>*/
    );
  }
}

export default SideBar
