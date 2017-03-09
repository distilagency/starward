/* ----------- GraphQL Schema using graph.ql ----------- */
const appSchema = `
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
`;

export default appSchema;
