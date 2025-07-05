import React from 'react';
import { useParams } from 'react-router-dom';
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext";
import { useContext } from 'react';
import { useState, useRef, useEffect } from 'react';

export default function AssetView() {
    const { coinApiData, websocketData, newsApiData } = useContext(webFetchedContext)
    const { symbol } = useParams()
    const coin = coinApiData.find(coin => coin.id.toLowerCase() === symbol.toLowerCase()) // find matching symbol in data
    const livePrice = websocketData[symbol.toLowerCase()]

    const [priceColor, setPriceColor] = useState('text-white')
    const previousPrice = useRef(null) // reference to price before new price

    // sets color of price to green if higher than prev, red if lower, white if equal
    useEffect(() => {
        if (previousPrice.current == null) {
            previousPrice.current = livePrice
            return
        }
        if (livePrice > previousPrice.current) {
            setPriceColor('text-red-600')
        } else if (livePrice < previousPrice.current) {
            setPriceColor('text-green-600')
        } else {
            setPriceColor('text-black')
        }
        previousPrice.current = livePrice
    }, [livePrice])

    const addToWatchlist = (e) => {
        console.log(`added ${dataStreamed.s} to watch list`)
    }

    const openModal = (e) => {
        console.log("modal openeed")
    }

    if (!coin) {
        return (
            <div className="text-red-500">
                Asset Not Found for: ${symbol}
            </div>
        )
    }
    return (
        <div>
            <img src={coin.image} alt={coin.symbol} className="w-12 h-auto" />
            <h1></h1>
            <h1 className={`${priceColor} text-lg font-bold`} >
                ${livePrice}
            </h1>
            <h1>{coin.current_price}</h1>
            <h1>{coin.market_cap}</h1>
            <h1>{coin.market_cap_rank}</h1>
            <h1>{coin.fully_diluted_valuation}</h1>
            <h1>{coin.total_volume}</h1>
            <h1>{coin.high_24h}</h1>
            <h1>{coin.low_24h}</h1>
            <h1>{coin.price_change_24h}</h1>
            <h1>{coin.price_change_percentage_24h}</h1>
            <h1>{coin.market_cap_change_24h}</h1>
            <h1>{coin.market_cap_change_percentage_24h}</h1>
            <h1>{coin.circulating_supply}</h1>
            <h1>{coin.total_supply}</h1>
            <h1>{coin.max_supply}</h1>
            <h1>{coin.ath}</h1>
            <h1>{coin.ath_change_percentage}</h1>
            <h1>{coin.ath_date}</h1>
            <h1>{coin.atl}</h1>
            <h1>{coin.atl_change_percentage}</h1>
            <h1>{coin.atl_date}</h1>
            <h1>{coin.roi}</h1>
            <h1>{coin.last_updated}</h1>
        </div>
    )

}