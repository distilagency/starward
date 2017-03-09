import graphqlSchema from 'graphql_json';
import { appSchema, gfSchema, wpSchema } from './schemas';
import { appQueries, gfQueries, wpQueries } from './queries';

/* ----------- GraphQL Schema using graph.ql ----------- */
export const appSettings = graphqlSchema(appSchema, appQueries);
export const gravityForms = graphqlSchema(gfSchema, gfQueries);
export const wp = graphqlSchema(wpSchema, wpQueries);
