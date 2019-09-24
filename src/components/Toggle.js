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
      let isChecked = this.state.isChecked;
      const updateIsIkiosk = new Promise((resolve, reject) => {
          setTimeout(() => isChecked ? resolve(isChecked) : reject(isChecked)
            , 300);
      });

      updateIsIkiosk
        .then((value) => {
          this.setState({ isChecked: !this.state.isChecked});
          alert(value);
        })
        .catch((error) => {
          this.setState({ isChecked: !this.state.isChecked});
          console.error(error);
          alert(error);
        });
    }

}
export default Toggle
