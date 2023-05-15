import API from '../../services/baseApi';

export const fetchAllNotices = () => {
  const url = '/notices';
  return API.get(url);
};

export const fetchSingleNotice = id => {
  const url = `/notice?id=${id}`;
  return API.get(url);
};
