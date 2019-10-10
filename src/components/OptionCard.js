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

  _selectColor(){
    let _colorClass = '';
    switch (this.props.color) {
      case 2:
          _colorClass='warehouse-color';
        break;
      case 3:
          _colorClass='sku-color';
        break;
      default:
          _colorClass='locale-color';
    }
    return _colorClass;
  }

  render() {
    let colorClass = this._selectColor();
    return (
      <div>
        <input
          type = "radio"
          name = {this.props.inputName}
          value = {this.props.text}
          id = {this.props.text}
          className = "hidden-input"
          onChange = {evt => this._handleOnChange(evt)}/>
          <label className={"principal-card "+colorClass} htmlFor={this.props.text}>
            {this.props.text}
          </label>
      </div>
    );
  }
}

export default OptionCard
