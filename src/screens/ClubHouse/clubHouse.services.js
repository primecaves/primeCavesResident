import API from '../../services/baseApi';

export const fetchAllClubHouse = () => {
  const url = '/clubhouses';
  return API.get(url);
};

export const fetchSingleClubHouse = id => {
  const url = `/clubhouse?id=${id}`;
  return API.get(url);
};

export const addClubHouseToResident = (id,req) => {
  const url = `/addClubhouseToResident?id=${id}`;
  return API.put(url,req);
};

export const getBookedClubHouse = id => {
  const url = `/bookclubhouse?id=${id}`;
  return API.get(url);
};

export const deleteClubhouseFromResident = (residentId, request) => {
  const url = `/deleteClubhouseFromResident?id=${residentId}`;
  return API.put(url, request);
};
