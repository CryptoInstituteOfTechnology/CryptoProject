import { useState, useEffect, useRef } from 'react'
import { TableCell, TableRow } from '../ui/table'
import { useNavigate } from 'react-router-dom'

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

    //future function for adding to watchlist
    const addToWatchlist = (e) => {
        console.log(`added ${dataStreamed.s} to watch list`)
    }

    //function to open a modal to trade stocks
    const openModal = (e) =>{
        console.log("modal openeed")
    }
    return (
        <TableRow className="border-4 border-black hover:bg-gray-100 transition-colors">
            <TableCell className="p-4">
                <img src={coinData.image} alt={coinData.symbol} className="w-12 h-auto" />
            </TableCell>
            <TableCell className="text-lg font-bold">{coinData.symbol.toUpperCase()}</TableCell>
            <TableCell className={`${priceColor} text-lg font-bold`}>$ {livePrice}</TableCell>
            <TableCell className="text-sm">Volume: {coinData.total_volume}</TableCell>
            <TableCell className="text-sm">High: {coinData.high_24h}</TableCell>
            <TableCell className="text-sm">Low: {coinData.low_24h}</TableCell>
            <TableCell>
                <button
                    onClick={addToWatchlist}
                    className="flex items-center gap-1 bg-yellow-200 hover:bg-yellow-400 transition duration-300 ease-in-out rounded-lg py-2 px-4"
                >
                    <h2 className="text-lg font-bold">Add to Watchlist</h2>
                    <h2 className="text-yellow-600 text-2xl">★</h2>
                </button>
            </TableCell>
            <TableCell className="text-right">
                <button
                    className="bg-yellow-200 hover:bg-yellow-400 rounded-lg transition duration-300 ease-in-out py-2 px-4"
                    type="submit"
                >
                    Add to Portfolio
                </button>
            </TableCell>
        </TableRow>
    );
}