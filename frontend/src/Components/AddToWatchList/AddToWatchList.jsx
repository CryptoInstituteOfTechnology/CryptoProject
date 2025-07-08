import { useBackendAttributes } from "../../context/BackEndContext"

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL
export default function AddToWatchList({ coinData }) {
    const { watchlist, fetchWatchlist, userId } = useBackendAttributes()

    //variable check for in watchlist

    const inList = watchlist.some((entry) => {
        return entry.symbol.toLowerCase() === coinData.symbol.toLowerCase()
    })
    


    //toggle watchlist function

    const toggleWatchlist = async (e) => {
        e.stopPropagation()
        try {
            const res = await fetch(`${BACKEND_BASE_URL}/api/watchlist`, {

                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId,
                    symbol: coinData.symbol.toUpperCase(),
                }),
            })


            const result = await res.json()
            await fetchWatchlist() // refetch watchlist to update
        } catch (error) {
            console.error(error)
        }


    }



    return (
        <div className="flex flex-col gap-2">
            <button
                onClick={toggleWatchlist}
                className={
                    `flex items-center gap-1  transition duration-300 ease-in-out rounded-lg py-2 px-4
                    ${inList
                        ? "bg-red-200 hover:bg-red-400"
                        : "bg-yellow-200 hover:bg-yellow-400"}
                    `}
            >
                <span className="text-lg font-bold">
                    {inList
                        ? "Remove From Watchlist"
                        : "Add To Watchlist"
                    }
                </span>
                <span className="text-yellow-600 text-2xl">
                    {inList ? "\u2715" : "\u2605"}
                </span>
            </button>
        </div>
    )
}