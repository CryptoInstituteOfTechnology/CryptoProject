import { createContext, useState, useEffect } from "react";
import CoinNames from "./coinNames.json"
import fetchPrices from "./websocketStream"

const webFetchedContext = createContext()


const COIN_GECKO_API_KEY = import.meta.env.VITE_COIN_GECKO_MARKET_DATA_API_KEY;
const NEWS_API_KEY = import.meta.env.VITE_NEWS_DATA_NEWS_API_KEY;
const baseUrlCoinGecko = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids='
const coins = CoinNames
const urlToCoinData = baseUrlCoinGecko + coins.ids.join('%2C') // json file of all cryptos, match then up for url





export default WebFetchContextProvider = ({ children }) => {
    const [coinApiData, setCoinApiData] = useState({})
    const [newsApiData, setNewsApiData] = useState({})
    const [websocketData, setwebsocketData] = useState({})





    const fetchCoinData = async () => {
        try {
            const response = await fetch(
                urlToCoinData,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`error ${response.status}`);
            }

            const data = await response.json(); // wait for data payload
            setCoinApiData(data) //set coindata

        } catch (error) {
            console.error('Fetch error:', error); // error throw
        }
    };

    const fetchNewsData = async () => {
        try{

        }catch(error){
            
        }
    }


    //run when called upon, webstream is constant so doesnt matter
    //since i do a callback on my websocket it runs every time
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




