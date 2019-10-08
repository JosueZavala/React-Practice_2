import React from 'react';
import SearchInput from '../components/SearchInput';
import OptionCard from '../components/OptionCard';
import Toggle from '../components/Toggle';
import '../Styles/PaymentRestrictions.css';

class PaymentRestrictions extends React.Component{
  constructor(){
    super();
    this.SearchInWarehouses = this.SearchInWarehouses.bind(this);
    this.ShowSKURestrictions = this.ShowSKURestrictions.bind(this);
    this.GenerateOptionCards = this.GenerateOptionCards.bind(this);
    this.UpdateLocaleSelected = this.UpdateLocaleSelected.bind(this);
    this.LocalesNextButton = this.LocalesNextButton.bind(this);

    this.state = {
        stepOne: false,
        stepTwo: false,
        stepThree: false,
        apiLocaleResponse: {
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
        },
        localesArray: [],
        arrayOptionCards: [],
        localeSelected: '',
        toggleChecked: false
    };
  }

  SearchInWarehouses(searchValue){
    console.log(searchValue);
    }

  ShowSKURestrictions() {
     this.setState({
       stepThree: !this.state.stepThree,
       toggleChecked: !this.state.toggleChecked
     });
  }

  UpdateLocaleSelected(locale) {
    this.setState({ localeSelected: locale });
    //console.log(locale);
  }

  LocalesNextButton(){
    let _locale = this.state.localeSelected;
    this.setState({
      stepTwo: true,
      stepThree: false,
      toggleChecked: false
    });
  }

  GenerateOptionCards(searchValue){
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

                text={data} inputName="locales" key={index}/>
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
            arrayOptionCards: itemsArray,
            stepOne: true,
            stepTwo: false,
            stepThree: false,
            toggleChecked: false,
            notFoundMessage: 'Country Found: ' + countriesWihtOutLastPoint
          });
       }else {
         this.setState({
           arrayOptionCards: [],
           stepOne: false,
           stepTwo: false,
           stepThree: false,
           toggleChecked: false,
           notFoundMessage: 'Any country or Locale found with: ' + searchValue
         });
       }
    }

  componentWillMount(){
    let localeArrayfromAPI = this.state.apiLocaleResponse.locales;
    let codeArray = [];
    localeArrayfromAPI.map((item) => {
      codeArray.push(item.code);
    });
    this.setState({ localesArray: codeArray });
    console.log(codeArray);
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
                  FunctionOnChange = {this.GenerateOptionCards}
                  Message = {this.state.notFoundMessage}
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
                            {this.state.arrayOptionCards}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="actions-container">
                      <button className="action-button" onClick = {this.LocalesNextButton}>Next</button>
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

                        </div>
                        <div className="col-xl-5 col-lg-4 col-md-4 col-sm-4 options-container general-restrictions">

                        </div>

                      </div>
                    </div>
                    <div className="actions-restrictions-container">
                      <button className="action-button">Save</button>
                      <button className="action-button">Reset</button>
                    </div>
                    <div className="toggle-container">
                     SKU Restrictions.
                     <Toggle
                        isChecked = {this.state.toggleChecked}
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
}

export default PaymentRestrictions
