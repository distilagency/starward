import axios from 'axios';
import { WP_API, WP_AUTH } from '../../server/config/app';

/* ----------- Basic auth required for Gravity Forms ----------- */
const auth = { Authorization: `Basic ${WP_AUTH}` };

/* ----------- WP REST API v2 endpoints ----------- */
const gravityFormApi = `${WP_API}/gf/v2/forms`;

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
      const formApiURL = `${gravityFormApi}/${args.id}`;
      return axios.get(formApiURL, {headers: auth})
      .then((res) => {
        return res.data;
      })
      .catch(error => console.log('GF Error', error));
    }
  }
};

export default gfQueries;
