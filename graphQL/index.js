import graphqlSchema from 'graphql_json';
import { appSchema, gfSchema, wpSchema, wooCommerceSchema, customSchema } from './schemas';
import { appQueries, gfQueries, wpQueries, wooCommerceQueries, customQueries } from './queries';

/* ----------- GraphQL Schema using graph.ql ----------- */
export const appSettings = graphqlSchema(appSchema, appQueries);
export const gravityForms = graphqlSchema(gfSchema, gfQueries);
export const wp = graphqlSchema(wpSchema, wpQueries);
export const woocommerce = graphqlSchema(wooCommerceSchema, wooCommerceQueries);
// export const custom = graphqlSchema(customSchema, customQueries);
