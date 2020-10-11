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

export function listenToFollowers(followers: any): IProfileAction {
  return {
    type: profileActionName.LISTEN_TO_FOLLOWERS,
    payload: followers,
  };
}

export function listenToFollowings(followings: any): IProfileAction {
  return {
    type: profileActionName.LISTEN_TO_FOLLOWING,
    payload: followings,
  };
}

export function setFollowUser(): IProfileAction {
  return {
    type: profileActionName.SET_FOLLOW_USER,
  };
}

export function setUnfollowUser(): IProfileAction {
  return {
    type: profileActionName.SET_UNFOLLOW_USER,
  };
}

export function listenToFeed(feed: any[]): IProfileAction {
  return {
    type: profileActionName.LISTEN_TO_FEED,
    payload: feed,
  };
}
