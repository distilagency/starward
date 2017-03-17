import {
  GET_FORM,
  UPDATE_FORM,
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS
} from '../actions/types/';

const INITIAL_STATE = {
  activeForm: {},
  formValues: [],
  submitSuccess: false,
  confirmation: null
};

const isValid = (fields) => {
  if (fields.length > 0) return Object.keys(fields).every(key => fields[key].valid);
  return false;
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_FORM:
    return {
      ...state,
      activeForm: action.payload,
      confirmation: null,
      submitSuccess: false
    };
  case UPDATE_FORM: {
    const items = state.formValues;
    items[action.payload.id] = action.payload;
    return { ...state, formValues: items, isValid: isValid(items) };
  }
  case SUBMIT_FORM:
    return { ...state, confirmation: null, submitSuccess: false, loading: true };
  case SUBMIT_FORM_SUCCESS:
    return { ...state, submitSuccess: true, loading: false };
  default:
    return state;
  }
}
