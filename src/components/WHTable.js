import React from 'react';
import MyModal  from '../components/MyModal';

class WHTable extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      show : false,
      setShow: false,
      tupleArray: this.AddHandleEvent(),
      handleShow: () => this.setState({ show: true }),
      handleClose: () => this.setState({ show: false })
    }
  }

  AddHandleEvent(){
    let newTupleArray = this.props.tupleArray;
    newTupleArray = newTupleArray.map((item, index) => {
      return (
          React.cloneElement(
            item,
            {EventShowModal: this.state.handleShow}
          )
        )
    });
    return newTupleArray;
  }

  render() {
    return (
        <div className="row">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Code</th>
                <th>Country Code</th>
                <th>Name</th>
                <th>Is Pickup Location?</th>
                <th>Is Ikisok?</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.AddHandleEvent()}</tbody>
          </table>
          <MyModal
            show={this.state.show}
            handleClose={this.state.handleClose}
          />
        </div>
    );
  }
}

export default WHTable
