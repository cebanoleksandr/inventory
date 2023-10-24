import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';
import { createOrder } from '../../api/orders';
import { useAppDispatch } from '../../redux/hooks';
import { addOrderAC } from '../../redux/ordersReducer';
import './AddOrderModal.scss';

type Props = {
  onClose: () => void;
}

export const AddOrderModal: React.FC<Props> = ({ onClose }) => {
  const [orderName, setOrderName] = useState('');
  const [hasError, setHasError] = useState(false);
  const dispatch = useAppDispatch();

  const createOrderHandler = () => {
    onClose();
    dispatch(addOrderAC(createOrder(orderName, [])));
  }

  const changeOrderName = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderName(e.target.value);
    setHasError(!e.target.value);
  }

  const checkInput = () => {
    if (!orderName.trim()) {
      setHasError(true);
    }
  }

  return (
    <div className="modal">
      <h2 className="text-center">Create new order</h2>

      <input
        type="text"
        className={classNames({
          'input-error': hasError
        })}
        placeholder="Order name..."
        value={orderName}
        onChange={changeOrderName}
        onBlur={checkInput}
      />

      {hasError && (
        <small className="text-danger">
          Order name is required
        </small>
      )}

      <div className="mt10">
        <button
          className="btn btn-success"
          onClick={createOrderHandler}
          disabled={!orderName.trim()}
        >Create</button>

        <button
          className="btn btn-danger"
          onClick={onClose}
        >Close</button>
      </div>
    </div>
  );
};
