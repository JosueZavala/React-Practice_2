import React from 'react';
import MyModal  from '../components/MyModal';

class WHTuple extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      show : false,
      handleShow: () => this.setState({ show: true }),
      handleClose: () => this.setState({ show: false })
    }
  }

  render() {

    return (
        <tr>
          <td>{this.props.dataObject.Code}</td>
          <td>{this.props.dataObject.CountryCode}</td>
          <td>{this.props.dataObject.Name}</td>
          <td>{this.props.dataObject.isIkiosk.toString()}</td>
          <td>{this.props.dataObject.isIkiosk.toString()}</td>
          {/*<td className="text-center"><div className="btn btn-primary btn-sm"><i className="fa fa-pencil-square"></i></div></td>*/}
          <td className="text-center"><div className="btn btn-primary btn-sm" onClick={this.state.handleShow}><i className="fa fa-eye"></i></div></td>
          <MyModal
            show = {this.state.show}
            handleClose = {this.state.handleClose}
            data = {this.props.dataObject}
          />
        </tr>
    );
    debugger;
  }
}

export default WHTuple
