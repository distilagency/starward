import axios from 'axios';
import {
  GET_FORM,
  UPDATE_FORM,
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS
} from './types';

import { WP_API, WP_AUTH, ROOT_API } from '../../config/app';

const auth = { Authorization: `Basic ${WP_AUTH}` };

function formBody(config, field) {
  if (Array.isArray(field.value)) {
    return field.value.map(subFields => config[`input_${subFields.id}`] = subFields.value);
  }
  return config[`input_${field.id}`] = field.value;
}

export function getForm(id) {
  return (dispatch) => {
    const gravityFormAPI = `${ROOT_API}/gravityforms?id=${id}`;
    axios.get(gravityFormAPI)
    .then(({data}) => { dispatch({ type: GET_FORM, payload: data.data.form }); })
    .catch(error => console.error(error));
  };
}

export function updateForm(value, id, valid) {
  if (Array.isArray(value)) {
    value = value.map((val, index) => ({ id: `${id}_${index+1}`, value: val }));
  }
  return ({ type: UPDATE_FORM, payload: {value, id, valid} });
}

export function submitForm(id, fields) {
  return (dispatch) => {
    dispatch({ type: SUBMIT_FORM });
    const wpSubmissionUrl = `${WP_API}/gf/v2/forms/${id}/submissions`;
    const config = { headers: auth};
    fields.map(field => formBody(config, field));
    axios.post(wpSubmissionUrl, config)
    .then(({data}) => {
      if (data.is_valid) dispatch({type: SUBMIT_FORM_SUCCESS });
    })
    .catch(error => console.error('submitForm Error', error));
  };
}
