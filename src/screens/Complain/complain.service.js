import API from '../../services/baseApi';

export const getAllComplaints = () => {
  const url = '/complaints';
  return API.get(url);
};

export const getSingleComplaint = id => {
  const url = `/complaint?id=${id}`;
  return API.get(url);
};

export const addComplaint = req => {
  const url = 'complaint';
  return API.post(url, req);
};

export const getBookedComplaints = id => {
  const url = `/getBookedComplaints?id=${id}`;
  return API.get(url);
};

export const deleteComplaint = id => {
  const url = `/complaint?id=${id}`;
  return API.delete(url);
};
export const updateComplaint = (id, req) => {
  const url = `/complaint?id=${id}`;
  return API.put(url, req);
};
