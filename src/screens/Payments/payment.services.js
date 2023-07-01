import API from '../../services/baseApi';

export const generateInvoice = (data) => {
  const url = '/generateInvoice';
  return API.post(url,data);
};
