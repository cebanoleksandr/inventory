/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from "../utils/types";

const SET_ORDER = 'SET_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';

const initialState: InitialState = {
  order: null,
};

type InitialState = {
  order: Order | null,
};

const orderReducer = (
  state = initialState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };

    case DELETE_ORDER:
      return {
        ...state,
        order: null,
      };
  
    default:
      return state;
  }
}

//action creators
export const setOrderAC = (order: Order): SetOrder => {
  return {
    type: SET_ORDER,
    payload: order
  };
};

export const deleteOrderAC = (): DeleteOrder => {
  return {
    type: DELETE_ORDER,
  };
};

type SetOrder = {
  type: typeof SET_ORDER;
  payload: Order;
};

type DeleteOrder = {
  type: typeof DELETE_ORDER;
};

type ActionTypes =
  | SetOrder
  | DeleteOrder;

export default orderReducer;
