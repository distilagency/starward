import {
  RESET_404,
  REQUEST_SUCCESS,
  UPDATE_STARWARD_STATE,
  UPDATE_STARWARD_STATE_SUCCESS,
  UPDATE_STARWARD_STATE_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
  settings: {},
  page: {},
  posts: {},
  search: {},
  handle404: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case RESET_404:
    return { ...state, handle404: false };
  case REQUEST_SUCCESS:
    return { ...state, ...action.data };
  case UPDATE_STARWARD_STATE:
    return { ...state, starwardUpdating: true };
  case UPDATE_STARWARD_STATE_SUCCESS:
    return { ...state, starwardUpdating: false, [action.state]: action.payload };
  case UPDATE_STARWARD_STATE_FAILURE:
    return { ...state, starwardUpdating: false };
  default:
    return state;
  }
}
