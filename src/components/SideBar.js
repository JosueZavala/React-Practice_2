import React from 'react';
import SideBarElement from '../components/SideBarElement';
import '../Styles/SideBar.css';

class SideBar extends React.Component{

  render() {

    return (
      <div className="d-flex" id="wrapper">
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
      </div>
    );
  }
}

export default SideBar
