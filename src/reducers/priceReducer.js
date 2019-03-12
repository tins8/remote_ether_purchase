import * as actionType from '../actions/ActionType';

const priceReducer = (state = 0, action) => {
  switch (action.type) {
    case actionType.SHOW_PRICE:
      return action.payload;
    default:
      return state
  }
}

export default priceReducer;
