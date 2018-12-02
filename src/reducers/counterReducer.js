import * as actionType from '../actions/ActionType';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case actionType.HANDLE_REFRESH:
      return state + action.payload;

    default:
      return state
  }
}

export default counterReducer;
