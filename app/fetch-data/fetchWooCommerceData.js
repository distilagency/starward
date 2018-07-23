import axios from 'axios';
import { wpService, wooCommerceService } from './services';
import { SITE_NAME } from '../config/app';

const {
  getCategory,
  getProduct
} = wooCommerceService;

const {
  getSettings,
  getMenu
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

const getRouteData = (params, routeName, location) => {
  switch (routeName) {
    case 'ProductCategory': {
      const pageNumber = params.page ? params.page : 1;
      const queryString = location.search ? location.search.replace(/[?&]/g, '$') : '';
      return getCategory(params.category, pageNumber, queryString)
      .then((res) => {
        return res.data.data;
      })
      .catch(error => console.log('error', error));
    }
    case 'Product': {
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

const fetchWooCommerceData = async (params, routeName, location) => {
  const appData = await getAppData();
  const routeData = await getRouteData(params, routeName, location);
  return ({ ...appData, ...routeData });
};

export default fetchWooCommerceData;
