import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';
import { OrdersPage } from './pages/OrdersPage/OrdersPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ContactsPage } from './pages/ContactsPage/ContactsPage';

export const Root: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<OrdersPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="contacts" element={<ContactsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </HashRouter>
);
