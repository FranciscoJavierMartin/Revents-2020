import { IEvent } from './models';

export interface IRootState {
  event: IEventsState;
}

export interface IEventsState {
  events: IEvent[];
}
