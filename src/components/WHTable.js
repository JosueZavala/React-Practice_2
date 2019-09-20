import React from 'react';

class WHTable extends React.Component{
  constructor(props){
    super(props);
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
            <tbody>{this.props.tupleArray}</tbody>
          </table>
        </div>
    );
  }
}

export default WHTable
