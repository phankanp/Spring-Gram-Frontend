import axios from "axios";
import { profileActionTypes } from "./profile.types";
import { loadUser } from "../auth/auth.actions";

export const getProfile = userAlias => async dispatch => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/profile/user/${userAlias}`
    );

    for (const arr of res.data.following) {
      const userProfileImage = await getUserProfileImage(arr.userAlias);

      arr.userProfileImage = userProfileImage;
    }

    const userProfileImage = await getUserProfileImage(userAlias);

    res.data.userProfileImage = userProfileImage;

    for (const arr of res.data.posts) {
      const postImage = await getImage(arr.id);
      const userProfileImage = await getUserProfileImage(userAlias);

      arr.image = postImage;
      arr.userProfileImage = userProfileImage
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

    const userProfileImage = await getUserProfileImage(res.data.userAlias);

    res.data.userProfileImage = userProfileImage;

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
  try {
    const res = await axios.delete(
      `http://localhost:8080/api/profile/unfollow/${userId}`
    );

    const userProfileImage = await getUserProfileImage(res.data.userAlias);

    res.data.userProfileImage = userProfileImage;

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

export const editProfile = (profile, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(
      "http://localhost:8080/api/profile/",
      profile,
      config
    );

    console.log(res.data);

    dispatch({
      type: profileActionTypes.EDIT_PROFILE,
      payload: res.data
    });
    dispatch(loadUser());
    history.push("/");
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

async function getUserProfileImage(userAlias) {
  return await axios
    .get(`http://localhost:8080/api/profile/${userAlias}/image`, {
      responseType: "arraybuffer"
    })
    .then(response => Buffer.from(response.data, "binary").toString("base64"));
}
