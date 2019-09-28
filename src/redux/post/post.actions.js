import axios from "axios";
import { postActionTypes } from "./post.types";
import { setAlert } from "../alert/alert.actions";

export const createPost = (postData, history) => async dispatch => {
  console.log(postData);
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(
      "http://localhost:8080/api/post/",
      postData,
      config
    );

    const postImage = await getImage(res.data.id);

    res.data.image = postImage;

    dispatch({
      type: postActionTypes.CREATE_POST,
      payload: res.data
    });

    history.push("/homepage");
  } catch (err) {
    const errors = [];

    for (var key in err.response.data) {
      errors.push(err.response.data[key]);
    }

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, "danger")));
    }
    dispatch({
      type: postActionTypes.POST_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
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

export const deletePost = postId => async dispatch => {
  try {
    const res = await axios.delete(`http://localhost:8080/api/post/${postId}`);

    dispatch({
      type: postActionTypes.DELETE_POST,
      payload: postId
    });

    dispatch(setAlert("Post Removed", "success"));
  } catch (err) {
    dispatch({
      type: postActionTypes.POST_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
    });
  }
};

export const addComment = (postId, commentData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(
      `http://localhost:8080/api/post/comment/${postId}`,
      commentData,
      config
    );

    dispatch({
      type: postActionTypes.ADD_COMMENT,
      payload: { comments: res.data, postId }
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: postActionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(
      `http://localhost:8080/api/post/comment/${postId}/${commentId}`
    );

    dispatch({
      type: postActionTypes.REMOVE_COMMENT,
      payload: { postId, commentId }
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: postActionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
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
