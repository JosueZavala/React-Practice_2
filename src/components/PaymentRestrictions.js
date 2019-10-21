import React from 'react';
import SearchInput from '../components/SearchInput';
import OptionCard from '../components/OptionCard';
import RestrictionsToggles from '../components/RestrictionsToggles';
import Toggle from '../components/Toggle';
import API from '../components/api';
import UniqueId from 'react-html-id';
import SweetAlert from 'sweetalert2-react';
import '../Styles/PaymentRestrictions.css';

class PaymentRestrictions extends React.Component{
  constructor(){
    super();
    this.ShowSKURestrictions = this.ShowSKURestrictions.bind(this);
    this.GenerateLocaleOptionCards = this.GenerateLocaleOptionCards.bind(this);
    this.UpdateLocaleSelected = this.UpdateLocaleSelected.bind(this);
    this.ShowSecondStep = this.ShowSecondStep.bind(this);
    this.UpdateWareHouseSelected = this.UpdateWareHouseSelected.bind(this);
    this.ChangeRestrictionToogle = this.ChangeRestrictionToogle.bind(this);

    UniqueId.enableUniqueIds(this);

    this.state = {
        stepOne: false,
        stepTwo: false,
        stepThree: false,
        apiLocaleResponse: {},
        apiwarehousesResponse: {
          "NPS": true,
          "invoiceOption": "WithPackage",
          "BambooPrinter": false,
          "dropshipmentorder": true,
          "orderSubTypeMap": null,
          "paymentConfiguration": [
            {
              "wareHouse": "*",
              "hasCreditCardInput": true,
              "hasManualCreditCardInput": false,
              "hasCashInput": false,
              "HasPGHCreditCardInput": false,
              "hasUpiInput": false,
              "hasNetBankingInput": false,
              "hasBayadCenterInput": false
            },
            {
              "wareHouse": "E1",
              "hasCreditCardInput": true,
              "hasManualCreditCardInput": true,
              "hasCashInput": true,
              "HasPGHCreditCardInput": false,
              "hasUpiInput": false,
              "hasNetBankingInput": false,
              "hasBayadCenterInput": false
            },
            {
              "wareHouse": "EXt2",
              "hasCreditCardInput": true,
              "hasManualCreditCardInput": true,
              "hasCashInput": false,
              "HasPGHCreditCardInput": true,
              "hasUpiInput": false,
              "hasNetBankingInput": false,
              "hasBayadCenterInput": false
            }
          ]
        },
        localesArray: [],
        warehousesArray: [],
        localesOptionCards: [],
        warehousesOptionCards: [],
        whRestrictionsToggles: [],
        localeSelected: '',
        warehouseSelected: '',
        restrictionsWHSelected: {},
        restrictionsWHToUpdate: {},
        toggleShowSKU: false,
        apiError: false
    };
  }

  ShowSKURestrictions() {
     this.setState({
       stepThree: !this.state.stepThree,
       toggleShowSKU: !this.state.toggleShowSKU
     });
  }

