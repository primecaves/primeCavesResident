import { SET_USER_DETAILS } from './authentication.actionTypes';

export function setUserDetails(user) {
  return {
    type: SET_USER_DETAILS,
    user,
  };
}
