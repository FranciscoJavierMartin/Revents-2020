import { profileActionName } from '../../common/constants/actionsNames';
import { IProfileAction } from '../../common/interfaces/actions';
import { IProfileState } from '../../common/interfaces/states';

const initialState: IProfileState = {
  currentUserProfile: null,
  selectedProfile: null,
  photos: [],
  profileEvents: [],
  followers: [],
  followings: [],
  isFollowingUser: false,
  feed: [],
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
      };
      break;
    case profileActionName.LISTEN_TO_USER_EVENTS:
      res = {
        ...state,
        profileEvents: payload,
      };
      break;
    case profileActionName.LISTEN_TO_FOLLOWERS:
      res = {
        ...state,
        followers: payload,
      };
      break;
    case profileActionName.LISTEN_TO_FOLLOWING:
      res = {
        ...state,
        followings: payload,
      };
      break;
    case profileActionName.SET_FOLLOW_USER:
      res = {
        ...state,
        isFollowingUser: true,
      };
      break;
    case profileActionName.SET_UNFOLLOW_USER:
      res = {
        ...state,
        isFollowingUser: false,
      };
      break;
    case profileActionName.CLEAR_FOLLOWINGS:
      res = {
        ...state,
        followers: [],
        followings: [],
      };
      break;
    case profileActionName.LISTEN_TO_FEED:
      res = {
        ...state,
        feed: payload
      };
      break;
    case profileActionName.CLEAR_SELECTED_USER:
      res = {
        ...state,
        selectedProfile: null,
      };
      break;
    default:
      res = state;
  }

  return res;
}
