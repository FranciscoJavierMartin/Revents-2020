import firebase from '../../api/firebase';
import {
  dataFromSnapshot,
  getUserProfile,
} from '../../api/firestore/firestoreService';
import {
  asyncActionName,
  authActionName,
} from '../../common/constants/actionsNames';
import { IAuthAction } from '../../common/interfaces/actions';
import { listenToCurrentUserProfile } from '../profile/profileActions';

export function signInUser(user: any) {
  return {
    type: authActionName.SIGN_IN_USER,
    payload: user,
  };
}

export function verifyAuth() {
  return function (dispatch: any) {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(signInUser(user));
        const profileRef = getUserProfile(user.uid);
        profileRef.onSnapshot((snapshot) => {
          dispatch(listenToCurrentUserProfile(dataFromSnapshot(snapshot)));
          dispatch({ type: asyncActionName.APP_LOADED });
        });
      } else {
        dispatch(signOutUser());
        dispatch({ type: asyncActionName.APP_LOADED });
      }
    });
  };
}

export function signOutUser(): IAuthAction {
  return {
    type: authActionName.SIGN_OUT_USER,
  };
}
