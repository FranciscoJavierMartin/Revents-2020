import { asyncActionName } from '../../common/constants/actionsNames';
import { IAsyncAction } from '../../common/interfaces/actions';

export function asyncActionStart(): IAsyncAction {
  return {
    type: asyncActionName.START,
  };
}

export function asyncActionFinish(): IAsyncAction {
  return {
    type: asyncActionName.FINISH,
  };
}

export function asyncActionError(error: any): IAsyncAction {
  return {
    type: asyncActionName.ERROR,
    payload: error,
  };
}
