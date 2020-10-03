import { IEventsState } from '../../common/interfaces/states';
//import { sampleData } from '../../api/sampleDataWithCoords';
//import { sampleData } from '../../api/sampleData';
import { IEventAction } from '../../common/interfaces/actions';
import { eventActionsName } from '../../common/constants/actionsNames';

const initialState: IEventsState = {
  events: [],
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
        events: payload,
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
    default:
      res = state;
  }

  return res;
}
