/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order as Product } from "../utils/types";

const SET_PRODUCT = 'SET_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

const initialState: InitialState = {
  product: null,
};

type InitialState = {
  product: Product | null,
};

const productReducer = (
  state = initialState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        product: null,
      };
  
    default:
      return state;
  }
}

//action creators
export const setProductAC = (order: Product): SetProduct => {
  return {
    type: SET_PRODUCT,
    payload: order
  };
};

export const deleteProductAC = (): DeleteProduct => {
  return {
    type: DELETE_PRODUCT,
  };
};

type SetProduct = {
  type: typeof SET_PRODUCT;
  payload: Product;
};

type DeleteProduct = {
  type: typeof DELETE_PRODUCT;
};

type ActionTypes =
  | SetProduct
  | DeleteProduct;

export default productReducer;
