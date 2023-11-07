import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import ErrorPage from './components/error/ErrorPage';
import Layout from './components/Layout/Layout';
import App from './components/App/App';
import CurrentWeather from './components/currentWeather/CurrentWeather';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <App />
      </Layout>
    ),    
  },
  {
    path: 'currentWeather',
    element: (
      <Layout>
        <CurrentWeather/>
      </Layout>
    ),
  },
  {
    path: '*',
    element: (      
      <ErrorPage />      
    ),
  },
  {
    path: 'errorpage',
    element: (      
      <ErrorPage />      
    ),
  },
]);
root.render(<RouterProvider router={router} />);
