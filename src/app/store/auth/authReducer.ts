import { authActionName } from '../../common/constants/actionsNames';
import { IAuthAction } from '../../common/interfaces/actions';
import { IAuthState } from '../../common/interfaces/states';

const initialState: IAuthState = {
  authenticated: false,
  currentUser: {
    email: '',
    photoURL: null,
  },
};

export default function authReducer(
  state = initialState,
  { type, payload }: IAuthAction
): IAuthState {
  let res: IAuthState;

  switch (type) {
    case authActionName.SIGN_IN_USER:
      res = {
        ...state,
        authenticated: true,
        currentUser: {
          email: payload?.email,
          displayName: payload.displayName,
          photoURL: payload.photoURL || '/assets/user.png',
          uid: payload.uid,
          providerId:
            (payload.prodiverData && payload.prodiverData[0].providerId) ||
            'password',
        },
      };
      break;
    case authActionName.SIGN_OUT_USER:
      res = {
        ...state,
        authenticated: false,
        currentUser: null,
      };
      break;
    default:
      res = state;
  }

  return res;
}
