import React from 'react';
import MyModal  from '../components/MyModal';

class WHTable extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      show : false,
      setShow: false,
    }

  }

  render() {
    const handleClose = () => this.setState({ show: false });
    const handleShow = () => this.setState({ show: true });
    return (
        <div className="row">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Is Pickup Location?</th>
                <th>Is Ikisok?</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.props.tupleArray}</tbody>
          </table>
          <MyModal
            show={this.state.show}
            handleClose={handleClose}
          />
        </div>
    );
  }
}

export default WHTable
