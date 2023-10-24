/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "../utils/types";

const SET_PRODUCTS = 'SET_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

const initialState: InitialState = {
  products: [],
};

type InitialState = {
  products: Product[],
};

const productsReducer = (
  state = initialState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product => {
          if (product.id === action.payload.id) {
            return action.payload;
          }

          return product;
        }),
      };

    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products]
      }

    default:
      return state;
  }
};

//action creators
export const setProductsAC = (products: Product[]): SetProducts => {
  return {
    type: SET_PRODUCTS,
    payload: products
  };
};

export const removeProductAC = (productId: number): RemoveProducts => {
  return {
    type: REMOVE_PRODUCT,
    payload: productId
  };
};

export const updateProductAC = (product: Product): UpdateProducts => {
  return {
    type: UPDATE_PRODUCT,
    payload: product
  };
};

export const addProductAC = (product: Product): AddProduct => {
  return {
    type: ADD_PRODUCT,
    payload: product
  }
};

type SetProducts = {
  type: typeof SET_PRODUCTS;
  payload: Product[];
};

type RemoveProducts = {
  type: typeof REMOVE_PRODUCT;
  payload: number;
};

type UpdateProducts = {
  type: typeof UPDATE_PRODUCT;
  payload: Product;
};

type AddProduct = {
  type: typeof ADD_PRODUCT;
  payload: Product;
}

type ActionTypes =
  | SetProducts
  | RemoveProducts
  | UpdateProducts
  | AddProduct;

export default productsReducer;
