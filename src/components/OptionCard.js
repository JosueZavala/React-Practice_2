import React from 'react';
import '../Styles/OptionCard.css';

class OptionCard extends React.Component{
  constructor(){
    super();
    this.state = {

    };
  }

  render() {

    return (
      <div className="col-2">
        <label className="principal-card" for={this.props.text}>
          <input type="radio" name={this.props.inputName} value={this.props.text} id={this.props.text} />
          {this.props.text}
        </label>
      </div>
    );
  }
}

export default OptionCard
