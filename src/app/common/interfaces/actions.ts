import { authActionName, eventActionsName, modalActionName } from '../constants/actionsNames';
import { IEvent } from './models';

export interface IEventAction {
  type: eventActionsName;
  payload?: IEvent;
}

export interface IModalAction {
  type: modalActionName;
  payload?: any;
}

export interface IAuthAction {
  type: authActionName;
  payload?: any;
}