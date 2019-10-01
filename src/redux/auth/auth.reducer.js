import { authActionTypes } from "./auth.types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case authActionTypes.REGISTER_SUCCESS:
    case authActionTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case authActionTypes.REGISTER_FAIL:
    case authActionTypes.AUTH_ERROR:
    case authActionTypes.LOGIN_FAIL:
    case authActionTypes.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    case authActionTypes.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    default:
      return state;
  }
};

export default authReducer;
