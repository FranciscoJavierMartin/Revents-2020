export enum eventActionsName {
  FETCH_EVENTS = 'FETCH_EVENTS',
  CREATE_EVENT = 'CREATE_EVENT',
  UPDATE_EVENT = 'UPDATE_EVENT',
  DELETE_EVENT = 'DELETE_EVENT',
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
}
