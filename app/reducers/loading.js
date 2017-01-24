import {
  CREATE_REQUEST,
  REQUEST_SUCCESS,
  REQUEST_FAILURE
} from '../actions/types';

const INITIAL_STATE = false;

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case CREATE_REQUEST:
    return true;
  case REQUEST_SUCCESS:
  case REQUEST_FAILURE:
    return false;
  default:
    return state;
  }
}
