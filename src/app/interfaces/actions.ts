import { actions } from '../constants/actionsNames';

export interface IAction {
  type: actions;
  payload?: any;
}
