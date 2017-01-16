import {
  GET_PAGE,
  GET_PAGE_SUCCESS
} from '../actions/types/types_pages';

const INITIAL_STATE = {
  active_page: {},
  loading: false
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case GET_PAGE:
    return { ...state, ...INITIAL_STATE, loading: true };
  case GET_PAGE_SUCCESS:
    return { ...state, active_page: action.payload, loading: false };
  default:
    return state;
  }
}
