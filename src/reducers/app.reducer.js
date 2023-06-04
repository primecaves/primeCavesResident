
import { EMPTY_OBJECT } from '../constants';
import { SET_USER_DETAILS } from '../screens/Authentication/authentication.actionTypes';

function appReducer(state = EMPTY_OBJECT, action) {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.userDetails,
      };
    default:
      return state;
  }
}

export default appReducer;
