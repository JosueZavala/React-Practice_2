import React from 'react';
import SideBar from '../components/SideBar';
import CatalogGenerator  from '../components/CatalogGenerator';
import WareHosuesInfo  from '../components/WareHosuesInfo';
import PaymentRestrictions  from '../components/PaymentRestrictions';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '../Styles/App.css';


class App extends React.Component{

  render() {
    return (
      <BrowserRouter>
        <div className="row principal-row">
            <div className="col-2">
              <SideBar />
            </div>
            <div className="col-10">
              <div  className="row">
                <div className="col-12">
                  <Switch>
                    <Route exact path='/' component={CatalogGenerator} />
                    <Route exact path='/WareHosuesInfo' component={WareHosuesInfo} />
                    <Route exact path='/PaymentRestrictions' component={PaymentRestrictions} />
                  </Switch>
                </div>
              </div>
            </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App
