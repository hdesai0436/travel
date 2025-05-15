import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';

const router = createBrowserRouter([
  {element:<App/>},
  {path: "/user/signup",
    element:<Signup/>
  },
  {path: "/user/login",
    element:<Login/>
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router = {router} />
  </StrictMode>,
)
