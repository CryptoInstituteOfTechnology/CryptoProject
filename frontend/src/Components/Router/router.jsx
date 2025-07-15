import { createBrowserRouter } from "react-router-dom";
import React, { lazy } from "react";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { cn } from '@/lib/utils'
import { Outlet } from "react-router-dom";

const Layout = () => (
    <>
        <NavBar />
        <Outlet />
        <Footer />
    </>
);

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
//takes one second to load page artifically
const lazyWithDelay = (importFunc) => {
    return lazy(() =>
        delay(1000).then(() => importFunc())
    );
};
// lazy components for loading
const Signup = lazyWithDelay(() => import("../../Pages/Signup/Signup"));
const Login = lazyWithDelay(() => import("../../Pages/Login/Login"));
const Dashboard = lazyWithDelay(() => import("../../Pages/Dashboard/Dashboard"));
const App = lazyWithDelay(() => import("../../App"));
const AssetView = lazyWithDelay(() => import("../../Pages/AssetView/AssetView"));
const AllTickers = lazyWithDelay(() => import("../../Pages/AllTickers/AllTickers"));
const News = lazyWithDelay(() => import("../../Pages/News/News"));
const Portfolio = lazyWithDelay(() => import("../../Pages/Portfolio/Portfolio"));
const Recommendations = lazyWithDelay(() => import("../../Pages/Recommendations/Recommendations"));
const WatchList = lazyWithDelay(() => import("../../Pages/Watchlist/Watchlist"));

// ui for loading
export const LoadingSpinner = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="400"
            height="400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("animate-spin", className)}
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    )
}



export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: (
                    <React.Suspense
                        fallback={
                            <div className="flex flex-col justify-center items-center h-screen text-xl space-y-4">
                                Loading... <LoadingSpinner className="w-12 h-12" />
                            </div>
                        }
                    >
                        <App />
                    </React.Suspense>
                ),
            },
            {
                path: "/signup",
                element: (
                    <React.Suspense
                        fallback={
                            <div className="flex flex-col justify-center items-center h-screen text-xl space-y-4">
                                Loading... <LoadingSpinner className="w-12 h-12" />
                            </div>
                        }
                    >
                        <Signup />
                    </React.Suspense>
                ),
            },
            {
                path: "/login",
                element: (
                    <React.Suspense
                        fallback={
                            <div className="flex flex-col justify-center items-center h-screen text-xl space-y-4">
                                Loading... <LoadingSpinner className="w-12 h-12" />
                            </div>
                        }
                    >
                        <Login />
                    </React.Suspense>
                ),
            },
            // Protected routes
            {
                path: "/dashboard",
                element: (
                    <PrivateRoute>
                        <React.Suspense
                            fallback={
                                <div className="flex flex-col justify-center items-center h-screen text-xl space-y-4">
                                    Loading... <LoadingSpinner className="w-12 h-12" />
                                </div>
                            }
                        >
                            <Dashboard />
                        </React.Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/alltickers",
                element: (
                    <PrivateRoute>
                        <React.Suspense
                            fallback={
                                <div className="flex flex-col justify-center items-center h-screen text-xl space-y-4">
                                    Loading... <LoadingSpinner className="w-12 h-12" />
                                </div>
                            }
                        >
                            <AllTickers />
                        </React.Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/assetview/:symbol",
                element: (
                    <PrivateRoute>
                        <React.Suspense
                            fallback={
                                <div className="flex flex-col justify-center items-center h-screen text-xl space-y-4">
                                    Loading... <LoadingSpinner className="w-12 h-12" />
                                </div>
                            }
                        >
                            <AssetView />
                        </React.Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/news",
                element: (
                    <PrivateRoute>
                        <React.Suspense
                            fallback={
                                <div className="flex flex-col justify-center items-center h-screen text-xl space-y-4">
                                    Loading... <LoadingSpinner className="w-12 h-12" />
                                </div>
                            }
                        >
                            <News />
                        </React.Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/watchlist",
                element: (
                    <PrivateRoute>
                        <React.Suspense
                            fallback={
                                <div className="flex flex-col justify-center items-center h-screen text-xl space-y-4">
                                    Loading... <LoadingSpinner className="w-12 h-12" />
                                </div>
                            }
                        >
                            <WatchList />
                        </React.Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/portfolio",
                element: (
                    <PrivateRoute>
                        <React.Suspense
                            fallback={
                                <div className="flex flex-col justify-center items-center h-screen text-xl space-y-4">
                                    Loading... <LoadingSpinner className="w-12 h-12" />
                                </div>
                            }
                        >
                            <Portfolio />
                        </React.Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/recommendations",
                element: (
                    <PrivateRoute>
                        <React.Suspense
                            fallback={
                                <div className="flex flex-col justify-center items-center h-screen text-xl space-y-4">
                                    Loading... <LoadingSpinner className="w-12 h-12" />
                                </div>
                            }
                        >
                            <Recommendations />
                        </React.Suspense>
                    </PrivateRoute>
                ),
            },
        ],
    },
]);