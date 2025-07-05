import React from 'react';
import { useParams } from 'react-router-dom';
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext";
import { useContext } from 'react';


export default function AssetView() {
    const { coinApiData, websocketData } = useContext(webFetchedContext)
    const { symbol } = useParams()
    const coin = coinApiData.find(coin => coin.id.toLowerCase() === symbol.toLowerCase()) // find matching symbol in data
    const livePrice = websocketData[symbol.toLowerCase()]

    if (!coin) {
        return (
            <div className="text-red-500">
                Asset Not Found for: ${symbol}
            </div>
        )
    }
    return (
        <div>
            <h1>
                {livePrice}
            </h1>
        </div>
    )

}