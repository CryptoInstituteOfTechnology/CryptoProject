import TickerBox from '../TickerBox/TickerBox.jsx'
import {webFetchedContext} from "../../context/Webfetching/WebFetchContext";
import { useContext } from 'react';
const AllTickersView = () => {


    const { coinApiData, websocketData } = useContext(webFetchedContext) // get the data


    //map the price to the coindata using the map key from webfetched context, pass it down as
    return (
        <div>
            {coinApiData.map((coin) => {
                const websocketPrice = websocketData[coin.symbol.toLowerCase()]
                console.log(websocketPrice, coin)

                return (
                    <TickerBox>
                        key = {coin.id}
                        coinData ={coin}
                        livePrice = {websocketPrice}
                    </TickerBox>
                )
            })

            }
        </div>
    )
}

export default AllTickersView;