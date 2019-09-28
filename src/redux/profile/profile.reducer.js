import { profileActionTypes } from "./profile.types";

const initialState = {
  userProfile: null,
  loading: true,
  error: {}
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case profileActionTypes.GET_PROFILE:
    case profileActionTypes.ADD_FOLLOW:
    case profileActionTypes.REMOVE_FOLLOW:
      return {
        ...state,
        userProfile: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default profileReducer;
