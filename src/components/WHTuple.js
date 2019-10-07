import React from 'react';
import MyModal  from '../components/MyModal';
import Toggle from '../components/Toggle';

class WHTuple extends React.Component{
  constructor(props){
    super(props);

    this.onToggle = this.onToggle.bind(this);

    this.state = {
      show : false,
      handleShow: () => this.setState({ show: true }),
      handleClose: () => this.setState({ show: false }),
      toggleActive: false,
      isIkiosk: this.props.dataObject.isIkiosk,
      dataObject: this.props.dataObject
    }
  }

  onToggle() {
    let newObject = this.state.dataObject;
    newObject.isIkiosk = !this.state.isIkiosk;

   this.setState({
     toggleActive: !this.state.toggleActive,
     isIkiosk: !this.state.isIkiosk,
     dataObject: newObject
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
                warehouseName = { this.state.dataObject.Name }
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
        </tr>
    );
  }
}

export default WHTuple
