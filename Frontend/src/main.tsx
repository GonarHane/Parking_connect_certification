import React from 'react'
/* import ReactDOM from 'react-dom/client' */
import App from './App.tsx'
import './index.css'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements,} from "react-router-dom";
import Login from './Components/login/login.tsx';
import Dashboard from './Components/dashboard/dashboard.tsx';

/* ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
); */
const router = createBrowserRouter(
  createRoutesFromElements(
   
      <><Route path="/dashboard" element={<Dashboard />}></Route>
      <Route index element={<Login />}></Route><Route path="*" element={<div>Not found</div>} /></>
    
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);