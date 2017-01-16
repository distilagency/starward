import {
  GET_FORM,
  UPDATE_FORM,
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS
} from '../actions/types/types_forms';

const INITIAL_STATE = {
  active_form: {},
  form_values: [],
  submitSuccess: false,
  confirmation: null
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case GET_FORM:
    return { ...state, active_form: action.payload, confirmation: null, submitSuccess: false, form_values: [] };
  case UPDATE_FORM: {
    let items = state.form_values;
    items[action.payload.id] = action.payload;
    return { ...state, form_values: items };
  }
  case SUBMIT_FORM:
    return { ...state, confirmation: null, submitSuccess: false, loading: true };
  case SUBMIT_FORM_SUCCESS:
    return { ...state, confirmation: action.payload, submitSuccess: true, loading: false };
  default:
    return state;
  }
}
