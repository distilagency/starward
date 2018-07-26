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

const getRouteData = (params, routeName, queries) => {
  switch (routeName) {
    case 'ProductCategory': {
      const { category, page } = params;
      const pageNumber = page || 1;
      const categoryWithoutQueries = category && category.split('?')[0];
      return getCategory(categoryWithoutQueries, pageNumber, queries)
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

const fetchWooCommerceData = async (params, routeName, queries) => {
  const appData = await getAppData();
  const routeData = await getRouteData(params, routeName, queries);
  return ({ ...appData, ...routeData });
};

export default fetchWooCommerceData;
