import { createBrowserRouter } from "react-router-dom";
import Signup from "../../Pages/Signup/Signup";
import Login from "../../Pages/Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import App from "../../App";


export const router = createBrowserRouter([

    {path: "/", element: <App/>},
    {path: "/signup", element: <Signup />},
    {path: "/login", element: <Login />},
    {path: "/dashboard", element: <Dashboard />},
])