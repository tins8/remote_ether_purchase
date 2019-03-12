import React, { Component } from 'react';
import { connect } from 'react-redux';

class Price extends Component {  
  render(){
    return (
      <div className="cf ph1-ns">
        {this.props.price}
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    price: state.priceReducer,
  };
}
export default connect(mapStateToProps)(Price);
