import {
  GET_MENU,
  GET_SETTINGS
} from '../actions/types/types_wp';

const INITIAL_STATE = {
  navigation: [],
  settings: []
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case GET_MENU:
    return { ...state, navigation: action.payload };
  case GET_SETTINGS:
    return { ...state, settings: action.payload };
  default:
    return state;
  }
}
