import { useState, useEffect, useRef } from 'react'
import { TableCell, TableRow } from '../ui/table'
import AddToWatchList from '../AddToWatchList/AddToWatchList'
import AddToPortfolio from '../AddToPortfolio/AddToPortfolio'

export default function TickerBox({ coinData, livePrice }) {
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

    return (
        <TableRow className="border-4 border-black hover:bg-gray-100 transition-colors">
            <TableCell className="p-4">
                <img src={coinData.image} alt={coinData.symbol} className="w-12 h-auto" />
            </TableCell>
            <TableCell className="text-lg font-bold">{coinData.symbol.toUpperCase()}</TableCell>
            <TableCell className={`${priceColor} text-lg font-bold`}>$ {livePrice.toFixed(4)}</TableCell>
            <TableCell className="text-sm">Volume: {coinData.total_volume}</TableCell>
            <TableCell className="text-sm">High: {coinData.high_24h}</TableCell>
            <TableCell className="text-sm">Low: {coinData.low_24h}</TableCell>
            <TableCell>
                <AddToWatchList
                    coinData={coinData}
                />
            </TableCell>
            <TableCell className="text-right">
                <AddToPortfolio coinData={coinData}/>
            </TableCell>
        </TableRow>
    );
}