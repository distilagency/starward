import axios from 'axios';
import { wpService } from './services';
import { SITE_NAME, HOME_SLUG, BLOG_SLUG, POSTS_PER_PAGE } from '../config/app';

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

const getAppData = () => {
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
};

const getRouteData = (params, routeName, queries) => {
  switch (routeName) {
    // Page container data
    case 'Page': {
      const path = params[0];
      const pathWithoutQueries = path && path.split('?')[0];
      // If path is empty or equals '/' fetch data for homepage
      const pathName = !pathWithoutQueries || pathWithoutQueries === '/' ? HOME_SLUG : pathWithoutQueries;
      return getPage(pathName, queries)
      .then(({ data }) => {
        const page = data.data.active_page;
        if (!page) return ({ handleNotFound: '404' });
        return ({ page: data.data.active_page });
      })
      .catch(error => console.log('error', error));
    }
    // Blog container data
    case 'Blog': {
      const pageNumber = params.page ? params.page : 1;
      const perPage = params.perPage ? params.perPage : POSTS_PER_PAGE;
      return axios.all([
        getPage(BLOG_SLUG, queries),
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
      return getPost(params.post, queries)
      .then(({data}) => {
        return { activePost: data.data.activePost };
      })
      .catch(error => console.log('error', error));
    }
    // Category container data
    case 'Category': {
      const pageNumber = params.page ? params.page : 1;
      return getCategory(params.slug, pageNumber)
      .then(res => res.data.data)
      .catch(error => console.log('error', error));
    }
    // Author container data
    case 'Author': {
      const pageNumber = params.page ? params.page : 1;
      return getAuthor(params.name, pageNumber)
      .then(res => res.data.data)
      .catch(error => console.log('error', error));
    }
    // Search container data
    case 'Search': {
      return getSearchResults(queries.term, queries.type, queries.page, queries.perPage)
      .then((res) => {
        return {
          search: res.data.data.search
        };
      });
    }
    case 'Cart': {
      return {};
    }
    default:
      return ({ handleNotFound: '404' });
  }
};

const fetchWPData = async (params, routeName, queries) => {
  // Switch statement on routeName from routes.jsx
  const appData = await getAppData();
  const routeData = await getRouteData(params, routeName, queries);
  return ({ ...appData, ...routeData });
};

export default fetchWPData;
