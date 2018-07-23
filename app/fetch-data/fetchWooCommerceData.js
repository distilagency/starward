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
      const pageNumber = params.page ? params.page : 1;
      const queryString = location.search.replace(/[?&]/g, '$');
      return getCategory(params.category, pageNumber, queryString)
      .then(res => {
        return res.data.data;
      })
      .catch(error => console.log('error', error));
    }
    case 'Product': {
      const productSlug = params.product;
      return getProduct(productSlug)
      .then(res => {
        // console.log(res.data.data);
        return res.data.data;
      })
      .catch(error => console.log('error', error));
    }
    default:
      return ({handleNotFound: '404'});
  }
};

export default fetchWooCommerceData;
