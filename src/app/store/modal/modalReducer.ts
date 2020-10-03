import { modalActionName } from '../../common/constants/actionsNames';
import { IModalAction } from '../../common/interfaces/actions';
import { IModalState } from '../../common/interfaces/states';

const initialState: IModalState | null = null;

export default function modalReducer(
  state = initialState,
  { type, payload }: IModalAction
): IModalState | null {
  let res: IModalState | null;

  switch (type) {
    case modalActionName.OPEN_MODAL:
      if (payload) {
        const { modalType } = payload;
        res = { modalType };
      } else {
        res = null;
      }
      break;
    case modalActionName.CLOSE_MODAL:
      res = null;
      break;
    default:
      res = state;
  }

  return res;
}
