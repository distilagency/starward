import {
  GET_FORM,
  GET_FORM_SUCCESS,
  GET_FORM_FAILURE,
  UPDATE_FORM,
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS
} from '../actions/types/';

const INITIAL_STATE = {};

const isValid = (fields) => {
  if (fields.length > 0) return Object.keys(fields).every(key => fields[key].valid);
  return false;
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_FORM:
    return {
      ...state,
      [action.key]: {
        loading: true,
        confirmation: null
      }
    };
  case GET_FORM_SUCCESS:
    return {
      ...state,
      [action.key]: {
        activeForm: action.payload,
        submitSuccess: false,
        loading: false,
        formValues: []
      }
    };
  case GET_FORM_FAILURE:
    return {
      ...state,
      [action.key]: {
        loading: false,
        submitSuccess: false,
        formValues: []
      }
    };
  case UPDATE_FORM: {
    const items = state[action.key] ? state[action.key].formValues : [];
    items[action.payload.id] = action.payload;
    return {
      ...state,
      [action.key]: {
        ...state[action.key],
        formValues: items,
        isValid: isValid(items)
      }
    };
  }
  case SUBMIT_FORM:
    return {
      ...state,
      [action.key]: {
        ...state[action.key],
        submitSuccess: false,
        submitting: true,
        formValues: []
      }
    };
  case SUBMIT_FORM_SUCCESS:
    return {
      ...state,
      [action.key]: {
        ...state[action.key],
        submitSuccess: true,
        submitting: false
      }
    };
  default:
    return state;
  }
}
