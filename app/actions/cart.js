import axios from 'axios';
import Cookies from 'js-cookie';
import { ROOT_API } from '../config/app';

import {
  GET_CART,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_TOTALS,
  GET_CART_TOTALS_SUCCESS,
  GET_CART_TOTALS_FAILURE,
  ADD_TO_CART,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  REMOVE_FROM_CART,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAILURE,
  UPDATE_CART_QTY,
  UPDATE_CART_QTY_SUCCESS,
  UPDATE_CART_QTY_FAILURE
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

const fetchCartTotalsFailure = error => async (dispatch) => {
  console.error('Error @ fetchCartTotals', error);
  dispatch({type: GET_CART_TOTALS_FAILURE, payload: error});
};

const fetchCartTotalsSuccess = payload => async (dispatch) => {
  console.log('fetchCartTotals success', payload);
  dispatch({type: GET_CART_TOTALS_SUCCESS, payload});
};

export const fetchCartTotals = () => async (dispatch) => {
  dispatch({type: GET_CART_TOTALS});
  const sessionData = getSessionData();
  const config = {};
  if (sessionData) config['session-data'] = sessionData;
  try {
    const payload = await axios.get(`${ROOT_API}/getcarttotals`, {
      withCredentials: true,
      headers: config
    });
    const cartItems = Object.keys(payload.data).map(key => payload.data[key]);
    dispatch(fetchCartTotalsSuccess(cartItems));
  } catch (error) {
    dispatch(fetchCartTotalsFailure(error));
  }
};

const addToCartFailure = error => async (dispatch) => {
  console.error('Error @ addToCart', error);
  dispatch({type: ADD_TO_CART_FAILURE, payload: error});
};

const addToSuccess = payload => async (dispatch) => {
  console.log('addToCart success', payload);
  dispatch(fetchCart());
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

const removeFromCartFailure = error => async (dispatch) => {
  console.error('Error @ addToCart', error);
  dispatch({type: REMOVE_FROM_CART_FAILURE, payload: error});
};

const removeFromCartSuccess = payload => async (dispatch) => {
  console.log('addToCart success', payload);
  dispatch(fetchCart());
  dispatch({type: REMOVE_FROM_CART_SUCCESS, payload});
};

export const removeFromCart = itemKey => async (dispatch) => {
  dispatch({type: REMOVE_FROM_CART});
  const sessionData = getSessionData();
  const config = {};
  if (sessionData) config['session-data'] = sessionData;
  try {
    const payload = await axios.get(`${ROOT_API}/removefromcart?itemKey=${itemKey}`, {
      withCredentials: true,
      headers: config
    });
    dispatch(removeFromCartSuccess(payload));
  } catch (error) {
    dispatch(removeFromCartFailure(error));
  }
};

const updateItemQuantityFailure = error => async (dispatch) => {
  console.error('Error @ updateItemQuantity', error);
  dispatch({type: UPDATE_CART_QTY_FAILURE, payload: error});
};

const updateItemQuantitySuccess = response => async (dispatch) => {
  console.log('updateItemQuantity success', response);
  dispatch(fetchCart());
  dispatch({type: UPDATE_CART_QTY_SUCCESS});
};

export const updateItemQuantity = (itemKey, newQty) => async (dispatch) => {
  dispatch({type: UPDATE_CART_QTY});
  const sessionData = getSessionData();
  const config = {};
  if (sessionData) config['session-data'] = sessionData;
  try {
    const response = await axios.get(`${ROOT_API}/updatequantity?itemKey=${itemKey}&newQty=${newQty}`, {
      withCredentials: true,
      headers: config
    });
    dispatch(updateItemQuantitySuccess(response));
  } catch (error) {
    dispatch(updateItemQuantityFailure(error));
  }
};
