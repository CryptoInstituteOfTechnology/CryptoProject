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
            setPriceColor('text-green-600')
        } else if (livePrice < previousPrice.current) {
            setPriceColor('text-red-600')
        } else {
            setPriceColor('text-black')
        }
        previousPrice.current = livePrice
    }, [livePrice])


    if (!coinData) {
        return null
    }

    return (
        <Card className= "flex justify-between items-center p-4 bg-[#2a2a2a] rounded-xl shadow w-full">
            <div className='flex items-center gap-4'>
                <img src={coinData.image} alt={coinData.symbol} className='w-10 h-auto' />
                <div>
                    <p className='text-white font-bold text-lg'>{coinData.symbol.toUpperCase()}</p>
                    <p className={`${priceColor} font-semibold`}>Price: ${Number(livePrice).toFixed(2)}</p>
                </div>
            </div>
            <div className='flex gap-2 items-center'>
                <AddToWatchList coinData={coinData} />
                <AddToPortfolio coinData={coinData} />
            </div>
        </Card>
    )
}