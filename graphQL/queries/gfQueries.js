import axios from 'axios';
import { WP_URL, GRAVITY_PUBLIC } from '../../server/config/app';
import { calculateSignature, calcurateUnixExpiry } from '../util/gravityForms';

const gfQueries = {
  /* ----------- Fetch data for Schema ----------- */
  // Form items being mapped to schema keys from Gravity Forms API
  // response triggered in the below Query object
  Form: {
    confirmation(form) {
      const firstKey = Object.keys(form.confirmations)[0];
      return form.confirmations[firstKey].message;
    },
    button(form) {
      return form.button.text;
    }
  },
  Field: {
    prePopulated(field) {
      return field.allowsPrepopulate;
    },
    prePopulatedParam(field) {
      return field.inputName;
    }
  },
  Query: {
    form(id, args) {
      const { id: formId } = args;
      const route = `forms/${formId}`;
      const unixExpiry = calcurateUnixExpiry(new Date());
      const signature = calculateSignature(unixExpiry, 'GET', route);
      const url = `${WP_URL}/gravityformsapi/${route}?api_key=${GRAVITY_PUBLIC}&signature=${signature}&expires=${unixExpiry}`;
      return axios.get(url)
      .then((res) => {
        const { data } = res;
        if (data.status !== 200) {
          throw new Error(`GF Error: status: ${data.status}`);
        }
        return data.response;
      })
      .catch(error => console.log('GF Error', error));
    }
  }
};

export default gfQueries;
