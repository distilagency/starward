import axios from 'axios';
import { ROOT_API } from '../../config/app';

const categoryApi = (slug, page, filters) => {
  return axios.post(`${ROOT_API}/products/category`, {
    slug,
    filters,
    page
  });
};
const productApi = (slug) => {
  return axios.get(`${ROOT_API}/product?slug=${slug}`);
};

// wooCommerceService object containing above API requests which gets imported in fetchWooCommerceData

const wooCommerceService = {
  getCategory: (slug, page, queryString) => categoryApi(slug, page, queryString),
  getProduct: slug => productApi(slug),
};

export default wooCommerceService;
