import API from '../../services/baseApi';

export const getServiceDetailsByResidentId = (id, req) => {
  const url = `/getServiceDetailsByResidentId/?id=${id}`;
  return API.post(url, req);
};