  UpdateLocaleSelected(locale) {
    this.setState({
      localeSelected: locale,
      toggleShowSKU: false,
      stepTwo: true,
      stepThree: false
    });

    this._getWarehousesAndRestrictions(locale);
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
          countryFound += countryCodeUpperCase + ', ';
          }
        });
      countryCodeUpperCase = countryFound ? countryFound : countryCodeUpperCase;
      this.UpdateSetState(itemsArray, searchValue, countryCodeUpperCase);
    }

  UpdateSetState(itemsArray, searchValue, countryCodeUpperCase){
      if (searchValue !== '' && itemsArray.length > 0 ) {
        let countriesWihtOutLastPoint = countryCodeUpperCase.substring(0, countryCodeUpperCase.length-2);
        this.setState({
          localesOptionCards: itemsArray,
          stepOne: true,
          stepTwo: false,
          stepThree: false,
          toggleShowSKU: false,
          notFoundMessage: 'Country Found: ' + countriesWihtOutLastPoint
        });
     }else {
       this.setState({
         localesOptionCards: [],
         stepOne: false,
         stepTwo: false,
         stepThree: false,
         toggleShowSKU: false,
         notFoundMessage: 'Any country or Locale found with: ' + searchValue
       });
     }
  }

  ShowSecondStep(){
    const _locale = this.state.localeSelected;
    this._getWarehousesAndRestrictions(_locale);
  }

  UpdateWareHouseSelected(warehouse){
    this.setState({ warehouseSelected: warehouse });
    this.GetWHRestrictionsObject(warehouse);
  }

  GetWHRestrictionsObject(warehouse){
    const _paymentConfigurations = this.state.apiwarehousesResponse.paymentConfiguration;
    const _warehouseSelected = warehouse;
    let _restrictionsObj = {};

    _paymentConfigurations.forEach((item) =>{
      if(item.wareHouse === _warehouseSelected){
        _restrictionsObj = {...item};
      }
    });
    delete _restrictionsObj.wareHouse;
    this.setState({
      restrictionsWHSelected: _restrictionsObj,
      restrictionsWHToUpdate: _restrictionsObj
    });
    //this.GenerateWHRestrictionsToggles(_restrictionsObj);
  }

  GenerateWHRestrictionsToggles(restrictionsObj){
    let _restrictionsObj = restrictionsObj;
    let _whRestrictionsToggles = [];
    let styleRight = { float: 'right'};
    let heightStyle = { height: '35px' };

    for( const restriction in _restrictionsObj ){
      let _restriction = this._beautyRestriction(restriction);
      _whRestrictionsToggles.push(
        <div style={heightStyle}>
        <label className="styleLeft">{_restriction}:</label>
        <Toggle
           isChecked = {_restrictionsObj[restriction]}
           toggleChanged = {this.ChangeRestrictionToogle}
           restriction={restriction}
           styles={styleRight}
           key={this.nextUniqueId()}
        />
        </div>
      );
    }
    this.setState({ whRestrictionsToggles: _whRestrictionsToggles });

  }

  ChangeRestrictionToogle(restriction){
    let _restrictionsWHToUpdate = {...this.state.restrictionsWHToUpdate};
    _restrictionsWHToUpdate[restriction] = !_restrictionsWHToUpdate[restriction];

    this.setState({restrictionsWHToUpdate: _restrictionsWHToUpdate});
  }

  SaveWareHousesRestrictions(){
    console.log(this.state.restrictionsWHToUpdate);
  }

  ResetWareHousesRestrictions(){
    const _restrictions = {...this.state.restrictionsWHSelected};
    this.setState({ restrictionsWHToUpdate: _restrictions });
    debugger;
    this.GenerateWHRestrictionsToggles(_restrictions);
  }

  _beautyRestriction(uglyRestriction){
    let beautyRestriction;
    switch (uglyRestriction) {
      case 'hasCreditCardInput':
          beautyRestriction = 'Credit Card';
        break;
      case 'hasManualCreditCardInput':
          beautyRestriction = 'Manual Credit Card';
        break;
      case 'hasCashInput':
          beautyRestriction = 'Cash';
        break;
      case 'HasPGHCreditCardInput':
          beautyRestriction = 'PGH Credit Card';
        break;
      case 'hasUpiInput':
          beautyRestriction = 'Upi';
        break;
      case 'hasNetBankingInput':
          beautyRestriction = 'Net Banking';
        break;
      case 'hasBayadCenterInput':
          beautyRestriction = 'Bayad Center';
        break;
      default:
          beautyRestriction = 'Unknown Pay method';
    }
    return beautyRestriction;
  }

  _getLocales(){
    /*API.get('Locale')
      .then(res => {
        const localesData = res.data;
        this.setState({ apiLocaleResponse: localesData });
        this._updateLocalesArray(localesData.locales);
      })
      .catch(error => {
        this._showSweetAlert(error, 'error', 'Error in: _getLocales');
      });*/

      /*API RESPONSE EXAMPLE*/
      let apiLocaleResponse = {
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
};
      this.setState({ apiLocaleResponse: apiLocaleResponse });
      this._updateLocalesArray(apiLocaleResponse.locales);

  }

  _getWarehousesAndRestrictions(locale){

    /*API.get('Payment/GetRestrictions/'+locale)
      .then(res => {
        const restrictionsData = res.data;
        this._updateWarehousesArray(restrictionsData);
      })
      .catch(error => {
        this._showSweetAlert(error, 'error', 'Error in: _getWarehousesAndRestrictions');
      });*/

      /*API RESPONSE EXAMPLE*/
      const restrictionsData = {
        "NPS": true,
        "invoiceOption": "WithPackage",
        "BambooPrinter": false,
        "dropshipmentorder": true,
        "orderSubTypeMap": null,
        "paymentConfiguration": [
          {
            "wareHouse": "*",
            "hasCreditCardInput": true,
            "hasManualCreditCardInput": false,
            "hasCashInput": false,
            "HasPGHCreditCardInput": false,
            "hasUpiInput": false,
            "hasNetBankingInput": false,
            "hasBayadCenterInput": false
          },
          {
            "wareHouse": "E1",
            "hasCreditCardInput": true,
            "hasManualCreditCardInput": true,
            "hasCashInput": true,
            "HasPGHCreditCardInput": false,
            "hasUpiInput": false,
            "hasNetBankingInput": false,
            "hasBayadCenterInput": false
          },
          {
            "wareHouse": "EXt2",
            "hasCreditCardInput": true,
            "hasManualCreditCardInput": true,
            "hasCashInput": false,
            "HasPGHCreditCardInput": true,
            "hasUpiInput": false,
            "hasNetBankingInput": false,
            "hasBayadCenterInput": false
          }
        ]
};
      this._updateWarehousesArray(restrictionsData);
  }

  _updateLocalesArray(localesData){
    let localeArrayfromAPI = localesData;
    let codeArray = [];
    localeArrayfromAPI.forEach((item) => {
      codeArray.push(item.code);
    });
    this.setState({ localesArray: codeArray });
  }

  _updateWarehousesArray(apiwarehousesResponse){
    const _apiwarehousesResponse = apiwarehousesResponse;
    const _paymentConfigurations = _apiwarehousesResponse.paymentConfiguration;
    const _warehousesArray = [];

    if(_paymentConfigurations){
      _paymentConfigurations.forEach((item, index) => {
        _warehousesArray.push(item.wareHouse);
      });
      this.setState({
        warehousesArray: _warehousesArray,
        apiwarehousesResponse: _apiwarehousesResponse
       });

      this._generateWarehousesOptionCards(_warehousesArray);
    }else{
      let _title='Not found Warehouses for:';
      this._showSweetAlert(this.state.localeSelected, 'info', _title);
    }

  }

  _generateWarehousesOptionCards(warehousesArray){
    const _itemsArray = [];
    const _warehousesArray = warehousesArray;


    _warehousesArray.forEach((data, index) => {
      _itemsArray.push(
          <OptionCard
            FunctionOnChange = {this.UpdateWareHouseSelected}
            color={2}
            text={data} inputName="warehouses" key={this.nextUniqueId()}/>
        );
    });
    this.setState({
      warehousesOptionCards: _itemsArray,
      stepTwo: true,
      stepThree: false,
      toggleShowSKU: false
    });
  }

  _showSweetAlert(message, type, title){
    this.setState({
      apiError: true,
      swaltype: type,
      swaltitle: title,
      swaltext: message
    });
  }


  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="title-Module">
            Payment Restrictions
          </div>
        </div>
        <div className="row">
            <div className="container">
              <div className="col-sm dropDown-container">
                <SearchInput
                  FunctionOnChange = {this.GenerateLocaleOptionCards}
                  Message = {this.state.notFoundMessage}
                />
                <SweetAlert
                  show={this.state.apiError}
                  type={this.state.swaltype}
                  title={this.state.swaltitle}
                  text={this.state.swaltext}
                  onConfirm={() => this.setState({ apiError: false })}
                />
                {/*First Section*/}
                <div className="row">
                 <div className={"first-step " + (this.state.stepOne ? '' : 'hideContainer')}>
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
                      <button className="action-button" onClick = {this.ShowSecondStep}>Next</button>
                    </div>
                 </div>
                </div>

                {/*Second Section*/}
                <div className="row">
                 <div className={"second-step " + (this.state.stepTwo ? '' : 'hideContainer')}>
                    <div className="restrictions-container">
                      <div className="row">
                        <div className="title-segment">
                          <label> Warehouses Restrictions: </label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 options-container general-restrictions">
                          {this.state.warehousesOptionCards}
                        </div>
                        <RestrictionsToggles
                          DataRestrictions={this.state.restrictionsWHToUpdate}
                          ChangeRestrictionToogle = {this.ChangeRestrictionToogle}
                          WareHouseSelected = {this.state.warehouseSelected}
                        />

                      </div>
                    </div>
                    <div className="actions-restrictions-container">
                      <button className="action-button" onClick={this.SaveWareHousesRestrictions.bind(this)}>Save</button>
                      <button className="action-button" onClick={this.ResetWareHousesRestrictions.bind(this)}>Reset</button>
                    </div>
                    <div className="toggle-container">
                     Show SKU Restrictions.
                     <Toggle
                        isChecked = {this.state.toggleShowSKU}
                        toggleChanged = {this.ShowSKURestrictions}
                     />
                    </div>
                  </div>

                </div>

                {/*Third Section*/}
                <div className="row">
                 <div className={"third-step " + (this.state.stepThree ? '' : 'hideContainer')}>
                    <div className="restrictions-container">
                      <div className="row">
                        <div className="title-segment">
                          <label> SKU's Restrictions: </label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 options-container general-restrictions">

                        </div>
                        <div className="col-xl-5 col-lg-4 col-md-4 col-sm-4 options-container general-restrictions">

                        </div>
                      </div>
                    </div>
                    <div className="actions-restrictions-container">
                      <button className="action-button">Save</button>
                      <button className="action-button">Reset</button>
                    </div>
                 </div>
                </div>

              </div>
            </div>
        </div>
      </div>
    );
  }

  componentDidMount(){
    this._getLocales();
  }
}

export default PaymentRestrictions
