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
      toggleActive: false
    }
  }

  onToggle() {
   this.setState({ toggleActive: !this.state.toggleActive });
  }

  render() {

    return (
        <tr>
          <td>{this.props.dataObject.Code}</td>
          <td>{this.props.dataObject.CountryCode}</td>
          <td>{this.props.dataObject.Name}</td>
          <td>{this.props.dataObject.isIkiosk.toString()}</td>
          <td><Toggle isChecked={ this.props.dataObject.isIkiosk } /></td>
          <td className="text-center"><div className="btn btn-primary btn-sm" onClick={this.state.handleShow}><i className="fa fa-eye"></i></div></td>
          <MyModal
            show = {this.state.show}
            handleClose = {this.state.handleClose}
            data = {this.props.dataObject}
          />
        </tr>
    );
  }
}

export default WHTuple
