let socket = null;
import { binancetoCoingecko } from "./binancetoCoingecko"; // mapping dict for prices
let livePrices = {} // map for mapping

export default function fetchPrices(dataCallback) {

    //socket is already open, don't open again, fixes unmounting
    if (socket && socket.readyState !== WebSocket.CLOSED) {
        console.log("WebSocket already open or connecting");
        return () => { }; // return empty cleanup function
    }

    fetch('/tickers.json')
        .then(response => response.json())
        .then(data => {
            //url to stream from
            const baseUrl = 'wss://fstream.binance.com/stream?streams=';
            const tickers = data.tickers; 
            const urlToBinance = baseUrl + tickers.join('/');
            //creates socket pulls tickers, and then matches them to the coingeckoAPIs matched tickers
            socket = new WebSocket(urlToBinance);
            socket.onmessage = (event) => {
                const parsed = JSON.parse(event.data); // turn data into JSON
                const symbol = parsed?.data?.s?.toLowerCase() // turn symbols from socket into lowercase
                const matchingCoin = binancetoCoingecko[symbol] // find matching symbol from coinGecko API
                if (matchingCoin && parsed?.data?.p ){// if we have a match and theres a price add it to the call back array

                    livePrices[matchingCoin] = parseFloat(parsed.data.p) // give coinGecko coin name the websockets price
                    dataCallback({...livePrices});
                }
            };
            socket.onping = () => {
                socket.send('pong');
            };
            socket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
            socket.onclose = (event) => {
                console.warn('WebSocket closed:', event.code, event.reason);
                
            };
        })
        .catch(error => {
            console.error("Error fetching tickers or initializing WebSocket:", error);
        });
    return () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.close();
            socket = null;
        }
    };
}

