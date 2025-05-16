import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Header from './components/Header.jsx';
import Trip from './create-trip/Trip.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
  },

  {path: "/user/signup",
    element:<Signup/>
  },
  {path: "/user/login",
    element:<Login/>
  },
  {path: "/create-trip/",
    element:<Trip/>
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header/>
   <RouterProvider router = {router} />
  </StrictMode>,
)
