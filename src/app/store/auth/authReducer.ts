import { authActionName } from '../../common/constants/actionsNames';
import { IAuthAction } from '../../common/interfaces/actions';
import { IAuthState } from '../../common/interfaces/states';

const initialState: IAuthState = {
  authenticated: true,
  currentUser: {
    email: 'test@test.com',
    photoURL: '/assets/user.png'
  },
};

export default function authReducer(
  state = initialState,
  { type, payload }: IAuthAction
): IAuthState {
  let res: IAuthState;

  switch (type) {
    case authActionName.SIGN_IN_USER:
      debugger;
      res = {
        ...state,
        authenticated: true,
        currentUser: {
          email: payload.email,
          photoURL: '/assets/user.png',
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
