import {
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POST,
  GET_POST_SUCCESS,
  GET_CATEGORY,
  GET_CATEGORY_SUCCESS,
  GET_AUTHOR_POSTS,
  GET_AUTHOR_POSTS_SUCCESS
} from '../actions/types/types_posts';

const INITIAL_STATE = {
  active_posts: [],
  categories: [],
  active_post: {},
  active_category: {},
  active_author: {}
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case GET_POSTS:
    return { ...state, loading: true };
  case GET_POSTS_SUCCESS: {
    const { active_posts, categories, total_items, total_pages } = action.payload;
    return {
      ...state,
      active_posts,
      categories,
      total_items,
      total_pages,
      loading: false
    };
  }
  case GET_POST:
    return { ...state, active_post: {}, loading: true };
  case GET_POST_SUCCESS:
    return { ...state, active_post: action.payload, loading: false };
  case GET_CATEGORY:
    return { ...state, active_category: {}, active_posts: {}, loading: true };
  case GET_CATEGORY_SUCCESS: {
    const { active_category, active_posts, categories, total_items, total_pages } = action.payload;
    return {
      ...state,
      categories,
      active_category,
      active_posts,
      total_items,
      total_pages,
      loading: false
    };
  }
  case GET_AUTHOR_POSTS:
    return { ...state, active_author: {}, active_posts: {}, loading: true };
  case GET_AUTHOR_POSTS_SUCCESS: {
    const { active_author, active_posts, total_items, total_pages } = action.payload;
    return {
      ...state,
      active_author,
      active_posts,
      total_items,
      total_pages,
      loading: false
    };
  }

  default:
    return state;
  }
}
