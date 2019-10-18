import React from 'react';
import '../Styles/PaymentRestrictions.css';

class LocalesFound extends React.Component{
  constructor(){
    super();
    this.state = {
      localesOptionCards: [],
      apiLocaleResponse: {},
      localesArray: [],
      _handleFunction: ''
    };
  }

  render() {
    return (

      <div className="row">
         <div className={"first-step " + (this.props.StepOne ? '' : 'hideContainer')}>
            <div className="locales-container">
              <div className="row">
                <div className="title-segment">
                  <label> Locales: </label>
                </div>
              </div>
              <div className="row">
                <div className="options-container">
                  <div className="nowrap-row">
                    {this.props.LocalesOptionCards}
                  </div>
                </div>
              </div>
            </div>
            <div className="actions-container">
              <button className="action-button" onClick = {this.props.ShowSecondStep}>Next</button>
            </div>
         </div>
      </div>
    );
  }

}

export default LocalesFound
