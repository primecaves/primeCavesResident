import API from '../../services/baseApi';

export const validateUserCredential = request => {
  const url = '/validateUserCredential';
  return API.post(url, request);
};
