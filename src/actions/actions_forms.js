import {
  GET_FORM,
  UPDATE_FORM,
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS
} from './types/types_forms';
import axios from 'axios';

import { API_URL, WP_AUTH } from '../config';

const auth = { Authorization: `Basic ${WP_AUTH}` };

export function getForm(id) {
  return (dispatch) => {
    const wp_forms_url = `${API_URL}/gf/v2/forms/${id}`;
    axios.get(wp_forms_url, {headers: auth})
    .then(({data}) => { dispatch({ type: GET_FORM, payload: data }); })
    .catch(error => console.error(error));
  };
}

export function updateForm(value, id, valid){
  if(Array.isArray(value)){
    value = value.map((val, index) => ({ id: `${id}_${index+1}`, value: val }));
  }
  return({ type: UPDATE_FORM, payload: {value, id, valid} });
}

export function submitForm(id, fields){
  return (dispatch) => {
    dispatch({ type: SUBMIT_FORM });
    const wp_submission_url = `${API_URL}/gf/v2/forms/${id}/submissions`;
    const config = { headers: auth};
    fields.map(field => formBody(config, field));
    axios.post(wp_submission_url, config)
    .then(({data}) => {
      if(data.is_valid){
        dispatch({
          type: SUBMIT_FORM_SUCCESS,
          payload: data.confirmation_message
        });
      }
    })
    .catch(error => console.error("submitForm Error", error));
  };
}

function formBody(config, field){
  if(Array.isArray(field.value)){
    return field.value.map(sub_fields => config[`input_${sub_fields.id}`] = sub_fields.value );
  }
  return config[`input_${field.id}`] = field.value;
}
