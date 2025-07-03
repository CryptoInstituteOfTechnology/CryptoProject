import { createContext, useState, useEffect } from "react";
import CoinNames from "./coinNames.json"
import fetchPrices from "./websocketStream"
import { apiCaching } from "./apiCaching";

const webFetchedContext = createContext()//global object for data 
const COIN_GECKO_API_KEY = import.meta.env.VITE_COIN_GECKO_MARKET_DATA_API_KEY;
const NEWS_API_KEY = import.meta.env.VITE_COINDESK_NEWS_API_KEY

const newsUrl = `https://data-api.coindesk.com/news/v1/article/list?lang=EN&limit=50&api_key=${NEWS_API_KEY}`
const baseUrlCoinGecko = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids='
const coins = CoinNames
const urlToCoinData = baseUrlCoinGecko + coins.ids.join('%2C') // json file of all cryptos, match then up for url to fetch all coins
const HOURS = 1000 * 60 * 60

const WebFetchContextProvider = ({ children }) => {
    const [coinApiData, setCoinApiData] = useState([])
    const [newsApiData, setNewsApiData] = useState([])
    const [websocketData, setWebsocketData] = useState([])

    //fetches new coin data every hour and uses local storage
    const fetchCoinData = async () => {
        const data = await apiCaching({
            url: urlToCoinData,
            timeBeforeNextFetch: HOURS,
            cachingKey: "cachedCoinData",
            methodToFetch: {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'x-cg-demo-api-key': COIN_GECKO_API_KEY,
                },
            }
        })
        if (data) {
            setCoinApiData(data)
        }
    };
    //fetches new news every day
    const fetchNewsData = async () => {
        const data = await apiCaching({
            url: newsUrl,
            timeBeforeNextFetch: HOURS * 24,
            cachingKey: "cachedCoinDeskNewsData",
            methodToFetch: {
                method: 'GET',
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        })
        if (data) {
            setNewsApiData(data)
        }
    };
    
    useEffect(() => {
        fetchCoinData()
        fetchNewsData()
        const cleanup = fetchPrices((liveData) => {
            setWebsocketData(liveData);
        });
        return () => {
            if (cleanup) cleanup(); //closes websocket if needed
        };
    }, []);
    return (
        // make data global to all componenets
        <webFetchedContext.Provider value={{ coinApiData, websocketData, newsApiData }}>
            {children}
        </webFetchedContext.Provider>
    )
}
export { webFetchedContext }
export default WebFetchContextProvider


