import axios from 'axios';
import { wpService } from './services';
import { HOME_SLUG, BLOG_SLUG } from '../../config/app';

// GraphQL WP API Services using axios.get() https://github.com/mzabriskie/axios#example
const {
  getSettings,
  getMenu,
  getPage,
  getPosts,
  getPost,
  getCategory,
  getAuthor
} = wpService;

const fetchWPData = (params, routeName) => {
  // Switch statement on routeName from routes.jsx
  switch (routeName) {
    // App component data using axios.all() https://github.com/mzabriskie/axios#example
    // -- Fetching basic WP settings
    // -- Fetching menu for header component
    case 'App': {
      return axios.all([
        getSettings(),
        getMenu('Header')
      ])
      .then(([
        settings,
        headerMenu
      ]) => ({
        settings: settings.data.data.settings,
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
      .then(({data}) => ({ page: data.data.active_page }))
      .catch(error => console.log('error', error));
    }
    // Blog container data
    case 'Blog': {
      const pageNumber = params.page ? params.page : 1;
      return axios.all([
        getPage(BLOG_SLUG),
        getPosts(pageNumber)
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
        console.log('author data', res.data.data.author);
        return res.data.data;
      })
      .catch(error => console.log('error', error));
    }
    default:
      return null;
  }
};

export default fetchWPData;
