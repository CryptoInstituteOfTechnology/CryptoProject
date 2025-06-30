
import { useState, useEffect, useRef } from 'react'
import { TableCell } from '../ui/table'


//data is passed down from each box to TickerBox


// when star is clicked, add to watchlist
// when add to portoflio clicked, call to add to portfolio
// optional amount for portfolio amonut
export default function TickerBox({ coinData, livePrice }) {

    //need a last price variable so you can turn red or green later
    //qauantity variable as well
    const [quantity, setQuantity] = useState(0)
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

    //have to have logic to check if in watchlist alrready



    // //function called addtoPortoflio, makes api call to add to portfolio thing on backend
    const addToPortfolio = (e) => {
        console.log(`just bought ${dataStreamed.s} at ${dataStreamed.p} with ${quantity} dshares!`)
        //     //add to portfolio in tuple way (Name, Price)
    }
    // //need logic to check if in portfolio alr and if it is add more shares



    return (
        <div className="ticker-container">
            <TableCell>
                <img src= {coinData.image} alt = {coinData.symbol}  style={{ width: '50px', height: 'auto' }} />
            </TableCell>

            <TableCell>{coinData.symbol.toUpperCase()}</TableCell>
            <TableCell className={priceColor}> {livePrice}</TableCell>

            <TableCell>Volume:{coinData.total_volume}</TableCell>
            <TableCell>High: {coinData.high_24h}</TableCell>
            <TableCell>Low: {coinData.low_24h}</TableCell>
            <TableCell>
                <button onClick={addToWatchlist}> Add to Watchlist</button>
            </TableCell>
            <TableCell>
                <form onSubmit={addToPortfolio}>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(event) => setQuantity(event.target.valueAsNumber)} // Check that is a postiive number 
                        placeholder="Enter quantity"
                    />
                    <button type="submit">Add to Portfolio</button>
                </form>
            </TableCell>
        </div>
    )
}