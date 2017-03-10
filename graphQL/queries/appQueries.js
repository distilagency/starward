import axios from 'axios';
import { WP_API } from '../../config/app';

/* ----------- WP REST API v2 endpoints ----------- */
const wpSettingsURL = `${WP_API}/acf/v2/options/`;
console.log('wpSettingsURL', wpSettingsURL);
const wpMenusUrl = `${WP_API}/wp-api-menus/v2/menu-locations/`;

const appQueries = {
  /* ----------- Fetch data for Schema ----------- */
  Query: {
    settings() {
      return axios.get(wpSettingsURL)
      .then(res => {
        return res.data.acf;
      });
    },
    menu(query, args) {
      return axios.get(wpMenusUrl + args.name)
      .then(({data}) => data);
    },
  }
};

export default appQueries;
