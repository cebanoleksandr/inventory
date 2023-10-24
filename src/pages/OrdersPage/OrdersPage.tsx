import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getAllproducts, removeProduct } from '../../api/products';
import { BackDrop } from '../../components/BackDrop/BackDrop';
import { OrderList } from '../../components/OrderList/OrderList';
import { AddOrderModal } from '../../components/AddOrderModal/AddOrderModal';
import { AddProductModal } from '../../components/AddProductModal/AddProductModal';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { deleteOrderAC } from '../../redux/orderReducer';
import { removeProductAC, setProductsAC } from '../../redux/productsReducer';
import { getOrderProducts } from '../../utils/helpers';
import './OrdersPage.scss';
import { setOrdersAC } from '../../redux/ordersReducer';
import { getAllOrders } from '../../api/orders';

export const OrdersPage = () => {
  const selectedOrder = useAppSelector(state => state.order.order);
  const ordersCount = useAppSelector(state => state.odrers.orders.length);
  const allProducts = useAppSelector(state => state.products.products);
  const products = getOrderProducts(allProducts, selectedOrder?.products);
  const dispatch = useAppDispatch();
  const [isOrderModal, setIsOrderModal] = useState(false);
  const [isProductModal, setIsProductModal] = useState(false);

  useEffect(() => {
    dispatch(setProductsAC(getAllproducts()));
  }, []);

  const closeDetails = () => {
    dispatch(deleteOrderAC());
  }

  const openOrderModalHandler = () => {
    setIsOrderModal(true);
  }

  const openProductModalHandler = () => {
    setIsProductModal(true);
  }

  const closeModalHandler = () => {
    setIsOrderModal(false);
    setIsProductModal(false);
    closeDetails();
    dispatch(setOrdersAC(getAllOrders()));
  }

  const removeProductHandler = (productId: number) => {
    removeProduct(productId);
    dispatch(removeProductAC(productId));
  }

  return (
    <div className="orders">
      <div className="orders-title">
        <img
          src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/04-512.png"
          className="add-icon"
          onClick={openOrderModalHandler}
          alt="Add orders"
        />

        <h1>Orders / {ordersCount}</h1>
      </div>

      {isOrderModal && (
        <>
          <BackDrop onClick={closeModalHandler} />
          <AddOrderModal onClose={closeModalHandler} />
        </>
      )}

      {isProductModal && !!selectedOrder && (
        <>
          <BackDrop onClick={closeModalHandler} />
          <AddProductModal onClose={closeModalHandler} orderId={selectedOrder.id} />
        </>
      )}

      <div className="orders-content">
        <OrderList />

        {!!selectedOrder && (
          <div className="order_info">
            <h2>{selectedOrder.name}</h2>

            <p className="order_info__add">
              <img
                src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/04-512.png"
                className="add-icon"
                onClick={openProductModalHandler}
                alt="Add product"
              />

              Add product
            </p>

            <img
              src="data:image/png;base64,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"
              className="close"
              onClick={closeDetails}
              alt="close"
            />

            {!products.length && (
              <p className="text-center">
                This order does not have products yet.
              </p>
            )}

            {!!products.length && products.map(product => (
              <div className="product" key={product.id}>
                <div className="product_img"></div>

                <p className="product_title">
                  {product.name}
                </p>

                <div className={classNames('product_status', {
                  'text-success': product.status === 'Free',
                  'text-danger': product.status === 'Repair'
                })}>
                  {product.status}
                </div>

                <img
                  src="https://cdn-icons-png.flaticon.com/512/542/542724.png"
                  className="remove_icon"
                  onClick={() => removeProductHandler(product.id)}
                  alt="Remove icon"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
