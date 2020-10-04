import { asyncActionName, profileActionName } from './../constants/actionsNames';
import { authActionName, eventActionsName } from '../constants/actionsNames';
import { IEvent } from './models';

export interface IEventAction {
  type: eventActionsName;
  payload?: any;
}

export interface IAuthAction {
  type: authActionName;
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