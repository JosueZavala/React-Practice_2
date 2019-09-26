import React from 'react';
import SearchInput from '../components/SearchInput';

class PaymentRestrictions extends React.Component{
  constructor(){
    super();
    this.SearchInWarehouses = this.SearchInWarehouses.bind(this);
    this.state = {

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
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default PaymentRestrictions
