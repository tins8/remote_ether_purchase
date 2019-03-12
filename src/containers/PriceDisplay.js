import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showPrice } from '../actions';
import { bindActionCreators } from 'redux';

class PriceDisplay extends Component {  
   render() {
     return (
        <div className="pv3">
          <div className="f6 link dim br3 ph3 pv2 mb0 dib white bg-dark-blue pointer"
            onClick={(e) => {
              e.preventDefault();
              this.props.refresh();
              this.props.dispatch(showPrice(this.props.eth));
            }}
          >Refresh Price</div>
      </div>
     )
   }
   mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(showPrice, dispatch) }
  }
}

export default connect(this.mapDispatchToProps)(PriceDisplay);
