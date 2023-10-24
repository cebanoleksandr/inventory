import classNames from 'classnames';
import React from 'react';
import { removeOrder } from '../../api/orders';
import { removeProduct } from '../../api/products';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setOrderAC } from '../../redux/orderReducer';
import { removeOrderAC } from '../../redux/ordersReducer';
import { getOrderProducts } from '../../utils/helpers';
import { Order } from '../../utils/types';
import './OrderItem.scss';

type Props = {
  order: Order;
}

export const OrderItem: React.FC<Props> = ({ order }) => {
  const selectedOrder = useAppSelector(state => state.order.order);
  const products = getOrderProducts(useAppSelector(state => state.products.products), order.products);
  const sum = products.map(p => p.price).reduce((a, b) => a + b, 0);
  const dispatch = useAppDispatch();

  const openDetails = () => {
    dispatch(setOrderAC(order));
  }

  const removeOrderHandler = () => {
    for (const productId of order.products) {
      removeProduct(productId);
    }

    removeOrder(order.id);
    dispatch(removeOrderAC(order.id));
  }

  return (
    <div className="order-item">
      {!selectedOrder && (
        <div className="order-title">
          <p>{order.name}</p>
        </div>
      )}

      <div className={classNames({
        'order-info-full': !!selectedOrder,
        'order-info': !selectedOrder
      })}>
        <img
          src="https://w7.pngwing.com/pngs/1010/337/png-transparent-computer-icons-button-font-menu-computer-network-text-window.png"
          className="burger-icon"
          onClick={openDetails}
          alt="Burger menu"
        />

        <div>
          <p>{products.length}</p>
          <p>Products</p>
        </div>

        <span>{order.created_at}</span>

        {!!selectedOrder && order.id === selectedOrder.id && (
          <div className="point">
            &#62;
          </div>
        )}
      </div>

      {!selectedOrder && (
        <div className="order-price">
          <span className="price">${sum.toFixed(2)}</span>

          <img
            src="https://cdn-icons-png.flaticon.com/512/542/542724.png"
            className="remove-icon"
            onClick={removeOrderHandler}
            alt="Remove icon"
          />
        </div>
      )}
    </div>
  );
}
