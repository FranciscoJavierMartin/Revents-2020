import firebase from '../../api/firebase';

import { authActionName } from '../../common/constants/actionsNames';
import { IAuthAction } from '../../common/interfaces/actions';

export function signInUser(email: string, password: string) {
  return async function (dispatch: any) {
    try {
      const result = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      dispatch({
        type: authActionName.SIGN_IN_USER,
        payload: result.user,
      });
    } catch (error) {
      throw error;
    }
  };
}

export function signOutUser(): IAuthAction {
  return {
    type: authActionName.SIGN_OUT_USER,
  };
}
