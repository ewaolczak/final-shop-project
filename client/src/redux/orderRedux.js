import { API_URL } from '../config';

/* SELECTORS */

export const getOrders = ({ orders }) => orders;

export const getOrdersProduct = ({ orders }) => orders.products;

export const getOrderById = ({ orders }, id) =>
  orders.dataSingle.find((order) => order.id === id);

/* ACTIONS */
const createActionName = (actionName) => `app/order/${actionName}`;
export const ADD_PRODUCT_TO_ORDER = createActionName('ADD_PRODUCT_TO_ORDER');
export const ADD_USERINFO_TO_ORDER = createActionName('ADD_USERINFO_TO_ORDER');
export const REMOVE_PRODUCT_FROM_ORDER = createActionName(
  'REMOVE_PRODUCT_FROM_ORDER',
);
export const EDIT_ORDER = createActionName('EDIT_ORDER');
export const REMOVE_ORDER = createActionName('REMOVE_ORDER');

/* ACTION CREATORS */

export const addProductToOrder = (payload) => ({
  payload,
  type: ADD_PRODUCT_TO_ORDER,
});
export const addUserinfoToOrder = (payload) => ({
  payload,
  type: ADD_USERINFO_TO_ORDER,
});
export const removeProductFromOrder = (payload) => ({
  payload,
  type: REMOVE_PRODUCT_FROM_ORDER,
});
export const editOrder = (payload) => ({
  payload,
  type: EDIT_ORDER,
});
export const removeOrder = () => ({
  type: REMOVE_ORDER,
});

/* THUNKS */

export const postOrderRequest = (order) => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    };

    fetch(`${API_URL}/orders`, options).then((res) => {
      if (res.status === 201) {
        dispatch(removeOrder());
        localStorage.removeItem('cartProducts');
        alert('Your order has been sent!');
      }
    });
  };
};

/* INITIAL STATE */

const initialState = localStorage.getItem('cartProducts')
  ? { products: JSON.parse(localStorage.getItem('cartProducts')) }
  : { products: [] };

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case ADD_PRODUCT_TO_ORDER:
      return {
        ...statePart,
        products: [...statePart.products, action.payload],
      };
    case ADD_USERINFO_TO_ORDER:
      return {
        ...statePart,
        ...action.payload,
      };
    case REMOVE_PRODUCT_FROM_ORDER:
      return {
        ...statePart,
        products: statePart.products.filter(
          (product) => product.productId !== action.payload,
        ),
      };
    case EDIT_ORDER:
      return {
        ...statePart,
        products: statePart.products.map((product) =>
          product.productId === action.payload.productId
            ? { ...product, ...action.payload }
            : product,
        ),
      };
    case REMOVE_ORDER:
      return { products: [] };
    default:
      return statePart;
  }
}
