import React from 'react';
import '../Styles/OptionCard.css';

class OptionCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cardValue: this.props.text
    };
  }

  _handleOnChange(e){
    this.props.FunctionOnChange(e.target.value);
  }

  render() {
    let colorClass = '';
    switch (this.props.color) {
      case 2:
          colorClass='warehouse-color';
        break;
      case 3:
          colorClass='sku-color';
        break;
      default:
          colorClass='locale-color';
    }
    debugger;
    return (
      <div>
        <label
            className={"principal-card "+colorClass}
            htmlFor={this.props.text}>
          <input
            type = "radio"
            name = {this.props.inputName}
            value = {this.props.text}
            id = {this.props.text}
            onChange = {evt => this._handleOnChange(evt)}/>
          {this.props.text}
        </label>
      </div>
    );
  }
}

export default OptionCard
