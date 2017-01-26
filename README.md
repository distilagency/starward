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
Requires Wordpress setup using the following plugins:
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
- `API_URL` root of WP API *(does not require changing from default)*
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
