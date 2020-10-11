import { IEventsState } from '../../common/interfaces/states';
//import { sampleData } from '../../api/sampleDataWithCoords';
//import { sampleData } from '../../api/sampleData';
import { IEventAction } from '../../common/interfaces/actions';
import { eventActionsName } from '../../common/constants/actionsNames';

const initialState: IEventsState = {
  events: [],
  comments: [],
  moreEvents: false,
};

export default function eventReducer(
  state = initialState,
  { type, payload }: IEventAction
): IEventsState {
  let res: IEventsState = state;
  switch (type) {
    case eventActionsName.FETCH_EVENTS:
      console.log(payload.events);
      res = {
        ...state,
        events: [...state.events, ...payload.events],
        moreEvents: payload.events,
      };
      break;
    case eventActionsName.CREATE_EVENT:
      if (payload) {
        res = {
          ...state,
          events: [...state.events, payload],
        };
      }
      break;
    case eventActionsName.UPDATE_EVENT:
      if (payload) {
        res = {
          ...state,
          events: [
            ...state.events.filter((evt) => evt.id !== payload.id),
            payload,
          ],
        };
      }
      break;
    case eventActionsName.DELETE_EVENT:
      if (payload) {
        res = {
          ...state,
          events: [...state.events.filter((evt) => evt.id !== payload.id)],
        };
      }
      break;
    case eventActionsName.LISTEN_TO_EVENT_CHAT:
      res = {
        ...state,
        comments: payload,
      };
      break;
    case eventActionsName.CLEAR_COMMENTS:
      res = {
        ...state,
        comments: [],
      };
      break;
    default:
      res = state;
  }

  return res;
}
