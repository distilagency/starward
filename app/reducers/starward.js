import {
  RESET_404,
  REQUEST_SUCCESS,
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
    return { ...state, ...action.payload };
  default:
    return state;
  }
}
