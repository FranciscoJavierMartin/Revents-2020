import { IEventsState } from '../interfaces/states';
import { sampleData } from '../api/sampleData';
import { IAction } from '../interfaces/actions';
import { actions } from '../constants/actionsNames';

const initialState: IEventsState = {
  events: sampleData,
};

export default function eventReducer(
  state = initialState,
  { type, payload }: IAction
): IEventsState {
  let res: IEventsState;
  switch (type) {
    case actions.CREATE_EVENT:
      res = {
        ...state,
        events: [...state.events, payload],
      };
      break;
    case actions.UPDATE_EVENT:
      res = {
        ...state,
        events: [
          ...state.events.filter((evt) => evt.id !== payload.id),
          payload,
        ],
      };
      break;
    case actions.DELETE_EVENT:
      res = {
        ...state,
        events: [...state.events.filter((evt) => evt.id !== payload.id)],
      };
      break;
    default:
      res = state;
  }

  return res;
}
