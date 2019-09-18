import React from 'react';
import LocaleCard from '../components/LocaleCard';
import SearchInput from '../components/SearchInput'

class CatalogGenerator extends React.Component{
  constructor(props){
    super(props);
    this.RenderLocaleCards = this.RenderLocaleCards.bind(this);

    this.state = {
      countries: [
        {
          Country:'SWITZERLAND',
          Code:'FR-SW',
          isShop: true,
        },{
          Country:'SWITZERLAND',
          Code:'AL-SW',
          isShop: true,
        },{
          Country:'India',
          Code:'EN-IN',
          isShop: false,
        },{
          Country:'Brazil',
          Code:'PT-br',
          isShop: false,
        },{
          Country:'Brazil',
          Code:'PT-br',
          isShop: false,
        }
      ],
      arrayCards: [],
      displayContainer: 'none',
      notFoundMessage: ''
    }
  }

  RenderLocaleCards(searchValue) {
    const itemsArray = [];
    const countriesJson = this.state.countries;
    const searchValueUpperCase = searchValue.toUpperCase();

    countriesJson.forEach((data, index) => {
      let dataUpperCase = data.Country.toUpperCase();
      let codeUpperCase = data.Code.toUpperCase();

        if ( dataUpperCase.includes(searchValueUpperCase) ||  codeUpperCase.includes(searchValueUpperCase) ){
          itemsArray.push(
              <div className="col-6">
                <LocaleCard country={data.Country} locale={data.Code} isShop={data.isShop} key={"locale"+index}/>
              </div>
              );
            }
          });
    this.UpdateSetState(itemsArray, searchValue);
  }

  UpdateSetState(itemsArray, searchValue){
      if (searchValue !== '' && itemsArray.length > 0) {
       this.setState({
         arrayCards: itemsArray,
         displayContainer: '',
         notFoundMessage: '',
       });
     }else {
       this.setState({
         arrayCards: [],
         displayContainer: 'none',
         notFoundMessage: 'Any country or Locale found with: ' + searchValue,
       });
     }
  }

  render() {


    return (
      <div className="container-fluid">
        <div className="row">
          <div className="title-Module">
            Catalog Generator
          </div>
        </div>

        <div className="container">
           <div className="row">
             <div className="col-sm">
               Locales
             </div>
          </div>

           <div className="row">
             <div className="col-sm dropDown-container">
                <SearchInput
                  FunctionOnChange =  {this.RenderLocaleCards}
                  Message = {this.state.notFoundMessage}
                />
                <div
                  className="row card-Locales-container"
                  style={{ display: `${this.state.displayContainer}`}}
                  >
                  {this.state.arrayCards}
                </div>
             </div>
          </div>


      </div>


      </div>
    );
  }
}

export default CatalogGenerator
