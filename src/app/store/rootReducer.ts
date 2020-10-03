import { combineReducers } from 'redux';
import { IRootState } from '../common/interfaces/states';
import eventReducer from './events/eventReducer';
import authReducer from './auth/authReducer';
import asyncReducer from './async/asyncReducer';

//FIXME: Add proper type
const rootReducer = combineReducers({
  event: eventReducer,
  auth: authReducer,
  async: asyncReducer,
});

export default rootReducer;
