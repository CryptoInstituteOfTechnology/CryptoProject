import { createBrowserRouter } from "react-router-dom";
import React, { lazy } from "react";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => (
    <>
        <NavBar />
        <Outlet />
        <Footer />
    </>
);

// Lazy load route components
const Signup = lazy(() => import("../../Pages/Signup/Signup"));
const Login = lazy(() => import("../../Pages/Login/Login"));
const Dashboard = lazy(() => import("../../Pages/Dashboard/Dashboard"));
const App = lazy(() => import("../../App"));
const AssetView = lazy(() => import("../../Pages/AssetView/AssetView"));
const AllTickers = lazy(() => import("../../Pages/AllTickers/AllTickers"));
const News = lazy(() => import("../../Pages/News/News"));
const Portfolio = lazy(() => import("../../Pages/Portfolio/Portfolio"));
const Recommendations = lazy(() => import("../../Pages/Recommendations/Recommendations"));
const WatchList = lazy(() => import("../../Pages/Watchlist/Watchlist"));

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: "/", element: <React.Suspense fallback={<div>Loading...</div>}><App /></React.Suspense> },
            { path: "/signup", element: <React.Suspense fallback={<div>Loading...</div>}><Signup /></React.Suspense> },
            { path: "/login", element: <React.Suspense fallback={<div>Loading...</div>}><Login /></React.Suspense> },
            // Protected routes
            { path: "/dashboard", element: <PrivateRoute><React.Suspense fallback={<div>Loading...</div>}><Dashboard /></React.Suspense></PrivateRoute> },
            { path: "/alltickers", element: <PrivateRoute><React.Suspense fallback={<div>Loading...</div>}><AllTickers /></React.Suspense></PrivateRoute> },
            { path: "/assetview/:symbol", element: <PrivateRoute><React.Suspense fallback={<div>Loading...</div>}><AssetView /></React.Suspense></PrivateRoute> },
            { path: "/news", element: <PrivateRoute><React.Suspense fallback={<div>Loading...</div>}><News /></React.Suspense></PrivateRoute> },
            { path: "/watchlist", element: <PrivateRoute><React.Suspense fallback={<div>Loading...</div>}><WatchList /></React.Suspense></PrivateRoute> },
            { path: "/portfolio", element: <PrivateRoute><React.Suspense fallback={<div>Loading...</div>}><Portfolio /></React.Suspense></PrivateRoute> },
            { path: "/recommendations", element: <PrivateRoute><React.Suspense fallback={<div>Loading...</div>}><Recommendations /></React.Suspense></PrivateRoute> },
        ],
    },
]);