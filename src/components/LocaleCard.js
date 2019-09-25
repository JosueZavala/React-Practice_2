import React from 'react';
import '../Styles/LocaleCard.css';
import SweetAlert from 'sweetalert2-react';

class LocaleCard extends React.Component{
  constructor(props) {
    super(props);
    this.SetSweetAlert = this.SetSweetAlert.bind(this);

    this.state = {
        show: false,
        swaltype: "",
        swaltitle: "",
        swaltext: "",
    }

  }

  SetSweetAlert(type, title, text) {
      this.setState({
        show: true,
        swaltype: type,
        swaltitle: title,
        swaltext: text
      });
  }

  render() {
    return(
      <div className={"Locale-container "+ (this.props.isShop ? '' : 'isLegacyClass')}>
        <div className="Title-Locale">
          {this.props.country}
        </div>
        <div className="SubTitle-Locale">
          {this.props.locale}
        </div>
        <div className="Button-container">
          <button
            type="button"
            className="btn btn-success action-button"
            onClick={() => this.SetSweetAlert("success","Catalog Sent","All done well")}
            >Catalog</button>

            <button
              type="button"
              className="btn btn-success"
              onClick={() => this.SetSweetAlert("error","Images wrong","Example of alert wrong")}
            >Image</button>

            <SweetAlert
              show={this.state.show}
              type={this.state.swaltype}
              title={this.state.swaltitle}
              text={this.state.swaltext}
              onConfirm={() => this.setState({ show: false })}
            />
        </div>
      </div>
    );
  }
}

  export default LocaleCard
