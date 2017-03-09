import axios from 'axios';
import { WP_API } from '../../config/app';

/* ----------- WP REST API v2 endpoints ----------- */
const wpMenusUrl = `${WP_API}/wp-api-menus/v2/menu-locations/`;

const appQueries = {
  /* ----------- Fetch data for Schema ----------- */
  Query: {
    settings() {
      return axios.get(WP_API)
      .then(res => {
        return res.data;
      });
    },
    menu(query, args) {
      return axios.get(wpMenusUrl + args.name)
      .then(({data}) => data);
    },
  }
};

export default appQueries;
