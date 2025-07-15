import React from 'react';
import { useParams } from 'react-router-dom';
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext";
import { useContext } from 'react';
import { useState, useRef, useEffect } from 'react';
import AddToPortfolio from '../../Components/AddToPortfolio/AddToPortfolio';
import AddToWatchList from '../../Components/AddToWatchList/AddToWatchList';
import RelatedNews from '../../Components/RelatedNews/RelatedNews';

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
        <div className="max-w-screen-xl mx-auto px-6 py-8 text-white">

            {/*Headers for Page*/}
            <div className='mb-4 flex items-center space-x-6 mb-8'>
                <img src={coin.image} alt={coin.symbol} className="w-20 h-20 object-cointain rounded-xl border-2 border-gray-600" />
                <div>
                    <h1 className="text-3x font-bold">{coin.name} ({coin.symbol.toUpperCase()})</h1>
                    <p className={`text-2xl mt-2 ${priceColor}`}>Live: {livePrice}</p>
                </div>
            </div>

            {/*Buttons */}
            <div className="mb-6 flex gap-4 items-center">
                <AddToWatchList coinData={coin} />
                <AddToPortfolio coinData={coin} livePrice={livePrice} />
            </div>
            {/*Stats for Crypto */}

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm'>
                <h1>Current Price: ${coin.current_price}</h1>
                <h1>Market Cap: ${coin.market_cap}</h1>
                <h1>Market Cap Rank: {coin.market_cap_rank}</h1>
                <h1>Valuation: {coin.fully_diluted_valuation}</h1>
                <h1>Total Daily Volume: {coin.total_volume}</h1>
                <h1>High of Day: {coin.high_24h}</h1>
                <h1>Low of Day: {coin.low_24h}</h1>
                <h1>Daily Price Chnage: {coin.price_change_24h}</h1>
                <h1>Price Change Percentage: {coin.price_change_percentage_24h}%</h1>
                <h1>24 Hour Market Cap Change: {coin.market_cap_change_24h}</h1>
                <h1>24 Hour Market Cap Change Percentage: {coin.market_cap_change_percentage_24h}%</h1>
                <h1>Circulating Supply: {coin.circulating_supply}</h1>
                <h1>Total Supply: {coin.total_supply}</h1>
                <h1>Max Supply:{coin.max_supply}</h1>
                <h1>All Time High: {coin.ath}</h1>
                <h1>All Time High Change Percentage: {coin.ath_change_percentage}%</h1>
                <h1>All Time High Date: {coin.ath_date}</h1>
                <h1> All Time Low: {coin.atl}</h1>
                <h1>All Time Low Change Percentage: {coin.atl_change_percentage}%</h1>
                <h1>All Time Low Date:{coin.atl_date}</h1>
            </div>
            <RelatedNews/>
        </div>
    )

}