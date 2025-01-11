import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import CustomCoinContext from './context/context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
   <CustomCoinContext>
   <App/>
   </CustomCoinContext>
   </BrowserRouter>
  </React.StrictMode>
);

