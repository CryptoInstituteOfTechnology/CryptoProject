import React from 'react';
import { useParams } from 'react-router-dom';
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext";
import { useContext } from 'react';
import { useState, useRef, useEffect } from 'react';
import AddToPortfolio from '../../Components/AddToPortfolio/AddToPortfolio';
import AddToWatchList from '../../Components/AddToWatchList/AddToWatchList';
import RelatedNews from '../../Components/RelatedNews/RelatedNews';
import RecommendedCrypto from '../../Components/RecommendedCrypto/RecommendedCrypto';
import CandlestickChart from '../../Components/CandleStickChart/CandleStickChart';

export default function AssetView() {
    const { coinApiData, websocketData } = useContext(webFetchedContext)
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

    if (!coin) {
        return (
            <div className="text-red-500">
                Asset Not Found for: ${symbol}
            </div>
        )
    }
    return (
        <div className="max-w-screen-xl mx-auto px-6 py-8 text-white">
            <div className="mb-8 flex items-center  gap-4 space-x-6">
                <div>
                    <img
                        src={coin.image}
                        alt={coin.symbol}
                        className="w-75 h-75 object-contain rounded-xl border-2 border-gray-600"
                    />
                    <h1 className="text-3xl font-bold">
                        {coin.name} ({coin.symbol.toUpperCase()})
                    </h1>
                    <p className={`text-2xl mt-2 ${priceColor}`}>
                        Live: {Number(livePrice).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 2,
                        })}
                    </p>
                </div>
                <CandlestickChart coinId={coin.id} />
                <RecommendedCrypto />
            </div>

            <div className="mb-6 flex gap-4 items-center">
                <AddToWatchList coinData={coin} />
                <AddToPortfolio coinData={coin} livePrice={livePrice} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                <div>Current Price: {coin.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                <div>Market Cap: {coin.market_cap.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                <div>Market Cap Rank: {coin.market_cap_rank}</div>
                <div>Valuation: {coin.fully_diluted_valuation.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                <div>Total Daily Volume: {coin.total_volume.toLocaleString()}</div>
                <div>High of Day: {coin.high_24h.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                <div>Low of Day: {coin.low_24h.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                <div>Daily Price Change: {coin.price_change_24h.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                <div>Price Change Percentage: {coin.price_change_percentage_24h.toFixed(2)}%</div>
                <div>24 Hour Market Cap Change: {coin.market_cap_change_24h.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                <div>24 Hour Market Cap Change Percentage: {coin.market_cap_change_percentage_24h.toFixed(2)}%</div>
                <div>Circulating Supply: {coin.circulating_supply.toLocaleString()}</div>
                <div>Total Supply: {coin.total_supply ? coin.total_supply.toLocaleString() : 'N/A'}</div>
                <div>Max Supply: {coin.max_supply ? coin.max_supply.toLocaleString() : 'N/A'}</div>
                <div>All Time High: {coin.ath.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                <div>All Time High Change Percentage: {coin.ath_change_percentage.toFixed(2)}%</div>
                <div>All Time High Date: {new Date(coin.ath_date).toLocaleDateString()}</div>
                <div>All Time Low: {coin.atl.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                <div>All Time Low Change Percentage: {coin.atl_change_percentage.toFixed(2)}%</div>
                <div>All Time Low Date: {new Date(coin.atl_date).toLocaleDateString()}</div>
            </div>

            <RelatedNews />
        </div>
    )
}