import axios from 'axios';
import {
  GET_FORM,
  GET_FORM_SUCCESS,
  GET_FORM_FAILURE,
  UPDATE_FORM,
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS
} from './types';

import { WP_API, WP_AUTH, ROOT_API } from '../../config/app';

const auth = { Authorization: `Basic ${WP_AUTH}` };

function formBody(config, field) {
  const configData = config;
  if (Array.isArray(field.value)) {
    return field.value.map(subFields => {
      const formData = configData[`input_${subFields.id}`] = subFields.value;
      return formData;
    });
  }
  const formData = configData[`input_${field.id}`] = field.value;
  return formData;
}

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
    dispatch({ type: SUBMIT_FORM });
    const wpSubmissionUrl = `${WP_API}/gf/v2/forms/${id}/submissions`;
    const config = { headers: auth};
    fields.map(field => formBody(config, field));
    axios.post(wpSubmissionUrl, config)
    .then(({data}) => {
      if (data.is_valid) dispatch({type: SUBMIT_FORM_SUCCESS, key: id });
    })
    .catch(error => console.error('submitForm Error', error));
  };
}
