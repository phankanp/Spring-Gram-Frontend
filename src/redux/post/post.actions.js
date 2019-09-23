import axios from "axios";
import { GET_ERRORS } from "./../error/error.types";
import { postActionTypes } from "./post.types";
import { setAlert } from "../alert/alert.actions";

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
  try {
    const res = await axios.get("http://localhost:8080/api/post/");

    for (const arr of res.data) {
      const postImage = await getImage(arr.id);

      arr.image = postImage;
    }

    dispatch({
      type: postActionTypes.GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: postActionTypes.POST_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
    });
  }
};

async function getImage(imageId) {
  return await axios
    .get(`http://localhost:8080/api/post/${imageId}/image`, {
      responseType: "arraybuffer"
    })
    .then(response => Buffer.from(response.data, "binary").toString("base64"));
}

export const addLike = postId => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:8080/api/post/like/${postId}`
    );

    dispatch({
      type: postActionTypes.UPDATE_LIKES,
      payload: { postId, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: postActionTypes.POST_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
    });
  }
};

export const removeLike = postId => async dispatch => {
  try {
    const res = await axios.delete(
      `http://localhost:8080/api/post/unlike/${postId}`
    );

    dispatch({
      type: postActionTypes.UPDATE_LIKES,
      payload: { postId, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: postActionTypes.POST_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
    });
  }
};
