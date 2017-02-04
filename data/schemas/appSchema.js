import graphqlSchema from 'graphql_json';
import axios from 'axios';
import { WP_API } from '../../config/app';

/* ----------- WP REST API v2 endpoints ----------- */
const wpMenusUrl = `${WP_API}/wp-api-menus/v2/menu-locations/`;

/* ----------- GraphQL Schema using graph.ql ----------- */
const appSchema = graphqlSchema(`
  type Settings {
    # WP generic data
    name: String!,
    description: String,
  }

  type MenuItem {
    # Menu links
    title: String!,
    url: String!,
    order: Int!,
    classes: String,
    children: [MenuItem]
  }

  type Query {
    settings: Settings
    menu (name: String): [MenuItem]
  }
`, {
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
});

export default appSchema;
