import { useState, useRef, useEffect } from "react"
export default function AddToPortfolioModal({ coinData, livePrice, onExit }) {
    const [quantity, setQuantity] = useState("0")
    const [mode, setMode] = useState("buy")
    const [priceColor, setPriceColor] = useState('text-white')
    const previousPrice = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        const totalCost = livePrice * Number(quantity)
        if (mode === "buy") {
            console.log(`buying ${quantity} of ${coinData.symbol}`)
        } else {
            console.log(`selling ${quantity} of ${coinData.symbol}`)
        }

        onExit() // close modal after submitting
    }


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


    // need a box wit buy or sell option, quantity, then send order and have a live order and price symbol and name, and then basic modal stuff and  atotal button
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
            onClick={onExit}>
            <div
                className="bg-zinv-900 text-white w-full max-w-d p-6 rounded-lg"
                onClick={(e) => e.stopPropagation()}
            >
                {/*Crypto Info Div */}
                <div>
                    <img src={coinData.image} alt={coinData.symbol} className="w-12 h-auto" />
                    <h1 className="text-3x font-bold"> ({coinData.symbol.toUpperCase()})</h1>
                    <p className={`text-2xl mt-2 ${priceColor}`}>Live: {livePrice}</p>
                </div>
                {/*input form for buying and selling */}
                <form onSubmit={handleSubmit}>
                    {/*Buy and Sell buttons */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => setMode('buy')}
                            className={` px-4 ${mode === 'buy' ? 'bg-green-500' : 'bg-gray-200'}`}
                        >
                            Buy
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode('sell')}
                            className={` px-4 ${mode === 'sell' ? 'bg-red-500' : 'bg-gray-200'}`}
                        >
                            Sell
                        </button>
                    </div>


                    {/* Quantity Input and Total Cost*/}
                    <input
                        type="number"
                        min="0"
                        ste="1" // only can buy integer amounts for cryptos on this Website
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(e.target.value)
                        }
                    />

                    {/* Total Cost*/}
                    <p>
                        Total ${livePrice * Number(quantity)}
                    </p>



                    {/*Submit Button and Cancel Button */}
                    <div>
                        <button
                            type="button"
                            onClick={onExit}
                        >
                            Cancel
                        </button>
                        <button
                            type = "submit"
                        >
                            ${mode === 'buy' ? 'Confirm Buy' : 'Confirm Sell'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}