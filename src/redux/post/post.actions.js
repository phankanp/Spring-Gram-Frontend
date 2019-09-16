import axios from "axios";
import { GET_ERRORS } from "./../error/error.types";
import { postActionTypes } from "./post.types";

export const createPost = (post, history) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8080/api/post/", post);

    history.push("/homepage");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getPosts = () => async dispatch => {
  const res = await axios.get("http://localhost:8080/api/post/all");

  dispatch({
    type: postActionTypes.GET_POSTS,
    payload: res.data
  });
};
