import { eventActionsName } from '../../common/constants/actionsNames';
import { IEventAction } from '../../common/interfaces/actions';
import { IEvent } from '../../common/interfaces/models';

export function listenToEvents(events: any[]){
  return {
    type: eventActionsName.FETCH_EVENTS,
    payload: events,
  }
}

export function createEvent(event: IEvent): IEventAction {
  return {
    type: eventActionsName.CREATE_EVENT,
    payload: event,
  };
}

export function updateEvent(event: IEvent): IEventAction {
  return {
    type: eventActionsName.UPDATE_EVENT,
    payload: event,
  };
}

export function deleteEvent(event: IEvent): IEventAction {
  return {
    type: eventActionsName.DELETE_EVENT,
    payload: event,
  };
}
