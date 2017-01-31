# :boom: Starward

> Full-stack Wordpress boilerplate web app built using ReactJS and WP REST API v2 :tada:

:construction: Still in construction, be delicate.

## Features:
- [**ReactJS**](https://facebook.github.io/react/)
- [**Universal**](https://medium.com/@ghengeveld/isomorphism-vs-universal-javascript-4b47fb481beb#.4x2t3jlmx) rendering :earth_asia:
- [**GraphQL**](http://graphql.org/learn/)
- [**WP REST API v2**](http://v2.wp-api.org/)
- [**Redux**](https://github.com/reactjs/redux)
- [**React Router**](https://github.com/reactjs/react-router)
- [**React Router Redux**](https://github.com/reactjs/react-router-redux)
- [**react-transform-hmr**](https://github.com/gaearon/react-transform-hmr) hot reloading
- [**Redux-Devtools Chrome Extension**](https://github.com/zalmoxisus/redux-devtools-extension)
- [**Webpack**](https://github.com/webpack/webpack)
- [**Express 4.x**](https://expressjs.com/en/api.html) server

## Wordpress Dependencies
Requires a Wordpress setup using the following plugins:
- [**WP Rest API**](https://en-au.wordpress.org/plugins/rest-api/)
- [**WP API Basic Auth**](https://github.com/WP-API/Basic-Auth)
- [**WP API Menus**](https://en-au.wordpress.org/plugins/wp-api-menus/)
- [**Better REST API Featured Images**](https://en-au.wordpress.org/plugins/better-rest-api-featured-images/)
- [**Yoast SEO**](https://yoast.com/wordpress/plugins/seo/)
- [**WP REST API Yoast SEO**](https://en-au.wordpress.org/plugins/wp-api-yoast-meta/)

Optional supported plugins
- [**ACF/ACF Pro**](https://www.advancedcustomfields.com/pro/)
- [**ACF to REST API**](https://en-au.wordpress.org/plugins/acf-to-rest-api/)
- [**Gravity Forms**](http://www.gravityforms.com/)
- [**Gravity Forms REST API v2**](https://www.gravityhelp.com/gravity-forms-rest-api-v2-beta-2-released/)

## Getting started

### Configuration

Rename `/config/app-template.js` to `/config/app.js`

- `WP_URL` root URL of Wordpress installation
- `WP_API` root of WP API *(does not require changing from default)*
- `WP_AUTH` Basic auth details for API/developer user, used for submissions of Gravity Forms
- `POSTS_PER_PAGE` number of posts to be shown on blog, category and author listing pages, default **10**
- `HOME_SLUG` WP slug for front page, default **homepage**
- `BLOG_SLUG` WP slug for posts page, default **blog**
- `CATEGORY_SLUG` desired root slug for category pages, default **category**
- `AUTHOR_SLUG` desired root slug for author pages, default **author**
- `ROOT_API` GraphQL root URL *(does not require changing from default)*
- `trackingID` Google Analytics tracking ID, replace with 'UA-########-#'

### Running Server
`yarn && yarn dev`

or using NPM

`npm install && npm run dev`

### Styling

Sass partials are contained within `/public/assets/sass` and are split between four folders:

#### /base

Boilerplate partials including a reset, default typography rules, grid, print and reusable, per project mixins like *_omega-reset.scss*

#### /helpers

For storing mixins, functions and other Sass tools used across the project including *_variables.scss* and *_animations.scss*

#### /components

Adheres to the same name spacing as the app/components folder, each partial contains styling for the equivalent React component

#### /containers

Adheres to the same name spacing as the core app/containers folders, each partial contain the styling for the React Redux container that does not fit within an individual component partial. App.scss will contain app specific reusable and global styles.

#### /vendor

Contains Bourbon and Bourbon Neat and any other vendor specific styling

### GraphQL

All data from WP-API is consumed in GraphQL with the help of Graph.ql (https://github.com/matthewmueller/graph.ql), which returns a smaller, more succinct response using Express. The purpose is to reduce the amount of JSON contained within the initial state that gets supplied to the document by the server when running universally.

The GraphQL schema is located within `data/schemas`

The Express endpoints are defined within `server/init/graphql.js`

Out of the box the following API requests can be made to the API server `localhost:3000/api` and can be extended by adding additional GraphQL schema within `data/schemas`:

#### Get site name and description

`/settings`

#### Get a page

`/page?slug=*`

#### Get a post

`/post?slug=*`

#### Get collection of posts

`/posts?page=*`

#### Get a category and list of posts

`/category?slug=*&page=*`

#### Get an author and list of posts

`/author?name=*&page=*`

#### Get a Gravity Form

`/gravityforms?id=*`

*Please note submitting the Gravity Form is handled by a direct API post request to the WP GF API v2 service inside an action, please view app/actions/gravityforms.js*
