import React from 'react'
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import '../Styles/MyModal.css';

class MyModal extends React.Component{
  constructor(props){
    super(props);
    this.SaveModalValues = this.SaveModalValues.bind(this);

    this.state = {
      dataObject: {...this.props.data},
      whCode: ''
    }
  }

  handleChange(evt){
    let eventValue = evt.target.value;
    const eventName = evt.target.name;
    const temporalObject = {...this.state.dataObject}

    if(eventName==='isIkiosk'){
      eventValue=evt.target.checked;
    }

    temporalObject[eventName] = eventValue;
    this.setState({dataObject: temporalObject})
  }

  SaveModalValues(){
    this.props.handleSave(this.state.dataObject);
    this.props.handleClose();
  }

    render(){
      return (
        <Modal
          show = {this.props.show}
          onHide = {this.props.handleClose}
          size = "xl"
        >
         <Modal.Header closeButton>
           <Modal.Title>Warehouse: {this.props.data.Name}</Modal.Title>
         </Modal.Header>
         <Modal.Body className="Modalbody">
           <table className="table table-striped">
             <thead>
               <tr>
                 <th>Code</th>
                 <th>Name</th>
                 <th>Short Name</th>
                 <th>Latitude</th>
                 <th>Longitude</th>
                 <th>Address 1</th>
                 <th>Address 2</th>
                 <th>City</th>
                 <th>Country District</th>
                 <th>State Province Territory</th>
                 <th>Postal Code</th>
                 <th>Ikiosk</th>
                 <th>Country Code</th>
                 <th>Phone</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td><input type="text" name="warehouseCode" value={this.state.dataObject.warehouseCode} onChange={evt => this.handleChange(evt)}/></td>
                 <td><input type="text" name="title" value={this.state.dataObject.title} onChange={evt => this.handleChange(evt)}/></td>
                 <td><input type="text" name="shortName" value={this.state.dataObject.shortName} onChange={evt => this.handleChange(evt)}/></td>
                 <td><input type="text" name="latitude" value={this.state.dataObject.latitude} onChange={evt => this.handleChange(evt)}/></td>
                 <td><input type="text" name="longitude" value={this.state.dataObject.longitude} onChange={evt => this.handleChange(evt)}/></td>
                 <td><input type="text" name="line1" value={this.state.dataObject.line1} onChange={evt => this.handleChange(evt)}/></td>
                 <td><input type="text" name="line2" value={this.state.dataObject.line2} onChange={evt => this.handleChange(evt)}/></td>
                 <td><input type="text" name="city" value={this.state.dataObject.city} onChange={evt => this.handleChange(evt)}/></td>
                 <td><input type="text" name="countryDistrict" value={this.state.dataObject.countryDistrict} onChange={evt => this.handleChange(evt)}/></td>
                 <td><input type="text" name="stateProvinceTerritory" value={this.state.dataObject.stateProvinceTerritory} onChange={evt => this.handleChange(evt)}/></td>
                 <td><input type="text" name="postalCode" value={this.state.dataObject.postalCode} onChange={evt => this.handleChange(evt)}/></td>
                 <td><input type="checkbox" name="isIkiosk" checked={this.state.dataObject.isIkiosk} onChange={evt => this.handleChange(evt)}/></td>
                 <td><input type="text" name="countryCode" value={this.state.dataObject.countryCode} onChange={evt => this.handleChange(evt)}/></td>
                 <td><input type="text" name="phone" value={this.state.dataObject.phone} onChange={evt => this.handleChange(evt)}/></td>
               </tr>
             </tbody>
           </table>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="success" onClick={this.SaveModalValues}>
             Save
           </Button>
           <Button variant="danger" onClick={this.props.handleClose}>
             Close
           </Button>
         </Modal.Footer>
       </Modal>
      );
    }
  }

  export default MyModal;
