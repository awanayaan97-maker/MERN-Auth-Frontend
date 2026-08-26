
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './Pages/Signup.jsx'
import Login from './Pages/Login.jsx'
import OTPVerification from './Pages/OTPVerification.jsx'
import ForgotPassword from './Pages/ForgotPassword.jsx'
import Dashboard from './Pages/Dashboard.jsx'

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Signup/>
  },

  {
    path: "/login",
    element: <Login/>
  },

  {
    path: "/verification",
    element: <OTPVerification/>
  },

  {
    path: "/forget-password",
    element: <ForgotPassword/>
  },

  {
    path: "/dashboard",
    element: <Dashboard/>
  }


])

createRoot(document.getElementById('root')).render(
  
  <RouterProvider router={router}/>

    // <App />
 
)
