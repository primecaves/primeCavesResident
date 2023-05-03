import API from '../../services/baseApi';

export const fetchAllClubHouse = () => {
  const url = '/clubhouse';
  return API.get(url);
};

export const fetchSingleClubHouse = id => {
  const url = `/clubhouse?id=${id}`;
  return API.get(url);
};

export const addClubHouseToResident = id => {
  const url = `/addClubhouseToResident?id=${id}`;
  return API.put(url);
};

export const getBookedClubHouse = id => {
  const url = `/bookclubhouse?id=${id}`;
  return API.get(url);
};
