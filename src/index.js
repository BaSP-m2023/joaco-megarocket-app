import './index.css';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './Redux/store';
import Layout from 'routes';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import { BrowserRouter } from 'react-router-dom';
import Chatai from 'Components/Chatai';
import 'tailwindcss/tailwind.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Layout />
        <Chatai />
        <Footer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
