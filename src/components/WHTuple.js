import React from 'react';
import MyModal  from '../components/MyModal';
import Toggle from '../components/Toggle';
import API from '../components/api';
import SweetAlert from 'sweetalert2-react';

class WHTuple extends React.Component{
  constructor(props){
    super(props);

    this.onToggle = this.onToggle.bind(this);
    this.onModalSave = this.onModalSave.bind(this);
    this._closeSweetAlert = this._closeSweetAlert.bind(this);

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
    const _newObject = {...this.state.dataObject};

    _newObject.isIkiosk = !this.state.isIkiosk;
    this.setState({
      toggleActive: !this.state.toggleActive,
      isIkiosk: !this.state.isIkiosk,
      dataObject: _newObject
    });

    if(_newObject.isIkiosk){
      this._savePickupLocations(_newObject);
    }else{
      this._deletePickupLocations(_newObject);
    }
  }

  onModalSave(dataObject){
    let _newObject = {...dataObject};
    this.setState({
      toggleActive: _newObject.isIkiosk,
      isIkiosk: _newObject.isIkiosk,
      dataObject: _newObject
    });

    if(_newObject.isIkiosk){
      this._savePickupLocations(_newObject);
    }else{
      this._deletePickupLocations(_newObject);
    }
  }

  _savePickupLocations(pickupObject){
    const _objectToAPI = {...pickupObject};
    const _locale = pickupObject.locale;
    delete _objectToAPI.locale;

    API.put('PickupLocation/SavePickupLocation/'+_locale, _objectToAPI)
      .then(res =>{
        this.SetSweetAlert("success", _objectToAPI.title, "Ikiosk changed to "+_objectToAPI.isIkiosk);
      })
      .catch(error => {
        this.SetSweetAlert("error", 'Error trying to save Pickup Location', error);
      });
  }

  _deletePickupLocations(pickupObject){
    const _locale = pickupObject.locale;
    const _warehouseCode = pickupObject.warehouseCode;

    API.delete('PickupLocation/DeletePickupLocation/'+_locale+'?warehouseCode='+_warehouseCode)
      .then(res =>{
        this.SetSweetAlert("success", pickupObject.title, "Ikiosk changed to "+pickupObject.isIkiosk);
      }).catch(error => {
        this.SetSweetAlert("error", 'Error trying to Delete Pickup Location', error);
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

  _closeSweetAlert(){
    this.setState({ showSA: false })
  }

  render() {

    return (
        <tr>
          <td>{this.state.dataObject.warehouseCode}</td>
          <td>{this.state.dataObject.countryCode}</td>
          <td>{this.state.dataObject.title}</td>
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
              handleSave = {this.onModalSave}
              data = {this.state.dataObject}
            />
            <SweetAlert
              show={this.state.showSA}
              type={this.state.swaltype}
              title={this.state.swaltitle}
              text={this.state.swaltext}
              onConfirm={this._closeSweetAlert.bind(this)}
            />
        </tr>
    );
  }
}

export default WHTuple
