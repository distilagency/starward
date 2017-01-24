import graphqlSchema from 'graphql_json';
import axios from 'axios';
import { WP_API, WP_AUTH } from '../../config/app';

const auth = { Authorization: `Basic ${WP_AUTH}` };

/* ----------- WP REST API v2 endpoints ----------- */
const gravityFormApi = `${WP_API}/gf/v2/forms`;

/* ----------- GraphQL Schema using graph.ql ----------- */
const gfSchema = graphqlSchema(`
  type Form {
    # Gravity Forms form data
    title: String,
    description: String,
    button: String,
    confirmation: String,
    fields: [Field]
  }

  type Field {
    # Form field
    type: String,
    id: Int,
    label: String,
    placeholder: String,
    cssClass: String,
    visibility: String,
    isRequired: Boolean,
    choices: JSON
  }

  type Query {
    form(id: Int): Form
  }
`, {
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
  Query: {
    form(id, args) {
      const formApiURL = `${gravityFormApi}/${args.id}`;
      return axios.get(formApiURL, {headers: auth})
      .then(res => {
        return res.data;
      })
      .catch(error => console.log('GF Error', error));
    }
  }
});

export default gfSchema;
