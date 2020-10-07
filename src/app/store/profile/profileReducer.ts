import { profileActionName } from '../../common/constants/actionsNames';
import { IProfileAction } from '../../common/interfaces/actions';
import { IProfileState } from '../../common/interfaces/states';

const initialState: IProfileState = {
  currentUserProfile: null,
  selectedProfile: null,
  photos: [],
};

export default function profileReducer(
  state = initialState,
  { type, payload }: IProfileAction
): IProfileState {
  let res: IProfileState;

  switch (type) {
    case profileActionName.LISTEN_TO_CURRENT_USER_PROFILE:
      res = {
        ...state,
        currentUserProfile: payload,
      };
      break;
    case profileActionName.LISTEN_TO_SELECTED_USER_PROFILE:
      res = {
        ...state,
        selectedProfile: payload,
      };
      break;
    case profileActionName.LISTEN_TO_USER_PHOTOS:
      res = {
        ...state,
        photos: payload,
      }
      break;
    default:
      res = state;
  }

  return res;
}
