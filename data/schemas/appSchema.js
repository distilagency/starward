import graphqlSchema from 'graphql_json';
import axios from 'axios';
import { WP_API } from '../../config/app';

/* ----------- WP REST API v2 endpoints ----------- */
const wpMenusUrl = `${WP_API}/wp-api-menus/v2/menus/`;

/* ----------- GraphQL Schema using graph.ql ----------- */
const appSchema = graphqlSchema(`
  type Settings {
    # WP generic data
    name: String!,
    description: String,
  }

  type Menu {
    # Menu
    items: [MenuItem]
  }

  type MenuItem {
    # Menu links
    title: String!,
    object_slug: String!,
    order: Int!,
    classes: String,
    children: [MenuItem]
  }

  type Query {
    settings: Settings
    menu (name: String): Menu
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
      return axios.get(wpMenusUrl)
      .then(({data}) => {
        const navObject = data.filter(item => item.name === args.name)[0];
        const navId = navObject.ID;
        return axios.get(wpMenusUrl + navId)
        .then(res => res.data);
      });
    },
  }
});

export default appSchema;
