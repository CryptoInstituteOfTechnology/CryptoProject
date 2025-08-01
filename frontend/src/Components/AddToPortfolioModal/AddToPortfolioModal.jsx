import { useState, useRef, useEffect } from "react"
import { useBackendAttributes } from "../../context/BackEndContext"

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL

export default function AddToPortfolioModal({ coinData, livePrice, onExit }) {
    const { userId, portfolio, fetchPortfolio, fetchTransactions, fetchHistoricProfits, profile } = useBackendAttributes()

    // Find the current quantity of item in portfolio
    const currentQuantity = portfolio.find((entry) =>
        entry.symbol.toLowerCase() === coinData.symbol.toLowerCase()
    )?.quantity

    // Store quantity as a string to allow editing input freely
    const [quantity, setQuantity] = useState("0")
    const [mode, setMode] = useState("buy")
    const [priceColor, setPriceColor] = useState('text-white')
    const [errMessage, setErrMessage] = useState(null)
    const previousPrice = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const transactionData = createTransactionData();
            await makeApiCall(transactionData);
            await fetchPortfolio();
            await fetchTransactions();
            await fetchHistoricProfits();
            onExit();
        } catch (error) {
            displayErrorMessage(error.message);
        }
    };

    const createTransactionData = () => {
        const type = mode.toUpperCase();
        const parsedQuantity = Number(quantity);
        return {
            userId,
            symbol: coinData.symbol.toUpperCase(),
            quantity: parsedQuantity,
            price: livePrice,
            type,
        };
    };

    const makeApiCall = async (transactionData) => {
        const res = await fetch(`${BACKEND_BASE_URL}/api/transactions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transactionData),
        });

        if (!res.ok) {
            // Try to parse JSON error response
            let errorMessage = 'Unknown error';
            try {
                const errorData = await res.json();
                if (errorData.error) {
                    errorMessage = errorData.error;
                }
            } catch {
                // If parsing fails, fallback to text
                errorMessage = await res.text();
            }
            throw new Error(errorMessage);
        }

        return res.json();
    };

    const displayErrorMessage = (error) => {
        setErrMessage(error)
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
            setPriceColor('text-white')
        }
        previousPrice.current = livePrice
    }, [livePrice])

    const parsedPrice = Number(livePrice);
    const parsedQuantity = Number(quantity);
    const displayPrice = !isNaN(parsedPrice) ? parsedPrice.toFixed(4) : "N/A";
    const totalCost = !isNaN(parsedPrice * parsedQuantity) ? (parsedPrice * parsedQuantity) : "N/A";
    const buyingPower = profile.buyingPower

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center" onClick={onExit}>
            <div className="bg-zinc-600 text-white w-full max-w-md p-6 rounded-lg" onClick={(e) => e.stopPropagation()}>
                {/* Crypto Info Div */}
                <div className="flex flex-col items-center mb-6">
                    <img src={coinData.image} alt={coinData.symbol} className="w-12 h-auto" />
                    <h1 className="text-3xl font-bold">{coinData.symbol.toUpperCase()}</h1>
                    <p className={`text-2xl mt-2 ${priceColor}`}>
                        Live: ${displayPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </p>
                </div>
                {/* input form for buying and selling */}
                <form onSubmit={handleSubmit}>
                    {/* Buy and Sell buttons */}
                    <div className="flex gap-4 mb-6">
                        <button
                            type="button"
                            onClick={() => setMode('buy')}
                            className={`px-4 py-2 ${mode === 'buy' ? 'bg-green-500' : 'bg-gray-200'} text-black rounded`}
                        >
                            Buy
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode('sell')}
                            className={`px-4 py-2 ${mode === 'sell' ? 'bg-red-500' : 'bg-gray-200'} text-black rounded`}
                        >
                            Sell
                        </button>
                        {errMessage && <span className="text-red-500">{errMessage}</span>}
                    </div>
                    {/* Quantity Input and Total Cost */}
                    <input
                        type="number"
                        min="0"
                        step="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full p-2 mb-6 border border-gray-300 rounded"
                    />
                    <p className="text-2xl mb-6">Total: {totalCost?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                    <p className="text-2xl mb-6">Buying Power {buyingPower?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                    {/* Submit Button and Cancel Button */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={onExit}
                            className="px-4 py-2 bg-gray-200 text-black rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-white rounded text-black"
                        >
                            {mode === 'buy' ? 'Confirm Buy' : 'Confirm Sell'}
                        </button>
                        <span>
                            Current Quantity : {currentQuantity || 0}
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}