
// pulling market tickers from json file - getting top 30 coins right now, will change when doing this in react with simple imports 
// put everything in the fetch clause because websocket may not load before thing is fetched
//WORKS
function fetchPrices(){
    let urlToBinance
    fetch('./tickers.json')
        .then(response => response.json())
        .then(data => {
            const baseUrl = 'wss://fstream.binance.com/stream?streams='
            const tickers = data.tickers
            const urlToBinance = baseUrl + tickers.join('/')  // structure for websocket stream is the baseUrl plus the ticker and conversion with a slash
            const socket = new WebSocket(urlToBinance); // @markPrice runs every second
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log(data)
                if (data.stream === 'btcusdt@trade') {
                    const priceElement = document.getElementById('price');
                    priceElement.innerText = `BTC/USDT Price: ${data.data.p}`;
                }
            };

            socket.onping = () => {
                socket.send('pong');
            };

            socket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            socket.onclose = () => {
                console.log('WebSocket connection closed');
            };
        })
        .catch(error =>{
            console.error("error fetching live prices")
        })
}

