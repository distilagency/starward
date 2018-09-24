import axios from 'axios';
import { woocommerce } from '../../graphQL';
import { serversideStateCharacterBlacklistRegex, WP_API, WP_URL, WP_AUTH } from '../config/app';

/* ----------- App API Helpers ----------- */

/* Removes illegal characters from WP API */
/* Checks for WP_URL in response and replaces it with the base url */
/* Reinstates correct wp-content links within response */
const sanitizeJSON = (json) => {
  const stringified = JSON.stringify(json);
  const wpUrlRegex = new RegExp(WP_URL, 'g');
  const wpContentUrlRegex = new RegExp('/assets', 'g');
  const cleaned = stringified
  .replace(serversideStateCharacterBlacklistRegex, '')
  .replace(wpUrlRegex, '')
  .replace(wpContentUrlRegex, `${WP_URL}/assets`);
  return JSON.parse(cleaned);
};
/* Handle success and sanitize JSON response */
const handleSuccess = (res) => {
  return data => res.json(sanitizeJSON(data));
};
/* Handle error */
const handleError = (res) => {
  return error => res.json(error);
};

export default(app) => {
  /* ----------- Cart Operations ----------- */

  app.get('/api/getcart', async (req, res) => {
    try {
      const sessionData = req.headers['session-data'];
      const headers = {};
      if (sessionData) headers.Cookie = sessionData;
      const response = await axios.get(`${WP_API}/wc/v2/cart`, { headers });
      return res.json(response.data);
    } catch (error) {
      return res.json(error);
    }
  });
  app.get('/api/calculatecarttotals', async (req, res) => {
    try {
      const sessionData = req.headers['session-data'];
      const headers = {};
      if (sessionData) headers.Cookie = sessionData;
      const response = await axios.post(`${WP_API}/wc/v2/cart/calculate`, {}, { headers });
      return res.json(response.data);
    } catch (error) {
      return res.json(error);
    }
  });
  app.get('/api/getcarttotals', async (req, res) => {
    try {
      const sessionData = req.headers['session-data'];
      const headers = {};
      if (sessionData) headers.Cookie = sessionData;
      const response = await axios.get(`${WP_API}/wc/v2/cart/totals`, { headers });
      return res.json(response.data);
    } catch (error) {
      return res.json(error);
    }
  });
  app.get('/api/addtocart', async (req, res) => {
    try {
      const productId = parseInt(req.query.productId);
      const quantity = parseInt(req.query.quantity);
      const sessionData = req.headers['session-data'];
      const headers = {};
      if (sessionData) headers.Cookie = sessionData;
      const response = await axios.post(`${WP_API}/wc/v2/cart/add`, {
        product_id: productId,
        quantity
      }, { headers });
      if (!sessionData) {
        const cookies = response.headers['set-cookie'];
        const setCookieFunc = (cookie) => {
          const [cookieKeyValue, ...cookieOptionsArr] = cookie.split('; ');
          const cookieKey = cookieKeyValue.split('=')[0];
          const cookieValue = decodeURIComponent(cookieKeyValue.split('=')[1]);
          const cookieOptions = { };
          cookieOptionsArr.forEach((option) => {
            const key = option.split('=')[0];
            const val = option.split('=')[1];
            cookieOptions[key] = val;
          });
          if (cookieOptions.expires) {
            const expires = new Date(cookieOptions.expires);
            cookieOptions.expires = expires;
          }
          if (cookieOptions.expires) {
            const expires = new Date(cookieOptions.expires);
            cookieOptions.expires = expires;
          }
          if (cookieOptions.path) {
            cookieOptions.path = '/';
          }
          res.cookie(cookieKey, cookieValue, cookieOptions);
        };
        cookies.map(cookie => setCookieFunc(cookie));
      }
      return res.json(response.data);
    } catch (error) {
      // Handle error
      return res.json(error);
    }
  });
  app.get('/api/updatequantity', async (req, res) => {
    try {
      const { itemKey } = req.query;
      const newQty = parseInt(req.query.newQty);
      const sessionData = req.headers['session-data'];
      const headers = {};
      if (sessionData) headers.Cookie = sessionData;
      const response = await axios.post(`${WP_API}/wc/v2/cart/cart-item`, {
        cart_item_key: itemKey,
        quantity: newQty
      }, { headers });
      return res.json(response.data);
    } catch (error) {
      // Handle error
      return res.json(error);
    }
  });
  app.get('/api/removefromcart', async (req, res) => {
    try {
      const { itemKey } = req.query;
      const data = {
        cart_item_key: itemKey
      };
      const sessionData = req.headers['session-data'];
      const headers = {};
      if (sessionData) headers.Cookie = sessionData;
      const response = await axios.delete(`${WP_API}/wc/v2/cart/cart-item`, { data, headers });
      return res.json(response.data);
    } catch (error) {
      return res.json(error);
    }
  });

  /* ----------- Category Operations ----------- */

  /* Get Product Category and Collection of Products */
  app.post('/api/products/category', (req, res) => {
    woocommerce(`
      query get_product_category($slug: String, $page: Int, $filters: JSON) {
        category: productcategory(slug: $slug, page: $page, filters: $filters) {
          details {
            slug,
            name,
            description,
            id,
            parent
          },
          products {
            items {
              slug,
              name,
              description,
              id,
              regular_price,
              sale_price,
              price_html,
              images {
                src,
                alt,
                position
              },
              attributes {
                id,
                name,
                slug,
                options {
                  id,
                  name,
                  slug,
                  taxonomy,
                  description,
                  count
                },
                swatches
              }
            },
            totalProducts,
            totalPages
          },
          filters
        }
      }`, {
        slug: req.body.slug,
        page: req.body.page,
        filters: req.body.filters
      })
      .then(handleSuccess(res))
      .catch(handleError(res));
  });

  /* Get WooCommerce Attributes Specific to a Product Category */
  app.get('/api/categoryfilters', async (req, res) => {
    const auth = { Authorization: `Basic ${WP_AUTH}` };
    try {
      const { categoryId } = req.query;
      // Make request to custom endpoint in Starward WooCommerce Plugin
      const filtersObject = await axios.get(`${WP_API}/starward/products/filters/category/${categoryId}`, { headers: auth });
      // Respond with category filters object
      return res.json(sanitizeJSON(filtersObject.data));
    } catch (error) {
      // Handle error
      return res.json(error);
    }
  });

  /* ----------- Product Operations ----------- */

  /* Get a specific product */
  app.get('/api/product', (req, res) => {
    woocommerce(`
      query get_product($slug: String) {
        product(slug: $slug) {
          sku,
          id,
          name,
          slug,
          description,
          short_description,
          images {
            src,
            alt,
            position
          },
          price,
          regular_price,
          sale_price,
          on_sale,
          price_html,
          attributes {
            id,
            name,
            slug,
            taxonomy,
            position,
            visible,
            options {
              id,
              name,
              slug,
              taxonomy,
              description,
              count
            }
            swatches
          },
          categories {
            id,
            name,
            slug
          },
          in_stock,
          stock_quantity,
          type,
          featured,
          catalog_visibility,
          relatedProducts {
            images {
              src,
              alt,
              position
            },
            id,
            name,
            regular_price,
            sale_price,
            price_html,
            on_sale,
            price,
            slug
          },
          variations,
          variation_attributes
        }
      }`, { slug: req.query.slug })
      .then(handleSuccess(res))
      .catch(handleError(res));
  });

  /* Get related products */
  app.get('/api/relatedproducts', async (req, res) => {
    const WC_API_ROOT = `${WP_API}/wc/v2`;
    const wcProductsUrl = `${WC_API_ROOT}/products`;
    const auth = { Authorization: `Basic ${WP_AUTH}` };
    const relatedIds = req.query.relatedIds ? req.query.relatedIds.split(',') : null;
    try {
      const relatedProductsArray = await Promise.all(relatedIds.map(async (id) => {
        const resp = await axios.get(`${wcProductsUrl}/${id}`, { headers: auth });
        return resp;
      }))
      .then((relatedProductsResponse) => {
        return relatedProductsResponse.map((relatedProduct) => {
          const {
            images,
            id,
            name,
            regular_price,
            sale_price,
            slug
          } = relatedProduct.data;
          return {
            images,
            id,
            name,
            regular_price,
            sale_price,
            slug
          };
        });
      });
      return res.json(sanitizeJSON(relatedProductsArray));
    } catch (error) {
      return res.json(error);
    }
  });
};
