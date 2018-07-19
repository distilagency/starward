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
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  items: [],
  totals: [],
  error: ''
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...INITIAL_STATE, loading: true
      };
    case GET_CART_SUCCESS:
      return {
        ...state, items: action.payload, loading: false
      };
    case GET_CART_FAILURE:
      return {
        ...state, items: [], loading: false, error: action.payload
      };
    case GET_CART_TOTALS:
      return {
        ...INITIAL_STATE
      };
    case GET_CART_TOTALS_SUCCESS:
      return {
        ...state, totals: action.payload
      };
    case GET_CART_TOTALS_FAILURE:
      return {
        ...state, totals: [], error: action.payload
      };
    case ADD_TO_CART:
      return {
        ...state
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state
      };
    case ADD_TO_CART_FAILURE:
      return {
        ...state, error: action.payload
      };
    case REMOVE_FROM_CART:
      return {
        ...state
      };
    case REMOVE_FROM_CART_SUCCESS:
      return {
        ...state
      };
    case REMOVE_FROM_CART_FAILURE:
      return {
        ...state, error: action.payload
      };
    case UPDATE_CART_QTY:
      return {
        ...state
      };
    case UPDATE_CART_QTY_SUCCESS:
      return {
        ...state
      };
    case UPDATE_CART_QTY_FAILURE:
      return {
        ...state, error: action.payload
      };
    default:
      return state;
  }
}
