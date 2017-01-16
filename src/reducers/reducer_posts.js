import {
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POST,
  GET_POST_SUCCESS,
  GET_CATEGORY,
  GET_CATEGORY_SUCCESS
} from '../actions/types/types_posts';

const INITIAL_STATE = {
  active_posts: [],
  categories: [],
  active_post: {},
  active_category: {}
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case GET_POSTS:
    return { ...state, loading: true };
  case GET_POSTS_SUCCESS:
    return {
      ...state,
      active_posts: action.payload.posts,
      categories: action.payload.categories,
      loading: false
    };
  case GET_POST:
    return { ...state, active_post: {}, loading: true };
  case GET_POST_SUCCESS:
    return { ...state, active_post: action.payload, loading: false };
  case GET_CATEGORY:
    return { ...state, active_category: {}, active_posts: {}, loading: true };
  case GET_CATEGORY_SUCCESS:
    return {
      ...state,
      active_category: action.payload.category,
      active_posts: action.payload.posts,
      categories: action.payload.categories,
      loading: false
    };
  default:
    return state;
  }
}
