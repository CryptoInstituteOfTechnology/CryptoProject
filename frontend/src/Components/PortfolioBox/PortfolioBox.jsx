import { useState, useEffect, useRef } from 'react'
import { TableCell, TableRow } from '../ui/table'
import AddToWatchList from '../AddToWatchList/AddToWatchList'
import AddToPortfolio from '../AddToPortfolio/AddToPortfolio'


export default function PortfolioBox({ coinData, livePrice, avgPrice, quantity }) {
    const [priceColor, setPriceColor] = useState('text-black')
    const previousPrice = useRef(null) // reference to price before new price, can also be used for P&L color
    const [profit, setProfit] = useState(null) // for Profit and loss
    const [profitColor, setProfitColor] = useState('text-black')



    // sets color of price to green if higher than prev, red if lower, white if equal
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
        setProfit((livePrice * quantity) - (avgPrice * quantity))


        if (profit > 0) {
            setProfitColor('text-green-600')
        } else if (profit < 0) {
            setProfitColor('text-red-600')
        } else {
            setProfitColor('text-black')
        }
    }, [livePrice])

    return (
        <>
            <TableCell className="p-4">
                <img src={coinData.image} alt={coinData.symbol} className="w-12 h-auto" />
            </TableCell>
            <TableCell className="text-lg font-bold text-white">{coinData.symbol.toUpperCase()}</TableCell>
            <TableCell className={`${priceColor} text-lg font-bold`}>Price: ${Number(livePrice).toFixed(4)}</TableCell>
            <TableCell className="text-sm text-white font-bold">Current Quantity: {quantity}</TableCell>
            <TableCell className="text-sm text-white font-bold">Your Average Price: ${avgPrice?.toFixed(4)}</TableCell>
            <TableCell className={`${profitColor} text-lg font-bold`}>P&L : ${profit?.toFixed(2)}</TableCell>
            <TableCell>
                <AddToWatchList
                    coinData={coinData}
                />
            </TableCell>
            <TableCell className="text-right">
                <AddToPortfolio coinData={coinData} livePrice={livePrice} />
            </TableCell>
        </>
    );
}