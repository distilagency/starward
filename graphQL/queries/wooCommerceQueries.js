import axios from 'axios';
import queryString from 'query-string';
import { WP_API, WP_AUTH } from '../../server/config/app';
import { ROOT_API, PRODUCTS_PER_PAGE } from '../../app/config/app';

const auth = { Authorization: `Basic ${WP_AUTH}` };

/* ----------- WooCommerce REST API v1 endpoints ----------- */
const WC_API_ROOT = `${WP_API}/wc/v2`;
const wcProductsUrl = `${WC_API_ROOT}/products`;
const wcCategoriesUrl = `${WC_API_ROOT}/products/categories`;

const wooCommerceQueries = {
  Category: {
    details(response) {
      return response && response.data ? response.data[0] : null;
    },
    products(response) {
      if (!response || !response.data || !response.data[0]) return [];
      const categoryId = response.data[0].id;
      const query = queryString.stringify(response.filters);
      return axios.get(`${wcProductsUrl}?category=${categoryId}&page=${response.page}&per_page=${PRODUCTS_PER_PAGE}&${query}`, { headers: auth })
      .then((productsResponse) => {
        return ({
          items: productsResponse.data,
          totalProducts: productsResponse.headers['x-wp-total'],
          totalPages: productsResponse.headers['x-wp-totalpages'],
        });
      })
      .catch(error => console.log('error', error));
    },
    filters(response) {
      if (!response || !response.data || !response.data[0]) return [];

      // Get Current Category Id
      const categoryId = response.data[0].id;

      // Get Product Attributes for Current Category
      return axios.get(`${ROOT_API}/categoryfilters?categoryId=${categoryId}`)
      .then((categoryFilters) => {
        return categoryFilters.data;
      })
      .catch(error => console.log('error', error));
    }
  },
  Product: {
    relatedProducts(response) {
      if (!response) return [];
      // Map related ids into an array of promises
      // Resolve all promises so that we end up with an array of related products
      const relatedIds = response.related_ids;
      return axios.get(`${ROOT_API}/relatedproducts?relatedIds=${relatedIds}`)
      .then(res => res.data)
      .catch(error => console.log('error', error));
    }
  },
  Query: {
    productcategory(query, args) {
      const wcCategoryURL = `${wcCategoriesUrl}?slug=${args.slug}`;
      return axios.get(wcCategoryURL, { headers: auth })
      .then((categoryRes) => {
        return ({
          data: categoryRes.data,
          page: args.page || 1,
          filters: args.filters || null
        });
      })
      .catch(error => console.log('error', error));
    },
    product(query, args) {
      return axios.get(`${wcProductsUrl}?slug=${args.slug}`, { headers: auth })
      .then(productResponse => productResponse.data[0])
      .catch(error => console.log('error', error));
    }
  }
};

export default wooCommerceQueries;
