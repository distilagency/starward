import { wooCommerceService } from './services';

const {
  getCategory,
  getProduct
} = wooCommerceService;

const fetchWooCommerceData = (params, routeName, location) => {
  // Switch statement on routeName from routes.jsx
  switch (routeName) {
    // Product Category Data
    case 'ProductCategory': {
      console.log('Params @ ProductCategory', params);
      const pageNumber = params.page ? params.page : 1;
      const queryString = location.search ? location.search.replace(/[?&]/g, '$') : '';
      return getCategory(params.category, pageNumber, queryString)
      .then((res) => {
        return res.data.data;
      })
      .catch(error => console.log('error', error));
    }
    case 'Product': {
      console.log('Params @ Product', params);
      const productSlug = params.product;
      return getProduct(productSlug)
      .then((res) => {
        return res.data.data;
      })
      .catch(error => console.log('error', error));
    }
    default:
      return ({handleNotFound: '404'});
  }
};

export default fetchWooCommerceData;
