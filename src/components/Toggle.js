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
            <div className="switch-container">
                <label>
                    <input ref="switch" checked={ this.state.isChecked } onChange={ this._handleChange } className="switch" type="checkbox" />
                    <div>
                      <div></div>
                    </div>
                </label>
            </div>
        );
    }


    _handleChange () {
        debugger;
		    this.setState( { isChecked: !this.state.isChecked } );
    }

}
export default Toggle
