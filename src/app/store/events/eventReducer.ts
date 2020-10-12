import { IEventsState } from '../../common/interfaces/states';
//import { sampleData } from '../../api/sampleDataWithCoords';
//import { sampleData } from '../../api/sampleData';
import { IEventAction } from '../../common/interfaces/actions';
import { eventActionsName } from '../../common/constants/actionsNames';

const initialState: IEventsState = {
  events: [],
  comments: [],
  moreEvents: false,
  selectedEvent: null,
  lastVisible: null,
  filter: 'all',
  startDate: new Date(),
  retainState: false,
};

export default function eventReducer(
  state = initialState,
  { type, payload }: IEventAction
): IEventsState {
  let res: IEventsState = state;
  switch (type) {
    case eventActionsName.FETCH_EVENTS:
      res = {
        ...state,
        events: [...state.events, ...payload.events],
        moreEvents: payload.moreEvents,
        lastVisible: payload.lastVisible,
      };
      break;
    case eventActionsName.LISTEN_TO_SELECTED_EVENT:
      res = {
        ...state,
        selectedEvent: payload,
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
    case eventActionsName.CLEAR_EVENTS:
      res = {
        ...state,
        events: [],
        moreEvents: true,
        lastVisible: null,
      };
      break;
    case eventActionsName.SET_FILTER:
      res = {
        ...state,
        retainState: false,
        moreEvents: true,
        filter: payload,
      };
      break;
    case eventActionsName.SET_START_DATE:
      res = {
        ...state,
        retainState: false,
        moreEvents: true,
        startDate: payload,
      };
      break;
    case eventActionsName.RETAIN_STATE:
      res = {
        ...state,
        retainState: true,
      };
      break;
    default:
      res = state;
  }

  return res;
}
