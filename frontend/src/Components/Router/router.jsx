import { createBrowserRouter } from "react-router-dom";
import Signup from "../../Pages/Signup/Signup";
import Login from "../../Pages/Login/Login";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import App from "../../App";
import PrivateRoute from "../PrivateRoute/PrivateRoute"
import AssetView from "../../Pages/AssetView/AssetView"
import AllTickers from "../../Pages/AllTickers/AllTickers"
import News from "../../Pages/News/News"
import Portfolio from "../../Pages/Portfolio/Portfolio"
import Recommendations from "../../Pages/Recommendations/Recommendations"
import WatchList from "../../Pages/Watchlist/Watchlist"
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";


// had to do this because of routing issues, wasnt able to load nav bar with links without wrapping it like this in router
const Layout = () => (
    <>
        <NavBar />
        <Outlet />
        <Footer />
    </>
);


export const router = createBrowserRouter([
    {
        element: <Layout />,  // NavBar + Footer + Outlet
        children: [
            { path: "/", element: <App /> },
            { path: "/signup", element: <Signup /> },
            { path: "/login", element: <Login /> },

            // Protected routes
            { path: "/dashboard", element: <PrivateRoute><Dashboard /></PrivateRoute> },
            { path: "/alltickers", element: <PrivateRoute><AllTickers /></PrivateRoute> },
            { path: "/assetview", element: <PrivateRoute><AssetView /></PrivateRoute> },
            { path: "/news", element: <PrivateRoute><News /></PrivateRoute> },
            { path: "/watchlist", element: <PrivateRoute><WatchList /></PrivateRoute> },
            { path: "/portfolio", element: <PrivateRoute><Portfolio /></PrivateRoute> },
            { path: "/recommendations", element: <PrivateRoute><Recommendations /></PrivateRoute> },
        ],
    },
]);
