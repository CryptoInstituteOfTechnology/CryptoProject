
export default function AddToWatchList({ coinData }) {

    const addToWatchlist = (e) => {
        console.log(`added ${coinData.symbol} to watch list`)
    }

    

    return (
        <div className="flex flex-col gap-2">
            <button
                onClick={addToWatchlist}
                className="flex items-center gap-1 bg-yellow-200 hover:bg-yellow-400 transition duration-300 ease-in-out rounded-lg py-2 px-4"
            >
                <span className="text-lg font-bold">Add to Watchlist</span>
                <span className="text-yellow-600 text-2xl">★</span>
            </button>
        </div>
    )
}