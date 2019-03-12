import * as actionType from './ActionType';

export const showPrice = (f) => ({
  type: actionType.SHOW_PRICE,
  payload: f
});
