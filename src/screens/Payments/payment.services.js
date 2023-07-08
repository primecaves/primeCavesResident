import API from '../../services/baseApi';

export const generateInvoice = data => {
  const url = '/generateInvoice';
  return API.post(url, data);
};

export const getUserMaintenanceDetails = userID => {
  const url = `/getUserMaintenanceDetails/?userID=${userID}`;
  return API.get(url);
};

export const updateUserMaintenanceDetails = data => {
  const url = '/updateUserMaintenanceDetails';
  return API.post(url, data);
};
