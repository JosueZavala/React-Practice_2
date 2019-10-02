import React from 'react';

class OptionCard extends React.Component{
  constructor(){
    super();
    this.state = {

    };
  }

  render() {

    return (
      <div className="">
        <label>
          <input type="radio" name={this.props.inputName} value={this.props.text} />
          {this.props.text}
        </label>
      </div>
    );
  }
}

export default OptionCard
