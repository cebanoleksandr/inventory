import { combineReducers, createStore, Store } from 'redux';
import filterReducer from './filterReduser';
import orderReducer from './orderReducer';
import ordersReducer from './ordersReducer';
import productReducer from './productReducer';
import productsReducer from './productsReducer';

const reducers = combineReducers({
  odrers: ordersReducer,
  order: orderReducer,
  products: productsReducer,
  product: productReducer,
  filter: filterReducer
});

const store: Store<RootState> = createStore(reducers);

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

export default store;
