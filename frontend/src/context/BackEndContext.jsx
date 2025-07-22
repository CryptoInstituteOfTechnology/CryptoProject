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
    const [relatedNews, setRelatedNews] = useState([])
    const [recommendations, setRecommendations] = useState([])

    const fetchRecommendations = async () => {
        const res = await fetch(`${BACKEND_BASE_URL}/api/recommendations/${userId}`);
        const data = await res.json();
        setRecommendations(data);
    }

    const fetchPortfolio = async () => {
        const res = await fetch(`${BACKEND_BASE_URL}/api/portfolio/${userId}`);
        const data = await res.json();
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

    const fetchNews = async () => {
        const res = await fetch(`${BACKEND_BASE_URL}/api/portfolionews/${userId}`);
        const data = await res.json();
        setRelatedNews(data);
    }

    useEffect(() => {
        if (!userId) {
            return;
        }
        fetchPortfolio();
        fetchWatchlist();
        fetchTransactions();
        fetchNews()
        fetchRecommendations()
    }, [session]);

    return (
        <BackEndContext.Provider
            value={{
                userId,
                portfolio,
                watchlist,
                transactions,
                relatedNews,
                recommendations,
                fetchTransactions,
                fetchPortfolio,
                fetchWatchlist,
                fetchNews,
                fetchRecommendations,
            }}
        >
            {children}
        </BackEndContext.Provider>
    );
};

export const useBackendAttributes = () => {
    return useContext(BackEndContext);
};
