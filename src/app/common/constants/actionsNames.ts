export enum eventActionsName {
  FETCH_EVENTS = 'FETCH_EVENTS',
  CREATE_EVENT = 'CREATE_EVENT',
  UPDATE_EVENT = 'UPDATE_EVENT',
  DELETE_EVENT = 'DELETE_EVENT',
  LISTEN_TO_EVENT_CHAT = 'LISTEN_TO_EVENT_CHAT',
  CLEAR_COMMENTS = 'CLEAR_COMMENTS',
  LISTEN_TO_SELECTED_EVENT = 'LISTEN_TO_SELECTED_EVENT',
  CLEAR_EVENTS = 'CLEAR_EVENTS',
}

export enum authActionName {
  SIGN_IN_USER = 'SIGN_IN_USER,',
  SIGN_OUT_USER = 'SIGN_OUT_USER',
}

export enum asyncActionName {
  START = 'START',
  FINISH = 'FINISH',
  ERROR = 'ERROR',
  APP_LOADED = 'APP_LOADED',
}

export enum profileActionName {
  LISTEN_TO_CURRENT_USER_PROFILE = 'LISTEN_TO_CURRENT_USER_PROFILE',
  LISTEN_TO_SELECTED_USER_PROFILE = 'LISTEN_TO_SELECTED_USER_PROFILE',
  LISTEN_TO_USER_PHOTOS = 'LISTEN_TO_USER_PHOTOS',
  LISTEN_TO_USER_EVENTS = 'LISTEN_TO_USER_EVENTS',
  LISTEN_TO_FOLLOWERS = 'LISTEN_TO_FOLLOWERS',
  LISTEN_TO_FOLLOWING = 'LISTEN_TO_FOLLOWING',
  SET_FOLLOW_USER = 'SET_FOLLOW_USER',
  SET_UNFOLLOW_USER = 'SET_UNFOLLOW_USER',
  CLEAR_FOLLOWINGS = 'CLEAR_FOLLOWINGS',
  LISTEN_TO_FEED = 'LISTEN_TO_FEED',
}
