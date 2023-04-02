import { EMPTY_STRING } from 'tbase/app.constants';
import { MAIN_APPLICATION_FEATURE_TYPE } from 'constants/app.constants';
import API from '../../services/baseApi';

export const fetchAllNotices = () => {
  const url = '/notices';
  return API.get(url);
};

export const fetchSingleNotice = (id) => {
  const url = `/notice?id=${id}`;
  return API.get(url);
};
