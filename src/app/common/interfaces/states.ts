import { IEvent } from './models';

export interface IRootState {
  event: IEventsState;
  modal: IModalState;
  auth: IAuthState;
}

export interface IEventsState {
  events: IEvent[];
}

export interface IModalState {}

export interface IAuthState {
  authenticated: boolean;
  currentUser: any;
}
