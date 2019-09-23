import { postActionTypes } from "./post.types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case postActionTypes.GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case postActionTypes.POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case postActionTypes.UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };

    default:
      return state;
  }
};

export default postReducer;
