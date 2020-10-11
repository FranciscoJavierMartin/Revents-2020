import {
  dataFromSnapshot,
  listenToEventsFromFirestore,
} from '../../api/firestore/firestoreService';
import { eventActionsName } from '../../common/constants/actionsNames';
import { IEventAction } from '../../common/interfaces/actions';
import { IComment, IEvent } from '../../common/interfaces/models';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../async/asyncActions';

export function fetchEvents(
  predicate: any,
  limit: number,
  lastDocSnapshot: any
) {
  return async function (dispatch: any) {
    dispatch(asyncActionStart());
    try {
      const snapshot = await listenToEventsFromFirestore(
        predicate,
        limit,
        lastDocSnapshot
      ).get();
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const moreEvents = snapshot.docs.length >= limit;
      const events = snapshot.docs.map((doc) => dataFromSnapshot(doc));
      dispatch({
        type: eventActionsName.FETCH_EVENTS,
        payload: { events, moreEvents },
      });
      dispatch(asyncActionFinish());
      return lastVisible;
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

export function listenToEvents(events: IEvent[]) {
  return {
    type: eventActionsName.FETCH_EVENTS,
    payload: events,
  };
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

export function listenToEventChat(comments: IComment[]): IEventAction {
  return {
    type: eventActionsName.LISTEN_TO_EVENT_CHAT,
    payload: comments,
  };
}
