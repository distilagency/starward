import axios from 'axios';
import { wpService } from './services';
import { baseURL, SITE_NAME, HOME_SLUG, BLOG_SLUG, POSTS_PER_PAGE } from '../config/app';

// GraphQL WP API Services using axios.get() https://github.com/mzabriskie/axios#example
const {
  getSettings,
  getMenu,
  getPage,
  getPosts,
  getPost,
  getCategory,
  getAuthor,
  getSearchResults
} = wpService;

const handle404 = () => ({handle404: true});

const fetchWPData = (params, routeName, location) => {
  // Switch statement on routeName from routes.jsx
  switch (routeName) {
    // App component data using axios.all() https://github.com/mzabriskie/axios#example
    // -- Fetching basic WP settings
    // -- Fetching menu for header component
    case 'App': {
      return axios.all([
        getSettings(),
        getMenu('primary_navigation')
      ])
      .then(([
        settings,
        headerMenu
      ]) => ({
        settings: !settings.data.data.settings ? { name: SITE_NAME } : settings.data.data.settings,
        headerMenu: headerMenu.data.data.menu
      }))
      .catch(error => console.log('error', error));
    }
    // Home container data
    case 'Home': {
      return getPage(HOME_SLUG)
      .then(({data}) => ({ page: data.data.active_page }))
      .catch(error => console.log('error', error));
    }
    // Page container data
    case 'Page': {
      const pathArray = params.splat.split('/');
      const slug = pathArray[pathArray.length - 1];
      return getPage(slug)
      .then(({data}) => {
        // Check that WP splat and Starward splat match else handle 404
        const starwardSplat = `/${params.splat}/`;
        const wpSplat = data.data.active_page ? data.data.active_page.link : '/';
        if (wpSplat !== starwardSplat) return handle404();
        // Return page data
        return ({ page: data.data.active_page });
      })
      .catch(error => console.log('error', error));
    }
    // Blog container data
    case 'Blog': {
      const pageNumber = params.page ? params.page : 1;
      const perPage = params.perPage ? params.perPage : POSTS_PER_PAGE;
      return axios.all([
        getPage(BLOG_SLUG),
        getPosts(pageNumber, perPage)
      ])
      .then(([
        page,
        posts
      ]) => ({
        page: page.data.data.active_page,
        posts: posts.data.data.posts
      }))
      .catch(error => console.log('error', error));
    }
    // BlogPost container data
    case 'BlogPost': {
      return getPost(params.post)
      .then(({data}) => {
        return { activePost: data.data.activePost };
      })
      .catch(error => console.log('error', error));
    }
    // Category container data
    case 'Category': {
      const pageNumber = params.page ? params.page : 1;
      return getCategory(params.slug, pageNumber)
      .then(res => {
        return res.data.data;
      })
      .catch(error => console.log('error', error));
    }
    // Author container data
    case 'Author': {
      const pageNumber = params.page ? params.page : 1;
      return getAuthor(params.name, pageNumber)
      .then(res => {
        return res.data.data;
      })
      .catch(error => console.log('error', error));
    }
    // Search container data
    case 'Search': {
      return getSearchResults(location.query.term, location.query.type, location.query.page, location.query.perPage)
      .then(res => {
        return {
          search: res.data.data.search
        };
      });
    }
    default:
      return ({handleNotFound: '404'});
  }
};

export default fetchWPData;
