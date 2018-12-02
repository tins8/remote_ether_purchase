import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleRefresh } from '../actions';
import { bindActionCreators } from 'redux';

class HandleRefresh extends Component {
   constructor(props) {
    super(props);
   }

   render() {
     return (
        <div className="pv3">
          <div className="f6 link dim br3 ph3 pv2 mb0 dib white bg-dark-blue pointer" 
            onClick={(e) => {
              e.preventDefault();
              this.props.func();
              this.props.dispatch(handleRefresh());
            }}
          >Refresh</div>
      </div>
     )
   }
   mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(handleRefresh, dispatch) }
  }
}

export default connect(this.mapDispatchToProps)(HandleRefresh);
