import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCounter } from '../actions';
import { bindActionCreators } from 'redux';

class AddCounter extends Component {  
   render() {
     return (
        <div className="pv3">
          <div className="f6 link dim br3 ph3 pv2 mb0 dib white bg-dark-blue pointer" 
            onClick={(e) => {
              e.preventDefault();
              this.props.dispatch(addCounter());
            }}
          >Add</div>
      </div>
     )
   }
   mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(addCounter, dispatch) }
  }
}

export default connect(this.mapDispatchToProps)(AddCounter);
