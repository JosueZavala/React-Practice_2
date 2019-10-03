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
                 <div className={"first-step " + (this.state.display ? '' : 'hideContainer')}>
                    <div className="locales-container">
                      <div className="row">
                        <div className="title-segment">
                          <label> Locales: </label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="options-container">
                          <div className="nowrap-row">
                            <OptionCard text="es-AR" inputName="locales"/>
                            <OptionCard text="es-MX" inputName="locales"/>
                            <OptionCard text="es-PE" inputName="locales"/>
                            <OptionCard text="en-US" inputName="locales"/>
                            <OptionCard text="en-PH" inputName="locales"/>
                            <OptionCard text="en-MX" inputName="locales"/>
                            <OptionCard text="en-CA" inputName="locales"/>
                            <OptionCard text="fr-CA" inputName="locales"/>
                            <OptionCard text="fr-FR" inputName="locales"/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="actions-container">
                      <button className="action-button">Next</button>
                    </div>
                 </div>
                </div>

                <div className="row">
                 <div className={"second-step " + (this.state.display ? '' : 'hideContainer')}>
                    <div className="restrictions-container">
                      <div className="row">
                        <div className="title-segment">
                          <label> Warehouses Restrictions: </label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 options-container general-restrictions">

                        </div>
                        <div className="col-5 options-container general-restrictions">

                        </div>
                      </div>
                    </div>
                    <div className="actions-restrictions-container">
                      <button className="action-button">Save</button>
                      <button className="action-button">Reset</button>
                    </div>
                 </div>
                </div>

                <div className="row">
                 <div className={"third-step " + (this.state.display ? '' : 'hideContainer')}>
                    <div className="restrictions-container">
                      <div className="row">
                        <div className="title-segment">
                          <label> SKU's Restrictions: </label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 options-container general-restrictions">

                        </div>
                        <div className="col-xl-5 col-lg-4 col-md-4 col-sm-4 options-container general-restrictions">

                        </div>
                      </div>
                    </div>
                    <div className="actions-restrictions-container">
                      <button className="action-button">Save</button>
                      <button className="action-button">Reset</button>
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
