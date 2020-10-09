import { profileActionName } from '../../common/constants/actionsNames';
import { IProfileAction } from '../../common/interfaces/actions';
import { IEvent, IPhoto } from '../../common/interfaces/models';

export function listenToCurrentUserProfile(profile: any): IProfileAction {
  return {
    type: profileActionName.LISTEN_TO_CURRENT_USER_PROFILE,
    payload: profile,
  };
}

export function listenToSelectedUserProfile(profile: any): IProfileAction {
  return {
    type: profileActionName.LISTEN_TO_SELECTED_USER_PROFILE,
    payload: profile,
  };
}

export function listenToUserPhotos(photos: IPhoto[]): IProfileAction {
  return {
    type: profileActionName.LISTEN_TO_USER_PHOTOS,
    payload: photos,
  };
}

export function listenToUserEvents(events: IEvent[]): IProfileAction {
  return {
    type: profileActionName.LISTEN_TO_USER_EVENTS,
    payload: events,
  };
}
