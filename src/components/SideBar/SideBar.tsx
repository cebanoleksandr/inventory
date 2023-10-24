import React from 'react';
import { NavLink } from 'react-router-dom';
import { setQuery } from '../../redux/filterReduser';
import { useAppDispatch } from '../../redux/hooks';
import './SideBar.scss';

export const SideBar = () => {
  const dispatch = useAppDispatch();

  const getLinkClass = ({ isActive }: { isActive: boolean }): string => isActive
    ? 'nav__link active'
    : 'nav__link';

  return (
    <div className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink
            to="/"
            className={getLinkClass}
            onClick={() => dispatch(setQuery(''))}
          >
            Orders
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink
            to="/products"
            className={getLinkClass}
            onClick={() => dispatch(setQuery(''))}
          >
            Products
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink
            to="/contacts"
            className={getLinkClass}
          >
            Contacts
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
