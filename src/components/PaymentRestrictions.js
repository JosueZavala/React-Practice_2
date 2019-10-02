import React from 'react';
import SearchInput from '../components/SearchInput';
import OptionCard from '../components/OptionCard';
import '../Styles/PaymentRestrictions.css';

class PaymentRestrictions extends React.Component{
  constructor(){
    super();
    this.SearchInWarehouses = this.SearchInWarehouses.bind(this);
    this.state = {
        display: true,
    };
  }

  SearchInWarehouses(searchValue){
    console.log(searchValue);
    }

  render() {

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="title-Module">
            Payment Restrictions
          </div>
        </div>
        <div className="row">
            <div className="container">
              <div className="col-sm dropDown-container">
                <SearchInput
                  FunctionOnChange = {this.SearchInWarehouses}
                  Message = "{this.state.notFoundMessage}"
                />
                <div className="row">
                  <div className={"restrictions-container " + (this.state.display ? '' : 'hideContainer')}>
                    <div className="row">
                      <div className="title-segment">
                        <label> Locales: </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="options-container">
                        <OptionCard text="es-AR" inputName="locales"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default PaymentRestrictions
