import uuid from "uuid";
import { alertActionTypes } from "./alert.types";

export const setAlert = (message, alertType, timeout = 5000) => dispatch => {
  const id = uuid.v4();

  dispatch({
    type: alertActionTypes.SET_ALERT,
    payload: { message, alertType, id }
  });

  setTimeout(
    () => dispatch({ type: alertActionTypes.REMOVE_ALERT, payload: id }),
    timeout
  );
};
