/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from "../utils/types";

const SET_ORDERS = 'SET_ORDERS';
const ADD_ORDER = 'ADD_ORDER';
const REMOVE_ORDER = 'REMOVE_ORDER';
const UPDATE_ORDER = 'UPDATE_ORDER';

const initialState: InitialState = {
  orders: [],
};

type InitialState = {
  orders: Order[],
};

const ordersReducer = (
  state = initialState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    case REMOVE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload),
      };

    case UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map(order => {
          if (order.id === action.payload.id) {
            return action.payload;
          }

          return order;
        }),
      };

    case ADD_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      }

    default:
      return state;
  }
};

//action creators
export const setOrdersAC = (orders: Order[]): SetOrders => {
  return {
    type: SET_ORDERS,
    payload: orders
  };
};

export const removeOrderAC = (orderId: number): RemoveOrder => {
  return {
    type: REMOVE_ORDER,
    payload: orderId
  };
};

export const updateOrderAC = (order: Order): UpdateOrder => {
  return {
    type: UPDATE_ORDER,
    payload: order
  };
};

export const addOrderAC = (order: Order): AddOrder => {
  return {
    type: ADD_ORDER,
    payload: order
  }
}

type SetOrders = {
  type: typeof SET_ORDERS;
  payload: Order[];
};

type RemoveOrder = {
  type: typeof REMOVE_ORDER;
  payload: number;
};

type UpdateOrder = {
  type: typeof UPDATE_ORDER;
  payload: Order;
};

type AddOrder = {
  type: typeof ADD_ORDER;
  payload: Order;
}

type ActionTypes =
  | SetOrders
  | RemoveOrder
  | UpdateOrder
  | AddOrder;

export default ordersReducer;
