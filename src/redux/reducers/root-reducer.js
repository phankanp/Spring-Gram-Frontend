import { combineReducers } from "redux";

import errorReducer from "../error/error.reducer";
import postReducer from "../post/post.reducer";
import alertReducer from "../alert/alert.reducer";
import authReducer from "../auth/auth.reducer";

const rootReducer = combineReducers({
  errors: errorReducer,
  post: postReducer,
  alert: alertReducer,
  auth: authReducer
});

export default rootReducer;
