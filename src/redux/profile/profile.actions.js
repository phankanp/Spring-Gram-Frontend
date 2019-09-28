import axios from "axios";
import { profileActionTypes } from "./profile.types";

export const getProfile = userAlias => async dispatch => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/profile/user/${userAlias}`
    );

    for (const arr of res.data.posts) {
      const postImage = await getImage(arr.id);

      arr.image = postImage;
    }

    dispatch({
      type: profileActionTypes.GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: profileActionTypes.POST_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
    });
  }
};

export const addFollow = userId => async dispatch => {
  try {
    const res = await axios.post(
      `http://localhost:8080/api/profile/follow/${userId}`
    );

    dispatch({
      type: profileActionTypes.ADD_FOLLOW,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: profileActionTypes.POST_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
    });
  }
};

export const removeFollow = userId => async dispatch => {
  console.log("test");
  try {
    const res = await axios.delete(
      `http://localhost:8080/api/profile/unfollow/${userId}`
    );

    console.log(res);

    dispatch({
      type: profileActionTypes.REMOVE_FOLLOW,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: profileActionTypes.POST_ERROR,
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
