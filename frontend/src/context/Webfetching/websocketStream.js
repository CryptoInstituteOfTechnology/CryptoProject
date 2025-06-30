
// pulling market tickers from json file - getting top 30 coins right now, will change when doing this in react with simple imports 
// put everything in the fetch clause because websocket may not load before thing is fetched
//WORKS

//have to have  a callback to return to webfetchcontext
// can optimize to not have socket open when called on
// websocketstream.js

let socket = null;

export default function fetchPrices(dataCallback) {
    //socket is already open, don't open again, fixes unmounting
    if (socket && socket.readyState !== WebSocket.CLOSED) {
        console.log("WebSocket already open or connecting");
        return () => { }; // return empty cleanup function
    }

    fetch('/tickers.json')
        .then(response => response.json())
        .then(data => {
            const baseUrl = 'wss://fstream.binance.com/stream?streams=';
            const tickers = data.tickers; 
            const urlToBinance = baseUrl + tickers.join('/');

            socket = new WebSocket(urlToBinance);

            socket.onmessage = (event) => {
                const parsed = JSON.parse(event.data);
                console.log(parsed)
                dataCallback(parsed);
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

