import axios from 'axios';
import { GRAVITY_PUBLIC, WP_URL } from '../config/app';
import { calculateSignature, calcurateUnixExpiry } from '../../graphQL/util/gravityForms';

const formBody = (config, field) => {
  const configData = config;
  if (Array.isArray(field.value)) {
    return field.value.map((subFields) => {
      const formData = configData[`input_${subFields.id}`] = subFields.value;
      return formData;
    });
  }
  const formData = configData[`input_${field.id}`] = field.value;
  return formData;
};

export const submitForm = (req, res) => {
  const { id } = req.query;
  const route = `forms/${id}/submissions`;
  const unixExpiry = calcurateUnixExpiry(new Date());
  const signature = calculateSignature(unixExpiry, 'GET', route);
  const url = `${WP_URL}/gravityformsapi/${route}?api_key=${GRAVITY_PUBLIC}&signature=${signature}&expires=${unixExpiry}`;
  const body = { };
  req.body
  .filter((field) => { return field !== null; })
  .map(field => formBody(body, field));
  axios.post(url, {input_values: body})
  .then((serverRes) => {
    const { data } = serverRes;
    const { response: responseData } = data;
    const response = {
      data: responseData,
      confirmation_message: responseData.confirmation_message,
    };
    if (typeof response.data.confirmation_message !== 'undefined') {
      if (response.data.is_valid) {
        return res.json({success: true, data: response.confirmation_message});
      }
      res.status(500);
      return res.json({success: false, message: 'validation failed', validationMessage: response.data.validation_messages});
    }
    return res.json({success: true, data: response.data});
  })
  .catch((error) => {
    console.error('Error submitting Gravity Form', error);
    return res.status(500).json({success: false, error, message: 'Something went wrong'});
  });
};
