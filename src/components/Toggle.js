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

    static getDerivedStateFromProps(props, state) {
      if (props.isChecked !== state.isChecked) {
        debugger;
        return {
          isChecked: props.isChecked,
        };
      }
      return null;
    }

    render () {

        return(
          <div>
            <label className="switch" style={this.props.styles}>
              <input type="checkbox" checked={ this.state.isChecked } onChange={ this._handleChange }></input>
              <span className="slider round"></span>
            </label>
          </div>
        );
    }

    _handleChange () {
      this.setState({ isChecked: !this.state.isChecked});
      let _restriction = this.props.restriction;
      if(_restriction){
        this.props.toggleChanged(_restriction);
      }
      else{
        this.props.toggleChanged();
      }
    }

}
export default Toggle
