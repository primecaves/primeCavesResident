import API from '../../services/baseApi';

export const validateUserCredential = request => {
  const url = '/validateUserCredential';
  return API.post(url, request);
};

export const loginUser = request => {
  const url = '/login';
  return API.post(url, request);
};
