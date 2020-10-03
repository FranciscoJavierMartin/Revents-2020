import firebase from '../../api/firebase';

import { authActionName } from '../../common/constants/actionsNames';
import { IAuthAction } from '../../common/interfaces/actions';

export function signInUser(user: any) {
  return {
    type: authActionName.SIGN_IN_USER,
    payload: user
  }
}

export function verifyAuth() {
  return function (dispatch: any) {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(signInUser(user));
      } else {
        dispatch(signOutUser());
      }
    });
  };
}

export function signOutUser(): IAuthAction {
  return {
    type: authActionName.SIGN_OUT_USER,
  };
}
