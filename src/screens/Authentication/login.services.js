import API from '../../services/baseApi';

export const validateUserCredential = request => {
  const url = '/validateUserCredential';
  return API.post(url, request);
};

export const loginUser = request => {
  const url = '/login';
  return API.post(url, request);
};

export const updateResident = request => {
  const url = '/updateResident';
  return API.post(url, request);
};

export const fetchWebViewUrl = () => {
  const url = '/getResidentWebViewUrl';
  return API.get(url);
};

export const fetchOTPCredentials = () => {
  const url = '/getOTPCredentials';
  return API.get(url);
};
