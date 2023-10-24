import React from 'react';
import { Link } from 'react-router-dom';
import { setQuery } from '../../redux/filterReduser';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { TopMenu } from '../TopMenu/TopMenu';
import './Header.scss';

export const Header = () => {
  const ordersQuery = useAppSelector(state => state.filter.query);
  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <Link to="/">
        <img 
          src="https://cdn11.bigcommerce.com/s-10c6f/images/stencil/1280x1280/products/69005/131327/FS25314__28360.1629213153.jpg?c=2"
          className="favicon"
          alt="Inventory" 
        />
      </Link>

      <div>
        <input
          type="text"
          placeholder="Search..."
          value={ordersQuery}
          onChange={e => dispatch(setQuery(e.target.value))}
        />
      </div>

      <TopMenu />
    </header>
  );
}
