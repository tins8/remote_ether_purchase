import React, { Component } from 'react';
import { connect } from 'react-redux';

class Counter extends Component {  
  render(){
    return (
      <div className="cf ph1-ns">
        {this.props.count}
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    count: state.counterReducer,
  };
}
export default connect(mapStateToProps)(Counter);
