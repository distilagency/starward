import axios from 'axios';
// Global GraphQL root API url
import { ROOT_API, POSTS_PER_PAGE } from '../../../config/app';

// List of GraphQL API endpoints and axios.get() requests - https://github.com/mzabriskie/axios#example

const settingsApi = axios.get(`${ROOT_API}/settings/`);
const menuApi = (name) => axios.get(`${ROOT_API}/menu?name=${name}`);
const pageApi = (slug) => axios.get(`${ROOT_API}/page?slug=${slug}`);
const postsApi = (page, perPage) => axios.get(`${ROOT_API}/posts?page=${page}&perPage=${!perPage ? POSTS_PER_PAGE : perPage}`);
const postApi = (slug) => axios.get(`${ROOT_API}/post?slug=${slug}`);
const categoryApi = (slug, page) => axios.get(`${ROOT_API}/category?slug=${slug}&page=${page}`);
const authorApi = (name, page) => axios.get(`${ROOT_API}/author?name=${name}&page=${page}`);
const searchApi = (term, type, page, perPage) => axios.get(`${ROOT_API}/search?term=${term}&type=${!type ? 'posts' : type}&page=${!page ? 1 : page}&pageNumber=${!perPage ? POSTS_PER_PAGE : perPage}`);

// wpService object containing above API requests which gets imported in fetchWPData

const wpService = {
  getSettings: () => settingsApi,
  getMenu: (name) => menuApi(name),
  getPage: (slug) => pageApi(slug),
  getPosts: (page, perPage) => postsApi(page, perPage),
  getPost: (slug) => postApi(slug),
  getCategory: (slug, page) => categoryApi(slug, page),
  getAuthor: (name, page) => authorApi(name, page),
  getSearchResults: (term, type, page, perPage) => searchApi(term, type, page, perPage)
};

export default wpService;
