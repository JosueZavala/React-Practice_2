import React from 'react';
import '../Styles/WHTable.css';

class WHTable extends React.Component{

  render() {
    return (
        <div className="row table-styles">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Warehouse Code</th>
                <th>Country Code</th>
                <th>Name</th>
                <th>Is Pickup Location?</th>
                <th>Is Ikiosk?</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.props.tupleArray}</tbody>
          </table>
        </div>
    );
  }
}

export default WHTable
