import { authActionName } from '../../common/constants/actionsNames';
import { IAuthAction } from '../../common/interfaces/actions';

export function signInUser(payload: any): IAuthAction {
  return {
    type: authActionName.SIGN_IN_USER,
    payload,
  };
}

export function signOutUser(): IAuthAction {
  return {
    type: authActionName.SIGN_OUT_USER,
  };
}
