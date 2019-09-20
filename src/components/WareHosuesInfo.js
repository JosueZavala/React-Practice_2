import React from 'react';
import WHTable  from '../components/WHTable';
import SearchInput from '../components/SearchInput';
import WHTuple from '../components/WHTuple';


class WareHosuesInfo extends React.Component{
  constructor(){
    super();
    this.SearchInWarehouses = this.SearchInWarehouses.bind(this);
    this.state = {
      Warehouses: [
        {
          "Code": "deserunt",
          "Name": "fugiat",
          "ShortName": "ea",
          "Latitude": -68.737033,
          "Longitude": 24.687642,
          "Address1": "203 Middleton Street, Grazierville, Marshall Islands, 3917",
          "Address2": "999 Tompkins Avenue, Robbins, Massachusetts, 5907",
          "City": "Kerby",
          "CountryDistrict": "Lorem",
          "StateProvinceTerritory": "do",
          "PostalCode": 2385,
          "isIkiosk": true,
          "CountryCode": "FR-PM",
          "phone": "+1 (880) 421-3098"
        },
        {
          "Code": "non",
          "Name": "nostrud officia",
          "ShortName": "amet",
          "Latitude": 74.84119,
          "Longitude": 113.161719,
          "Address1": "539 Horace Court, Gallina, Minnesota, 4349",
          "Address2": "275 Stuyvesant Avenue, Ona, Maine, 3510",
          "City": "Fairacres",
          "CountryDistrict": "enim",
          "StateProvinceTerritory": "occaecat",
          "PostalCode": 9521,
          "isIkiosk": true,
          "CountryCode": "EN-RW",
          "phone": "+1 (853) 453-3589"
        },
        {
          "Code": "eu",
          "Name": "nisi",
          "ShortName": "excepteur",
          "Latitude": -66.795954,
          "Longitude": -52.078671,
          "Address1": "335 Halleck Street, Mulino, Palau, 4367",
          "Address2": "340 Pleasant Place, Chamberino, Idaho, 2678",
          "City": "Whitmer",
          "CountryDistrict": "sit",
          "StateProvinceTerritory": "sit",
          "PostalCode": 1187,
          "isIkiosk": false,
          "CountryCode": "EN-BH",
          "phone": "+1 (971) 435-2430"
        },
        {
          "Code": "dolor",
          "Name": "minim deserunt",
          "ShortName": "ipsum",
          "Latitude": -73.543712,
          "Longitude": 72.201684,
          "Address1": "812 Summit Street, Selma, Delaware, 2583",
          "Address2": "468 Box Street, Tolu, Georgia, 3310",
          "City": "Bladensburg",
          "CountryDistrict": "irure",
          "StateProvinceTerritory": "ad",
          "PostalCode": 1473,
          "isIkiosk": false,
          "CountryCode": "EN-IN",
          "phone": "+1 (871) 440-3083"
        }
      ],
      arrayTuple: [],
      displayContainer: 'none',
      notFoundMessage: ''
    };
  }

  SearchInWarehouses(searchValue){
    const itemsArray = [];
    const warehousesJson = this.state.Warehouses;
    const searchValueUpperCase = searchValue.toUpperCase();
    let countryCodeUpperCase = '';
    let countryFound = '';

    warehousesJson.forEach((data, index) => {
      countryCodeUpperCase = data.CountryCode.toUpperCase();

      if ( countryCodeUpperCase.includes(searchValueUpperCase) ){
          itemsArray.push(
              <WHTuple dataObject = {data} key = {"tuple"+index}/>
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
            arrayTuple: itemsArray,
            displayContainer: '',
            notFoundMessage: 'Country Found: ' + countriesWihtOutLastPoint
          });
       }else {
         this.setState({
           arrayTuple: [],
           displayContainer: 'none',
           notFoundMessage: 'Any country or Locale found with: ' + searchValue
         });
       }
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
                  FunctionOnChange = {this.SearchInWarehouses}
                  Message = {this.state.notFoundMessage}
                />
              </div>
              <WHTable tupleArray = {this.state.arrayTuple}/>
            </div>
        </div>
      </div>
    );
  }
}

export default WareHosuesInfo
