import { FETCH_USER_DETAILS } from './authentication.actionTypes';

export function fetchUserDetails(userDetails) {
  return {
    type: FETCH_USER_DETAILS,
    userDetails,
  };
}
