import React from 'react';
import '../Styles/Toggle.css';

class Toggle extends React.Component {

    constructor ( props ) {
        super( props );
        this._handleChange = this._handleChange.bind(this);

    		this.state = {
    			isChecked: this.props.isChecked
    		}
    }

    render () {

        return(
          <div>
            <label className="switch">
              <input type="checkbox" checked={ this.state.isChecked } onChange={ this._handleChange }></input>
              <span className="slider round"></span>
            </label>
          </div>
        );
    }

    _handleChange () {
      this.setState({ isChecked: !this.state.isChecked});
      this.props.toggleChanged();
    }

}
export default Toggle
