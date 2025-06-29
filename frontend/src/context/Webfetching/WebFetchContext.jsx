import { createContext, useState, useEffect } from "react";
import CoinNames from "./data/coinNames.json"
import fetchPrices from "./websocketStream"
import { apiCaching } from "./apiCaching"; // function that uses local storage and refetches on a certain time base


const webFetchedContext = createContext()//global object for data we can use across compoenents
const COIN_GECKO_API_KEY = import.meta.env.VITE_COIN_GECKO_MARKET_DATA_API_KEY; //api key to coingeck
const NEWS_API_KEY = import.meta.env.VITE_NEWS_DATA_NEWS_API_KEY; // api key to news


// url logic to coin website, have a json file wiht coinnames to build url
const baseUrlCoinGecko = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids='
const coins = CoinNames
const urlToCoinData = baseUrlCoinGecko + coins.ids.join('%2C') // json file of all cryptos, match then up for url, because we return we have to replace the old ones



//

// stream coinprices live using website
// use local storage for coinmetadata and news api, we dont need to fetch them everytime so store on users browser and update once a day

export default WebFetchContextProvider = ({ children }) => {


    const [coinApiData, setCoinApiData] = useState([])
    const [newsApiData, setNewsApiData] = useState([])
    const [websocketData, setWebsocketData] = useState([]) // have to look how this comes in prod, may have to handle diff




    //fetches new coin data every hour and uses local storage, have 10k api calls ax
    const fetchCoinData = async () => {
        const data = await useCachedAPI({


        })


        if (data) {
            setCoinApiData(data)
        }
    };


    //fetches new news every day, only have 200 api calls a month
    const fetchNewsData = async () => {
        const data = await useCachedAPI({

        })


        if (data) {
            setNewsApiData(data)
        }
    };



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





