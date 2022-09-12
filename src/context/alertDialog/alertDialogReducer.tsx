import { SET_ALERT_DIALOG, CLOSE_ALERT_DIALOG } from '../types';

export default (state: any, action: any) => {
  switch (action.type) {
    case SET_ALERT_DIALOG:
      return action.payload;
    case CLOSE_ALERT_DIALOG:
      return null;
    default:
      return state;
  }
};
