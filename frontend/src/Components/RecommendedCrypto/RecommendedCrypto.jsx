import { useBackendAttributes } from "../../context/BackEndContext";
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext";
import { useContext } from 'react';
import CryptoCard from "./CryptoCard";

// return a list of cryptos w their symbols and updating prices
export default function RecommendedCrypto() {
    const { websocketData, coinApiData } = useContext(webFetchedContext)
    const { recommendations } = useBackendAttributes()
    
    const recommendedCryptos = recommendations.map((rec) => {
        const coinData = coinApiData.find(c => c.symbol.toLowerCase() == rec.symbol.toLowerCase())
        const liveData = websocketData[coinData.id.toLowerCase()]
        return {
            coinData: { ...coinData },
            livePrice: liveData
        }
    }).filter(item => item.coinData)

    return (
        <div className="p-4 bg-[#1c1c1e] rounded-xl shadow w-full max-w-md h-[500px]">
            <h2 className="text-xl font-bold text-white mb-4">Recommended Cryptos</h2>
            <div className="space-y-4 overflow-y-auto h-[420px] pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                {recommendedCryptos.map(({coinData, livePrice}) => {
                    return <CryptoCard key={coinData.id} coinData={coinData} livePrice={livePrice} />
                })}
            </div>
        </div>
    )
}