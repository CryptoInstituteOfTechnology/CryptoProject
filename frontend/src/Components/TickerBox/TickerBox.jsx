
import { useState, useEffect, useRef } from 'react'
import { TableCell, TableRow } from '../ui/table'


//data is passed down from each box to TickerBox


// when star is clicked, add to watchlist
// when add to portoflio clicked, call to add to portfolio
// optional amount for portfolio amonut
export default function TickerBox({ coinData, livePrice }) {

    //need a last price variable so you can turn red or green later
    //qauantity variable as well
   
    const [priceColor, setPriceColor] = useState('text-white') // track what color text will be
    const previousPrice = useRef(null) // useref so we dont lost the value when reloaded

    //use useeffect to set previous price, when live price changes

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
            setPriceColor('text-black') // if they are equal, very unlikely
        }

        previousPrice.current = livePrice

    }, [livePrice])
    //function called add to watchlist, makes API call to backend to add to wathclist
    const addToWatchlist = (e) => {
        console.log(`added ${dataStreamed.s} to watch list`)
        //     //api call to add
    }

    //function to open a modal to trade stocks



    return (
        <TableRow className = "border-4 border-black">
            <TableCell>
                <img src= {coinData.image} alt = {coinData.symbol}  style={{ width: '50px', height: 'auto' }} />
            </TableCell>

            <TableCell>{coinData.symbol.toUpperCase()}</TableCell>
            <TableCell className={priceColor}> {livePrice}</TableCell>

            <TableCell>Volume:{coinData.total_volume}</TableCell>
            <TableCell>High: {coinData.high_24h}</TableCell>
            <TableCell>Low: {coinData.low_24h}</TableCell>
            <TableCell>
                <button onClick={addToWatchlist} className='flex items-center gap-1 hover:bg-yellow-300  transition duration-300 ease-in-out rounded-lg'> 
                    <h2>Add to Watchlist </h2>
                    <h2 className="text-yellow-600">★</h2>
                </button>
            </TableCell>
            <TableCell className="text-right">         
                    <button className='hover:bg-yellow-300 rounded-lg transition duration-300 ease-in-out' type="submit">Add to Portfolio</button>
            </TableCell>
        </TableRow>
    )
}