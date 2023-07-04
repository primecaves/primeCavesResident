import API from '../../services/baseApi';

export const getSearchDetails = (url, request) => {
  return API.post(url, request);
};
