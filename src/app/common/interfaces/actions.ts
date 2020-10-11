import { LOCATION_CHANGE } from 'connected-react-router';
import { asyncActionName, profileActionName } from './../constants/actionsNames';
import { authActionName, eventActionsName } from '../constants/actionsNames';


export interface IEventAction {
  type: eventActionsName;
  payload?: any;
}

export interface IAuthAction {
  type: authActionName | typeof LOCATION_CHANGE;
  payload?: any;
}

export interface IAsyncAction {
  type: asyncActionName;
  payload?: any;
}

export interface IProfileAction {
  type: profileActionName;
  payload?: any;
}