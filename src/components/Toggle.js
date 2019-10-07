import React from 'react';
import '../Styles/Toggle.css';
import SweetAlert from 'sweetalert2-react';

class Toggle extends React.Component {

    constructor ( props ) {
        super( props );
        this._handleChange = this._handleChange.bind(this);
        this.SetSweetAlert = this.SetSweetAlert.bind(this);

    		this.state = {
    			isChecked: this.props.isChecked,
          nameToShow: this.props.warehouseName,
          show: false,
          swaltype: "",
          swaltitle: "",
          swaltext: "",
    		}

    }

    SetSweetAlert(type, title, text) {
        this.setState({
          show: true,
          swaltype: type,
          swaltitle: title,
          swaltext: text
        });
    }

    render () {

        return(
          <div>
            <label className="switch">
              <input type="checkbox" checked={ this.state.isChecked } onChange={ this._handleChange }></input>
              <span className="slider round"></span>
            </label>
            <SweetAlert
              show={this.state.show}
              type={this.state.swaltype}
              title={this.state.swaltitle}
              text={this.state.swaltext}
              onConfirm={() => this.setState({ show: false })}
            />
          </div>
        );
    }


    _handleChange () {
      let isChecked = this.state.isChecked;
      let sweetAlertTitle = this.state.nameToShow;
      const updateIsIkiosk = new Promise((resolve, reject) => {
          setTimeout(() => !isChecked ? resolve(isChecked) : reject(isChecked)
            , 300);
      });

      updateIsIkiosk
        .then((value) => {
          this.setState({ isChecked: !this.state.isChecked});
          this.SetSweetAlert("success", sweetAlertTitle, "Ikiosk changed to True")
        })
        .catch((error) => {
          this.setState({ isChecked: !this.state.isChecked});
          console.error(error);
          this.SetSweetAlert("error",sweetAlertTitle,"Ikiosk changed to False")
        });
      this.props.toggleChanged();
    }

}
export default Toggle
