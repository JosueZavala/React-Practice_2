import React from 'react';
import SearchInput from '../components/SearchInput';
import LocalesFound from '../components/LocalesFound';
import WHTuple from '../components/WHTuple';
import WHTable  from '../components/WHTable';
import OptionCard from '../components/OptionCard';
import API from '../components/api';
import UniqueId from 'react-html-id';
import SweetAlert from 'sweetalert2-react';



class WareHosuesInfo extends React.Component{
  constructor(){
    super();
    this.UpdateLocaleSelected = this.UpdateLocaleSelected.bind(this);
    this.GenerateLocaleOptionCards = this.GenerateLocaleOptionCards.bind(this);
    UniqueId.enableUniqueIds(this);

    this.state = {
      Warehouses: [],
      arrayTuple: [],
      localesArray: [],
      localeSelected: '',
      localesOptionCards: [],
      displayContainer: false,
      notFoundMessage: '',
      apiError: false,
      swaltype: '',
      swaltitle: '',
      swaltext: ''
    };
  }

  /*SearchInput*/
  UpdateSetState(itemsArray, searchValue, countryCodeUpperCase){
        if (searchValue !== '' && itemsArray.length > 0 ) {
          let countriesWihtOutLastPoint = countryCodeUpperCase.substring(0, countryCodeUpperCase.length-2);
          this.setState({
            localesOptionCards: itemsArray,
            displayContainer: true,
            notFoundMessage: 'Country Found: ' + countriesWihtOutLastPoint
          });
       }else {
         this.setState({
           localesOptionCards: [],
           displayContainer: false,
           notFoundMessage: 'Any country or Locale found with: ' + searchValue
         });
       }
    }

  /*LocalesFound*/
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

  UpdateLocaleSelected(locale) {
        this.setState({
          localeSelected: locale,
          arrayTuple: []
        });
        this._getWareHouses(locale);
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
    }

  _getWareHouses(locale){
    let allWareHouses='?showAllWarehouses=true';
    API.get('PickupLocation/GetPickupLocations/'+locale+allWareHouses)
      .then(res => {
        const warehousesData = res.data;
        this.setState({ Warehouses: warehousesData });
        this._updatAarrayTuple(warehousesData, locale);
      })
      .catch(error => {
        this._showSweetAlert(error, 'error', 'Error trying to get WH data');
      });
  }

  _updateLocalesArray(localesData){
      let localeArrayfromAPI = localesData;
      let codeArray = [];
      localeArrayfromAPI.forEach((item) => {
        codeArray.push(item.code);
      });
      this.setState({ localesArray: codeArray });
    }

  _updatAarrayTuple(wareHousesData){
    const itemsArray = [];
    const warehousesJson = wareHousesData;

    warehousesJson.forEach((data, index) => {
      const dataWithLocale = {...data, locale: this.state.localeSelected};
      itemsArray.push(
          <WHTuple dataObject = {dataWithLocale} key = {"tuple"+index}/>
        );
      });
      this.setState({ arrayTuple: itemsArray });
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
            Warehosues Info
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
                <LocalesFound
                  StepOne = {this.state.displayContainer}
                  LocalesOptionCards = {this.state.localesOptionCards}
                  ShowSecondStep = {() => {}}
                />
              </div>
              <WHTable tupleArray = {this.state.arrayTuple}/>
            </div>
        </div>
      </div>
    );
  }

  componentDidMount(){
    this._getLocales();
  }
}

export default WareHosuesInfo
