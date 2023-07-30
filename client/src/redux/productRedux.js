import { API_URL } from '../config';
import { endRequest, startRequest } from './requestRedux';

/* SELECTORS */
export const getProducts = ({ products }) => products.data;

export const getProductById = ({ products }, id) =>
  products.dataSingle.find((product) => product.id === id);

/* ACTIONS */
const createActionName = (actionName) => `app/product/${actionName}`;
export const LOAD_PRODUCTS = createActionName('LOAD_PRODUCTS');
export const LOAD_PRODUCT_BY_ID = createActionName('LOAD_PRODUCT_BY_ID');

/* ACTION CREATORS */
export const loadProducts = (payload) => ({ payload, type: LOAD_PRODUCTS });
export const loadProductById = (payload) => ({
  payload,
  type: LOAD_PRODUCT_BY_ID,
});

/* THUNKS */
export const loadProductsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'LOAD_PRODUCTS' }));
    await fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(loadProducts(res));
        dispatch(endRequest({ name: 'LOAD_PRODUCTS' }));
      });
  };
};

export const loadProductByIdRequest = (id) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'LOAD_PRODUCT_BY_ID' }));
    await fetch(`${API_URL}/products/${id}`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(loadProductById(res));
        dispatch(endRequest({ name: 'LOAD_PRODUCT_BY_ID' }));
      });
  };
};

/* INITIAL STATE */

const initialState = {
  data: [],
  dataSingle: [],
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        ...statePart,
        dataSingle: [],
        data: [...action.payload],
      };
    case LOAD_PRODUCT_BY_ID:
      return {
        ...statePart,
        dataSingle: [action.payload],
        data: [],
      };
    default:
      return statePart;
  }
}
