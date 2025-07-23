import { useBackendAttributes } from "../../context/BackEndContext"

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL
export default function AddToWatchList({ coinData }) {
    const { watchlist, fetchWatchlist, userId } = useBackendAttributes()
    const inList = watchlist.some(
        (entry) => entry.symbol.toLowerCase() === coinData.symbol.toLowerCase()
    )

    const toggleWatchlist = async (e) => {
        e.stopPropagation()
        try {
            const res = await fetch(`${BACKEND_BASE_URL}/api/watchlist`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    symbol: coinData.symbol.toUpperCase(),
                }),
            })
            await res.json()
            await fetchWatchlist()
        } catch (error) {
            console.error(error)
        }
    }

    return (
            <button
                onClick={toggleWatchlist}
                className={`"w-full px-6 py-3 bg-yellow-200 rounded-lg transition duration-300 ease-in-out text-lg font-bold text-black"${
                    inList
                        ? "bg-red-200 hover:bg-red-400 text-black"
                        : "bg-yellow-200 hover:bg-yellow-400 text-black"
                }`}
            >
                <span>{inList ? "Remove From Watchlist" : "Add To Watchlist"}</span>
                <span className="text-yellow-600 text-2xl">
                    {inList ? "   \u2715" : "\u2605"}
                </span>
            </button>
    )
}