import React from 'react';
import { Outlet } from 'react-router-dom';

import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { SideBar } from './components/SideBar/SideBar';

export const App = () => {
  return (
    <div className="app">
      <Header />

      <div className="container">
        <SideBar />
        <Outlet />
      </div>
      
      <Footer />
    </div>
  );
}
