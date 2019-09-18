import React from 'react';
import '../Styles/SearchImput.css';

class SearchInput extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      Message: ''
    }

  }

  updateInputValue(evt) {
      const eventValue = evt.target.value;
      this.setState({
        inputValue: eventValue,
        Message: this.props.Message,
      });
      this.props.FunctionOnChange(eventValue)
    }



render (){
      return (
        <div className="row SearchInput">
            <div className="col-5 input-container">
                <button className="dropbtn">Find Locale...</button>
                <input
                   type="text"
                   placeholder="Search.."
                   id="myInput"
                   ref={(element) => {
                     this.dropdownMenu = element;
                   }}
                   value={this.state.inputValue}
                   onChange={evt => this.updateInputValue(evt)}
                 ></input>
            </div>
            <div className="col-7 mesage-container">{this.props.Message}</div>
        </div>

      );
    }
}

export default SearchInput;
