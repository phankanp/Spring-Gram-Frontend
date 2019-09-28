import { combineReducers } from "redux";

import errorReducer from "../error/error.reducer";
import postReducer from "../post/post.reducer";
import alertReducer from "../alert/alert.reducer";
import authReducer from "../auth/auth.reducer";
import profileReducer from "../profile/profile.reducer";

const rootReducer = combineReducers({
  errors: errorReducer,
  post: postReducer,
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer
});

export default rootReducer;
