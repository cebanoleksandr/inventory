import React, { useState } from 'react';
import { ProductList } from '../../components/ProductList/ProductList';
import { useAppSelector } from '../../redux/hooks';
import { getUniqueTypes } from '../../utils/helpers';
import './ProductsPage.scss';

export const ProductsPage = () => {
  const productsCount = useAppSelector(state => state.products.products.length);
  const allTypes = useAppSelector(state => state.products.products).map(t => t.type);
  const types = getUniqueTypes(allTypes);
  const [selectedType, setSelectedType] = useState<string>('');

  return (
    <div className="products">
      <div className="products-title">
        <h1>Products / {productsCount}</h1>
        
        <div>
          <label htmlFor="productType">Product type:</label>
          <select
            id="productType"
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
          >
            <option value="">
              All
            </option>

            {types.map(type => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ProductList selectedType={selectedType} />
    </div>
  );
}
