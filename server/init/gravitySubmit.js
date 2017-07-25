import axios from 'axios';
import { WP_API } from '../../app/config/app';
import { WP_AUTH } from '../config/app';


/* ----------- Basic auth required for Gravity Forms ----------- */
const auth = { Authorization: `Basic ${WP_AUTH}` };

const formBody = (config, field) => {
  const configData = config;
  if (Array.isArray(field.value)) {
    return field.value.map(subFields => {
      const formData = configData[`input_${subFields.id}`] = subFields.value;
      return formData;
    });
  }
  const formData = configData[`input_${field.id}`] = field.value;
  return formData;
};

export const submitForm = (req, res) => {
  const wpSubmissionUrl = `${WP_API}/gf/v2/forms/${req.query.id}/submissions`;
  const config = { headers: auth};
  req.body
    .filter((field) => { return field !== null; })
    .map(field => formBody(config, field));
  axios.post(wpSubmissionUrl, config)
    .then((response) => {
      if (typeof response.data.confirmation_message !== 'undefined') {
        if (response.data.is_valid) {
          return res.json({success: true, data: response.confirmation_message});
        }
        res.status(500);
        return res.json({success: false, message: 'validation failed', validationMessage: response.data.validation_messages});
      }
      return res.json({success: true, data: response.data});
    })
    .catch(() => {
      res.status(500);
      return res.json({success: false, message: 'Something went wrong'});
    });
};
