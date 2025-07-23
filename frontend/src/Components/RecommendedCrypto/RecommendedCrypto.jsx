import { useBackendAttributes } from "../../context/BackEndContext";
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext";
import { useContext } from 'react';
import CryptoCard from "./CryptoCard";

// return a list of cryptos w their symbols and updating prices
export default function RecommendedCrypto() {
    const { websocketData, coinApiData } = useContext(webFetchedContext)
    const { recommendations } = useBackendAttributes()

    const cryptosToShow = (recommendations && recommendations.length > 0)
        ? recommendations
        : coinApiData.slice(0, 4).map(coin => ({ symbol: coin.symbol }))

    const recommendedCryptos = cryptosToShow.map((rec) => {
        const coinData = coinApiData.find(c => c.symbol.toLowerCase() === rec.symbol.toLowerCase())
        if (!coinData) return null
        const liveData = websocketData[coinData.id.toLowerCase()]
        return {
            coinData: { ...coinData },
            livePrice: liveData
        }
    }).filter(item => item !== null)

    return (
        <div className="p-4 bg-[#1c1c1e] rounded-xl shadow-lg w-full max-w-md h-[500px]">
            <h2 className="text-xl font-bold text-white mb-4">Recommended Cryptos</h2>
            <div className="space-y-4 overflow-y-auto h-[420px] pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-500 transition-colors duration-200">
                {recommendedCryptos.length === 0 ? (
                    <p className="text-center text-gray-400 mt-20">
                        No recommended cryptos available, add crypto to your watchlist!
                    </p>
                ) : (
                    recommendedCryptos.map(({ coinData, livePrice }) => (
                        <CryptoCard key={coinData.id} coinData={coinData} livePrice={livePrice} />
                    ))
                )}
            </div>
        </div>
    )
}