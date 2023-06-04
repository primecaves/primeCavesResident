import { combineReducers } from 'redux';
// import {routerReducer} from 'react-router-redux';
import appReducer from './app.reducer';

export const defaultReducers = {
  appReducer,
};
const rootReducer = combineReducers(defaultReducers);

export default rootReducer;

// export default rootReducer;
