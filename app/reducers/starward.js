import {
  REQUEST_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  page: {},
  settings: {},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_SUCCESS:
    return { ...state, ...action.payload };
  default:
    return state;
  }
}
