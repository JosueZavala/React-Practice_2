import React from 'react';
import MyModal  from '../components/MyModal';
import Toggle from '../components/Toggle';
import SweetAlert from 'sweetalert2-react';

class WHTuple extends React.Component{
  constructor(props){
    super(props);

    this.onToggle = this.onToggle.bind(this);
    this.showAlert = this.showAlert.bind(this);

    this.state = {
      show : false,
      handleShow: () => this.setState({ show: true }),
      handleClose: () => this.setState({ show: false }),
      toggleActive: false,
      isIkiosk: this.props.dataObject.isIkiosk,
      dataObject: this.props.dataObject,
      showSA : false,
      swaltype: "",
      swaltitle: "",
      swaltext: "",
    }

  }
  onToggle () {
    let newObject = this.state.dataObject;
    newObject.isIkiosk = !this.state.isIkiosk;

     this.setState({
       toggleActive: !this.state.toggleActive,
       isIkiosk: !this.state.isIkiosk,
       dataObject: newObject
     });

     this.showAlert();
  }

  showAlert(){
      let isChecked = this.state.isIkiosk;
      let sweetAlertTitle = this.state.dataObject.Name;
      const updateIsIkiosk = new Promise((resolve, reject) => {
          setTimeout(() => !isChecked ? resolve(isChecked) : reject(isChecked)
            , 300);
      });

      updateIsIkiosk
        .then((value) => {
          this.SetSweetAlert("success", sweetAlertTitle, "Ikiosk changed to True")
        })
        .catch((error) => {
          console.error(error);
          this.SetSweetAlert("error",sweetAlertTitle,"Ikiosk changed to False")
        });
    }

    SetSweetAlert(type, title, text) {
        this.setState({
          showSA: true,
          swaltype: type,
          swaltitle: title,
          swaltext: text
        });
    }





  render() {

    return (
        <tr>
          <td>{this.state.dataObject.Code}</td>
          <td>{this.state.dataObject.CountryCode}</td>
          <td>{this.state.dataObject.Name}</td>
          <td>{this.state.isIkiosk.toString()}</td>
          <td>
            <Toggle
              isChecked = { this.state.isIkiosk }
              toggleChanged = { this.onToggle }
            />
          </td>
          <td className="text-center">
            <div className="btn btn-primary btn-sm" onClick={this.state.handleShow}>
              <i className="fa fa-eye"></i>
            </div>
          </td>
            <MyModal
              show = {this.state.show}
              handleClose = {this.state.handleClose}
              data = {this.state.dataObject}
            />
            <SweetAlert
              show={this.state.showSA}
              type={this.state.swaltype}
              title={this.state.swaltitle}
              text={this.state.swaltext}
              onConfirm={() => this.setState({ showSA: false })}
            />
        </tr>
    );
  }
}

export default WHTuple
