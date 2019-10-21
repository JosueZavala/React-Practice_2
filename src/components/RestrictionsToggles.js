import React from 'react';
import Toggle from '../components/Toggle';
import UniqueId from 'react-html-id';

class RestrictionsToggles extends React.Component {

    constructor ( props ) {
        super( props );
        UniqueId.enableUniqueIds(this);

    		this.state = {
    			DataRestrictions: this.props.DataRestrictions,
          warehouseSelected: this.props.WareHouseSelected,
          whRestrictionsToggles: []
    		}

    }


    render () {

        return(
          <div className="col-xl-5 col-lg-4 col-md-4 col-sm-4 options-container general-restrictions">
            {this.state.whRestrictionsToggles}
          </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
      /*if (this.props.DataRestrictions !== prevProps.DataRestrictions) {
        this.setState({DataRestrictions: this.props.DataRestrictions});
      }*/
      if(this.props.WareHouseSelected !== prevProps.WareHouseSelected) {
          this.GenerateWHRestrictionsToggles(this.props.DataRestrictions);
      }
    }

    static getDerivedStateFromProps(props, state) {
      if (props.DataRestrictions !== state.DataRestrictions) {
        debugger;
        return {
          DataRestrictions: props.DataRestrictions,
        };

      }
      return null;
    }

    GenerateWHRestrictionsToggles(restrictionsObj){
      let _restrictionsObj = {...restrictionsObj};
      let _whRestrictionsToggles = [];
      let styleRight = { float: 'right'};
      let heightStyle = { height: '35px' };

      for( const restriction in _restrictionsObj ){
        let _restriction = this._beautyRestriction(restriction);
        _whRestrictionsToggles.push(
          <div style={heightStyle}>
          <label className="styleLeft">{_restriction}:</label>
          <Toggle
             isChecked = {this.props.DataRestrictions[restriction]}
             toggleChanged = {this.props.ChangeRestrictionToogle}
             restriction={restriction}
             styles={styleRight}
             key={this.nextUniqueId()}
          />
          </div>
        );
      }
      console.log(_restrictionsObj);
      console.log(_whRestrictionsToggles);

      this.setState({ whRestrictionsToggles: _whRestrictionsToggles });

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

}
export default RestrictionsToggles
