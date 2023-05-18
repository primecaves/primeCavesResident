
import { EMPTY_OBJECT } from '../constants';
import { FETCH_USER_DETAILS } from '../screens/Authentication/authentication.actionTypes';

function appReducer(state = EMPTY_OBJECT, action) {
  switch (action.type) {
    case FETCH_USER_DETAILS:
      return {
        ...state,
        userDetails: action.userDetails,
      };
    default:
      return state;
  }
}

export default appReducer;
