import React, { useEffect } from 'react';
import { getAllproducts } from '../../api/products';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setProductsAC } from '../../redux/productsReducer';
import { getFilteredProducts } from '../../utils/helpers';
import { ProductItem } from '../ProductItem/ProductItem';
import './ProductList.scss';

type Props = {
  selectedType: string;
}

export const ProductList: React.FC<Props> = ({ selectedType }) => {
  const products = useAppSelector(state => state.products.products);
  const ordersQuery = useAppSelector(state => state.filter.query);
  const preparedProducts = getFilteredProducts(products, ordersQuery, selectedType);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setProductsAC(getAllproducts()));
  }, []);

  return (
    <div className="product-list">
      {preparedProducts.map(product => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
}
