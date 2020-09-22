import { combineReducers } from 'redux';
import eventReducer from './reducer';

const rootReducer = combineReducers({
  event: eventReducer,
});

export default rootReducer;
