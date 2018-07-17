import axios from 'axios';
import Cookies from 'js-cookie';
import { ROOT_API } from '../config/app';

import {
  GET_CART,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  ADD_TO_CART,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE
} from './types';

export const getSessionData = () => {
  const cookies = Cookies.get();
  if (cookies) {
    const cookieKeys = Object.keys(cookies);
    for (const key of cookieKeys) {
      if (key.includes('wp_woocommerce_session_')) {
        return `${key}=${Cookies.get(key)};`;
      }
    }
  }
  return false;
};

const fetchCartFailure = error => async (dispatch) => {
  console.error('Error @ fetchCart', error);
  dispatch({type: GET_CART_FAILURE, payload: error});
};

const fetchCartSuccess = payload => async (dispatch) => {
  console.log('fetchCart success', payload);
  dispatch({type: GET_CART_SUCCESS, payload});
};

export const fetchCart = () => async (dispatch) => {
  dispatch({type: GET_CART});
  const sessionData = getSessionData();
  const config = {};
  if (sessionData) config['session-data'] = sessionData;
  try {
    const payload = await axios.get(`${ROOT_API}/getcart`, {
      withCredentials: true,
      headers: config
    });
    const cartItems = Object.keys(payload.data).map(key => payload.data[key]);
    dispatch(fetchCartSuccess(cartItems));
  } catch (error) {
    dispatch(fetchCartFailure(error));
  }
};

const addToCartFailure = error => async (dispatch) => {
  console.error('Error @ addToCart', error);
  dispatch({type: ADD_TO_CART_FAILURE, payload: error});
};

const addToSuccess = payload => async (dispatch) => {
  console.log('addToCart success', payload);
  dispatch({type: ADD_TO_CART_SUCCESS, payload});
};

export const addToCart = (productId, quantity) => async (dispatch) => {
  dispatch({type: ADD_TO_CART});
  const sessionData = getSessionData();
  const config = {};
  if (sessionData) config['session-data'] = sessionData;
  try {
    const payload = await axios.get(`${ROOT_API}/addtocart?productId=${productId}&quantity=${quantity}`, {
      withCredentials: true,
      headers: config
    });
    dispatch(addToSuccess(payload));
  } catch (error) {
    dispatch(addToCartFailure(error));
  }
};
