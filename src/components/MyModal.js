import React from 'react'
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import '../Styles/MyModal.css';

function MyModal(props) {
  return (
    <Modal
      show = {props.show}
      onHide = {props.handleClose}
      size = "xl"
    >
     <Modal.Header closeButton>
       <Modal.Title>Warehouse: {props.data.Name}</Modal.Title>
     </Modal.Header>
     <Modal.Body>
       <table className="table table-striped Modalbody">
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
             <td>{props.data.Code}</td>
             <td>{props.data.Name}</td>
             <td>{props.data.ShortName}</td>
             <td>{props.data.Latitude}</td>
             <td>{props.data.Longitude}</td>
             <td>{props.data.Address1}</td>
             <td>{props.data.Address2}</td>
             <td>{props.data.City}</td>
             <td>{props.data.CountryDistrict}</td>
             <td>{props.data.StateProvinceTerritory}</td>
             <td>{props.data.PostalCode}</td>
             <td>{props.data.isIkiosk.toString()}</td>
             <td>{props.data.CountryCode}</td>
             <td>{props.data.phone}</td>
           </tr>
         </tbody>
       </table>
     </Modal.Body>
     <Modal.Footer>
       <Button variant="secondary" onClick={props.handleClose}>
         Close
       </Button>
     </Modal.Footer>
   </Modal>
  );
}

export default MyModal;
