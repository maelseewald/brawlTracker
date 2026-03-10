import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import StartPage from './pages/overview/StartPage.tsx';
import axiosSetup from './utils/axiosSetup.ts';

axiosSetup();

const router = createBrowserRouter([
  {
    path: '/',
    element: <StartPage/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
  ,
);
