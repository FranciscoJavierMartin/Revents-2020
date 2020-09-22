import { actions } from '../constants/actionsNames';
import { IAction } from '../interfaces/actions';
import { IEvent } from '../interfaces/models';

export function createEvent(event: IEvent): IAction {
  return {
    type: actions.CREATE_EVENT,
    payload: event,
  };
}

export function updateEvent(event: IEvent): IAction {
  return {
    type: actions.UPDATE_EVENT,
    payload: event,
  };
}

export function deleteEvent(event: IEvent): IAction {
  return {
    type: actions.DELETE_EVENT,
    payload: event,
  };
}
