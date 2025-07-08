import { createContext, useEffect, useState, useContext } from "react";
import { UserAuth } from "./AuthContext";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const BackEndContext = createContext();

export const BackEndContextProvider = ({ children }) => {
    const session = UserAuth();
    const userId = session.session?.user?.id;

    const [portfolio, setPortfolio] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [transactions, setTransactions] = useState([]);


    const fetchPortfolio = async () => {
        const res = await fetch(`${BACKEND_BASE_URL}/api/portfolio/${userId}`);
        const data = await res.json();
        console.log(data)
        setPortfolio(data);
    };

    const fetchWatchlist = async () => {
        const res = await fetch(`${BACKEND_BASE_URL}/api/watchlist/${userId}`);
        const data = await res.json();
        setWatchlist(data);
    };

    const fetchTransactions = async () => {
        const res = await fetch(`${BACKEND_BASE_URL}/api/transactions/${userId}`);
        const data = await res.json();
        setTransactions(data);
    };

    useEffect(() => {
        if (!userId) {
            return;
        }
        fetchPortfolio();
        fetchWatchlist();
        fetchTransactions();
    }, [session]);

    return (
        <BackEndContext.Provider
            value={{
                userId,
                portfolio,
                watchlist,
                transactions,
                fetchTransactions,
                fetchPortfolio,
                fetchWatchlist,
            }}
        >
            {children}
        </BackEndContext.Provider>
    );
};

export const useBackendAttributes = () => {
    return useContext(BackEndContext);
};
