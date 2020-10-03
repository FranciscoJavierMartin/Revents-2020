import { IEvent } from './models';

export interface IRootState {
  event: IEventsState;
  modal: IModalState;
  auth: IAuthState;
  async: IAsyncState;
}

export interface IEventsState {
  events: IEvent[];
}

export interface IModalState {
  modalType: string;
}

export interface IAuthState {
  authenticated: boolean;
  currentUser: any;
}

export interface IAsyncState {
  isLoading: boolean;
  error: any;
}
