import API from '../../services/baseApi';

export const fetchAllAmenities = () => {
  const url = '/amenities';
  return API.get(url);
};

export const fetchSingleAmenity = id => {
  const url = `/amenity?id=${id}`;
  return API.get(url);
};

export const addAmenityToResident = id => {
  const url = `/addAmenityToResident?id=${id}`;
  return API.put(url);
};

export const getBookedAmenities = id => {
  const url = `/bookamenities?id=${id}`;
  return API.get(url);
};

export const deleteAmenitiesFromResident = (residentId, request) => {
  const url = `/deleteAmenitiesFromResident?id=${residentId}`;
  return API.put(url, request);
};
