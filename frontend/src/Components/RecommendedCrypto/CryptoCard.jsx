import { useState, useEffect, useRef } from 'react'
import AddToWatchList from '../AddToWatchList/AddToWatchList'
import AddToPortfolio from '../AddToPortfolio/AddToPortfolio'
import { Card } from '../ui/card'

export default function CryptoCard({ coinData, livePrice }) {
    const [priceColor, setPriceColor] = useState('text-white')
    const previousPrice = useRef(null)

    useEffect(() => {
        if (previousPrice.current == null) {
            previousPrice.current = livePrice
            return
        }
        if (livePrice > previousPrice.current) {
            setPriceColor('text-green-500')
        } else if (livePrice < previousPrice.current) {
            setPriceColor('text-red-500')
        } else {
            setPriceColor('text-gray-300')
        }
        previousPrice.current = livePrice
    }, [livePrice])

    if (!coinData) {
        return null
    }

    // Format price with commas and 2 decimals
    

    return (
        <Card
            className="flex justify-between items-center p-4 bg-[#2a2a2a] rounded-xl shadow-md w-full
                    hover:shadow-lg hover:bg-[#3a3a3a] transition-shadow duration-300"
        >
            <div className="flex items-center gap-4">
                <img src={coinData.image} alt={coinData.symbol} className="w-10 h-auto rounded-full" />
                <div>
                    <p className="text-white font-bold text-lg">{coinData.symbol.toUpperCase()}</p>
                    <p className={`${priceColor} font-semibold`}>{livePrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <AddToWatchList coinData={coinData} />
                <AddToPortfolio coinData={coinData} livePrice={livePrice} />
            </div>
        </Card>
    )
}