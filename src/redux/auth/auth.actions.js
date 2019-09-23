import axios from "axios";
import { authActionTypes } from "./auth.types";
import { setAlert } from "../alert/alert.actions";
import setAuthToken from "../../utils/setAuthToken";

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("http://localhost:8080/api/users/user");

    dispatch({
      type: authActionTypes.USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: authActionTypes.AUTH_ERROR
    });
  }
};

export const register = ({
  username,
  alias,
  fullName,
  password,
  confirmPassword
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    username,
    alias,
    fullName,
    password,
    confirmPassword
  });

  try {
    const res = await axios.post(
      "http://localhost:8080/api/users/register",
      body,
      config
    );

    dispatch({
      type: authActionTypes.REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = [];

    for (var key in err.response.data) {
      console.log(err.response.data[key]);
      errors.push(err.response.data[key]);
    }

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, "danger")));
    }

    dispatch({
      type: authActionTypes.REGISTER_FAIL
    });
  }
};

export const login = (username, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    username,
    password
  });

  try {
    const res = await axios.post(
      "http://localhost:8080/api/users/login",
      body,
      config
    );

    dispatch({
      type: authActionTypes.LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = [];

    for (var key in err.response.data) {
      errors.push(err.response.data[key]);
    }

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, "danger")));
    }

    dispatch({
      type: authActionTypes.LOGIN_FAIL
    });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: authActionTypes.LOGOUT });
};
