import axios from 'axios';
import { ROOT_API, POSTS_PER_PAGE } from '../config/app';

import {
  UPDATE_STARWARD_STATE,
  UPDATE_STARWARD_STATE_SUCCESS,
  UPDATE_STARWARD_STATE_FAILURE
} from './types';

export const fetchMorePosts = posts => (dispatch) => {
  dispatch({type: UPDATE_STARWARD_STATE});
  const { items, totalItems } = posts;
  if (items.length < totalItems) {
    const originalLength = items.length;
    const newLength = originalLength + POSTS_PER_PAGE;
    const requestUrl = `${ROOT_API}/posts?page=1&perPage=${newLength}`;
    axios.get(requestUrl)
    .then(({data}) => { dispatch({ type: UPDATE_STARWARD_STATE_SUCCESS, state: 'posts', payload: data.data.posts }); })
    .catch(error => dispatch({ type: UPDATE_STARWARD_STATE_FAILURE, payload: error}));
  }
};
