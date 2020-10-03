import { modalActionName } from '../../common/constants/actionsNames';

export function openModal(payload: any) {
  return {
    type: modalActionName.OPEN_MODAL,
    payload,
  };
}

export function closeModal(payload?: any) {
  return {
    type: modalActionName.CLOSE_MODAL,
    payload,
  };
}