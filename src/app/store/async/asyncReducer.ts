import { IAsyncState } from '../../common/interfaces/states';
import { asyncActionName } from './../../common/constants/actionsNames';

const initialState: IAsyncState = {
  isLoading: false,
  error: null,
  initialized: false,
};

export default function asyncReducer(
  state = initialState,
  { type, payload }: any
): IAsyncState {
  let res: IAsyncState;

  switch (type) {
    case asyncActionName.START:
      res = {
        ...state,
        isLoading: true,
        error: null,
      };
      break;
    case asyncActionName.FINISH:
      res = {
        ...state,
        isLoading: false,
      };
      break;
    case asyncActionName.ERROR:
      res = {
        ...state,
        isLoading: false,
        error: payload,
      };
      break;
    case asyncActionName.APP_LOADED:
      res = {
        ...state,
        initialized: true,
      };
      break;
    default:
      res = state;
  }

  return res;
}
