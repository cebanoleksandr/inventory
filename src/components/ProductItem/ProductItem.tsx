import classNames from 'classnames';
import React from 'react';
import { removeProduct } from '../../api/products';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { removeProductAC } from '../../redux/productsReducer';
import { Product } from '../../utils/types';
import './ProductItem.scss';

type Props = {
  product: Product
}

export const ProductItem: React.FC<Props> = ({ product }) => {
  const order = useAppSelector(state => state.odrers.orders.find(o => o.id === product.order_id));
  const dispatch = useAppDispatch();

  const removeProductHandler = () => {
    removeProduct(product.id);
    dispatch(removeProductAC(product.id));
  }

  return (
    <div className="product-item">
      <div className="product-img"></div>

      <p className="product-title">{product.name}</p>

      <div className={classNames('product-status', {
        'text-success': product.status === 'Free',
        'text-danger': product.status === 'Repair'
      })}>
        {product.status}
      </div>

      <div className="product-date">
        {product.warranty_date}
      </div>

      <div className={classNames('product-age', {
        'text-success': product.age === 'New',
        'text-primary': product.age === 'Used'
      })}>
        {product.age}
      </div>

      <div className="product-price">
        {product.price}
      </div>

      <div className="product-order-title">
        {order?.name}
      </div>

      <img
        src="https://cdn-icons-png.flaticon.com/512/542/542724.png"
        className="remove-icon"
        onClick={removeProductHandler}
        alt="Remove icon"
      />
    </div>
  );
}

