import { profileActionName } from '../../common/constants/actionsNames';

export function listenToCurrentUserProfile(profile: any) {
  return {
    type: profileActionName.LISTEN_TO_CURRENT_USER_PROFILE,
    payload: profile,
  };
}

export function listenToSelectedUserProfile(profile: any) {
  return {
    type: profileActionName.LISTEN_TO_SELECTED_USER_PROFILE,
    payload: profile,
  };
}
