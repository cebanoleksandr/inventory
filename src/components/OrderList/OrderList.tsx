import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../../api/orders';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setOrdersAC } from '../../redux/ordersReducer';
import { getFilteredOrders } from '../../utils/helpers';
import { OrderItem } from '../OrderItem/OrderItem';
import './OrderList.scss';

export const OrderList = () => {
  const orders = useAppSelector(state => state.odrers.orders);
  const ordersQuery = useAppSelector(state => state.filter.query);
  const preparedOrders = getFilteredOrders(orders, ordersQuery);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setOrdersAC(getAllOrders()));
  }, []);

  return (
    <div className="order-list">
      {preparedOrders.map(order => (
        <OrderItem order={order} key={order.id} />
      ))}
    </div>
  );
}
