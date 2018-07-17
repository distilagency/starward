import {
  GET_CART,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  ADD_TO_CART,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  items: [],
  addClientError: ''
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
    case ADD_TO_CART:
      return {
        ...INITIAL_STATE, addingClient: true, addClientSuccess: null
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state, addedClient: action.payload, addingClient: false, addClientSuccess: true
      };
    case ADD_TO_CART_FAILURE:
      return {
        ...state, addingClient: false, addClientSuccess: false, addClientError: action.payload
      };
    default:
      return state;
  }
}
