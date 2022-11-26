import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './components/Router';
import Navbar from './components/NavBar';
import Home from './components/Home'
// import BreweryDetailsHome from './components/breweries/BreweryDetails'
// import ReadDB from './components/data/ReadDB'
// import DopDown from './components/Layout'
// import Login from './components/users/Login'
// import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/store/store'
// import Home from './components/breweries/ChoiseByCities'

/*
    <Provider store={store}>
      <BrowserRouter>
        <Router />
        <ReadDB />
        <App />
      </BrowserRouter>
    </Provider>

*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Router />
        <Navbar />
        <Home />
      </BrowserRouter>
    </Provider>
  </React.StrictMode >
);
