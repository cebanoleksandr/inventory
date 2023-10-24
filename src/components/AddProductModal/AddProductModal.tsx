import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';
import { pushProductId } from '../../api/orders';
import { createProduct } from '../../api/products';
import { useAppDispatch } from '../../redux/hooks';
import { addProductAC } from '../../redux/productsReducer';
import { Product } from '../../utils/types';
import './AddProductModal.scss';

type Props = {
  onClose: () => void;
  orderId: number;
}

export const AddProductModal: React.FC<Props> = ({ onClose, orderId }) => {
  const [productName, setProductName] = useState('');
  const [type, setType] = useState('');
  const [age, setAge] = useState('New');
  const [status, setStatus] = useState('Free');
  const [price, setPrice] = useState('');

  const [hasNameError, setHasNameError] = useState(false);
  const [hasTypeError, setHasTypeError] = useState(false);
  const [hasPriceError, setHasPriceError] = useState(false);

  const dispatch = useAppDispatch();

  const changeProductName = (e: ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
    setHasNameError(!e.target.value);
  }

  const nameBlur = () => {
    if (!productName.trim()) {
      setHasNameError(true);
    }
  }

  const changeType = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
    setHasTypeError(!e.target.value);
  }

  const typeBlur = () => {
    if (!type.trim()) {
      setHasTypeError(true);
    }
  }

  const changePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const pattern = /^\d+\.?\d?\d?$/;

    if (!pattern.test(e.target.value)) {
      return;
    }

    setPrice(e.target.value);
    setHasPriceError(!e.target.value);
  }

  const priceBlur = () => {
    if (!type.trim()) {
      setHasTypeError(true);
    }
  }

  const createProductHandler = () => {
    const newProduct: Omit<Omit<Product, 'id'>, 'warranty_date'> = {
      name: productName,
      type,
      order_id: orderId,
      status,
      age,
      price: +price
    }

    const createdProduct = createProduct(newProduct);

    pushProductId(orderId, createdProduct.id);
    onClose();
    dispatch(addProductAC(createdProduct));
  }

  return (
    <div className="modal">
      <h2 className="text-center">Create new product</h2>

      <input
        type="text"
        className={classNames('mb10', {
          'input-error': hasNameError
        })}
        value={productName}
        onChange={changeProductName}
        onBlur={nameBlur}
        placeholder="Product title..."
      />

      {hasNameError && (
        <small className="text-danger mb10">
          Product title is required
        </small>
      )}

      <input
        type="text"
        className={classNames('mb10', {
          'input-error': hasTypeError
        })}
        value={type}
        onChange={changeType}
        onBlur={typeBlur}
        placeholder="Product type..."
      />

      {hasTypeError && (
        <small className="text-danger mb10">
          Product type is required
        </small>
      )}

      <input
        type="text"
        className={classNames('mb10', {
          'input-error': hasPriceError
        })}
        value={price}
        onChange={changePrice}
        onBlur={priceBlur}
        placeholder="Price..."
      />

      {hasPriceError && (
        <small className="text-danger mb10">
          Price is required
        </small>
      )}

      <label htmlFor="productStatus">Product status: </label>
      <select
        id="productStatus"
        className="mb10"
        value={status}
        onChange={e => setStatus(e.target.value)}
      >
        <option value="Free">Free</option>
        <option value="Repair">Repair</option>
      </select>

      <label htmlFor="productAge">How old?: </label>
      <select
        id="productAge"
        value={age}
        onChange={e => setAge(e.target.value)}
      >
        <option value="New">New</option>
        <option value="Used">Used</option>
      </select>

      <div className="mt10">
        <button
          className="btn btn-success"
          onClick={createProductHandler}
          disabled={!productName.trim() || !type.trim() || !price.trim()}
        >Create</button>

        <button
          className="btn btn-danger"
          onClick={onClose}
        >Close</button>
      </div>
    </div>
  );
};
