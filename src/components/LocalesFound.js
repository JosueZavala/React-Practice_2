import React from 'react';
import OptionCard from '../components/OptionCard';
import API from '../components/api';
import UniqueId from 'react-html-id';
import '../Styles/PaymentRestrictions.css';

class LocalesFound extends React.Component{
  constructor(){
    super();
    this.GenerateLocaleOptionCards = this.GenerateLocaleOptionCards.bind(this);
    this.state = {
      localesOptionCards: [],
      apiLocaleResponse: {},
      localesArray: [],
      _handleFunction: ''
    };
  }

  GenerateLocaleOptionCards(searchValue){
    const itemsArray = [];
    const _localesArray = this.state.localesArray;
    const searchValueUpperCase = searchValue.toUpperCase();
    let countryCodeUpperCase = '';
    let countryFound = '';


    _localesArray.forEach((data, index) => {
      countryCodeUpperCase = data.toUpperCase();

      if ( countryCodeUpperCase.includes(searchValueUpperCase) ){
          itemsArray.push(
              <OptionCard
                FunctionOnChange = {this.UpdateLocaleSelected}
                color={1}
                text={data} inputName="locales" key={this.nextUniqueId()}/>
            );
          }
        });
        this.setState({ localesOptionCards: itemsArray });
    }

    UpdateLocaleSelected(locale) {
      this.setState({
        localeSelected: locale
      });
    }

  _getLocales(){
    API.get('Locale')
      .then(res => {
        const localesData = res.data;
        this.setState({ apiLocaleResponse: localesData });
        this._updateLocalesArray(localesData.locales);
      })
      .catch(error => {
        this._showSweetAlert(error, 'error', 'Error in: _getLocales');
      });

      /*API RESPONSE EXAMPLE*/
      /*apiLocaleResponse: {
        "tokenization": true,
        "countryConfiguration": [
          {
            "countryName": "España",
            "code": "ES",
            "defaultLocale": "es-ES",
            "validLocales": "es-ES",
            "languages": [
              {
                "isDefault": false,
                "code": "es-ES",
                "title": null
              }
            ],
            "warehouses": [
              {
                "key": "S4",
                "title": "Velazquez"
              }
            ]
          },
          {
            "countryName": "Malaysia",
            "code": "MY",
            "defaultLocale": "en-MY",
            "validLocales": "en-MY,zh-MY,ms-MY",
            "languages": [
              {
                "isDefault": true,
                "code": "en-MY",
                "title": "English"
              },
              {
                "isDefault": false,
                "code": "zh-MY",
                "title": "Chinese"
              },
              {
                "isDefault": false,
                "code": "ms-MY",
                "title": "Malay"
              }
            ],
            "warehouses": [
              {
                "key": "PG",
                "title": "PG Penang"
              },
              {
                "key": "JB",
                "title": "JB Johor Bahru"
              },
              {
                "key": "K7",
                "title": "KL Kuala Lumpur"
              },
              {
                "key": "A1",
                "title": "Testing warehouse A1"
              }
            ]
          }
        ],
        "locales": [
          {
            "country": "VN",
            "code": "FR-LV",
            "displayName": "Senegal (Chinese)",
            "prompt": "irure"
          },
          {
            "country": "MN",
            "code": "ES-BV",
            "displayName": "Czech Republic (Malay)",
            "prompt": "ullamco"
          },
          {
            "country": "BH",
            "code": "FR-GL",
            "displayName": "Equatorial Guinea (English)",
            "prompt": "occaecat"
          },
          {
            "country": "AR",
            "code": "PT-BJ",
            "displayName": "United States (Espanol)",
            "prompt": "Lorem"
          },
          {
            "country": "EG",
            "code": "PT-PM",
            "displayName": "Netherlands (Malay)",
            "prompt": "aute"
          },
          {
            "country": "YE",
            "code": "PT-KP",
            "displayName": "Nigeria (Chinese)",
            "prompt": "ipsum"
          },
          {
            "country": "BS",
            "code": "PT-MV",
            "displayName": "Burkina Faso (Malay)",
            "prompt": "exercitation"
          },
          {
            "country": "YT",
            "code": "FR-CG",
            "displayName": "Bhutan (Espanol)",
            "prompt": "officia"
          },
          {
            "country": "ZM",
            "code": "PT-IQ",
            "displayName": "Peru (Malay)",
            "prompt": "officia"
          },
          {
            "country": "VU",
            "code": "EN-SE",
            "displayName": "Swaziland (Malay)",
            "prompt": "et"
          },
          {
            "country": "TM",
            "code": "PT-SY",
            "displayName": "Chad (English)",
            "prompt": "enim"
          },
          {
            "country": "NE",
            "code": "FR-NA",
            "displayName": "Suriname (Malay)",
            "prompt": "in"
          },
          {
            "country": "IT",
            "code": "EN-CC",
            "displayName": "Norfolk Island (Espanol)",
            "prompt": "ad"
          },
          {
            "country": "NP",
            "code": "ES-DK",
            "displayName": "Tuvalu (Chinese)",
            "prompt": "ad"
          },
          {
            "country": "TW",
            "code": "FR-LY",
            "displayName": "Sao Tome and Principe (Malay)",
            "prompt": "officia"
          },
          {
            "country": "FK",
            "code": "ES-HM",
            "displayName": "Ghana (Espanol)",
            "prompt": "incididunt"
          }
        ]
}*/
  }

  _updateLocalesArray(localesData){
    let localeArrayfromAPI = localesData;
    let codeArray = [];
    localeArrayfromAPI.forEach((item) => {
      codeArray.push(item.code);
    });
    this.setState({ localesArray: codeArray });
  }

  render() {
    return (

      <div className="row">
         <div className={"first-step " + (this.props.StepOne ? '' : 'hideContainer')}>
            <div className="locales-container">
              <div className="row">
                <div className="title-segment">
                  <label> Locales: </label>
                </div>
              </div>
              <div className="row">
                <div className="options-container">
                  <div className="nowrap-row">
                    {this.state.localesOptionCards}
                  </div>
                </div>
              </div>
            </div>
            <div className="actions-container">
              <button className="action-button" onClick = {this.props.ShowSecondStep}>Next</button>
            </div>
         </div>
      </div>
    );
  }

  componentDidMount(){
    this._getLocales();
    this.setState({_handleFunction: this.GenerateLocaleOptionCards});
  }

}

export default LocalesFound
