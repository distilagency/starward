import axios from 'axios';
import {
  GET_FORM,
  GET_FORM_SUCCESS,
  GET_FORM_FAILURE,
  UPDATE_FORM,
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_FAILURE
} from './types';

import { ROOT_API } from '../config/app';

export function getForm(id) {
  return (dispatch) => {
    dispatch({type: GET_FORM, key: id});
    const gravityFormAPI = `${ROOT_API}/gravityforms?id=${id}`;
    axios.get(gravityFormAPI)
    .then(({data}) => { dispatch({ type: GET_FORM_SUCCESS, payload: data.data.form, key: id }); })
    .catch(error => dispatch({ type: GET_FORM_FAILURE, payload: error, key: id}));
  };
}

export function updateForm(value, id, valid, formId) {
  if (Array.isArray(value)) {
    value = value.map((val, index) => ({ id: `${id}_${index+1}`, value: val }));
  }
  return ({ type: UPDATE_FORM, payload: {value, id, valid}, key: formId });
}

export function submitForm(id, fields) {
  return (dispatch) => {
    dispatch({ type: SUBMIT_FORM, key: id });
    const gravityFormPostUrl = `${ROOT_API}/gravityforms?id=${id}`;
    axios.post(gravityFormPostUrl, fields)
    .then(({data}) => {
      if (data.success) dispatch({type: SUBMIT_FORM_SUCCESS, key: id });
    })
    .catch(error => dispatch({type: SUBMIT_FORM_FAILURE, key: id}));
  };
}
