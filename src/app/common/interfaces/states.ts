import { IEvent, IPhoto, IComment } from './models';

export interface IRootState {
  event: IEventsState;
  auth: IAuthState;
  async: IAsyncState;
  profile: IProfileState;
}

export interface IEventsState {
  events: IEvent[];
  comments: IComment[];
  moreEvents: boolean;
  selectedEvent: IEvent | null;
}

export interface IAuthState {
  authenticated: boolean;
  currentUser: any;
  prevLocation: any;
  currentLocation: any;
}

export interface IAsyncState {
  isLoading: boolean;
  error: any;
  initialized: boolean;
}

export interface IProfileState {
  currentUserProfile: any;
  selectedProfile: any;
  photos: IPhoto[];
  profileEvents: IEvent[];
  followers: any[];
  followings: any[];
  isFollowingUser: boolean;
  feed: any[];
}
