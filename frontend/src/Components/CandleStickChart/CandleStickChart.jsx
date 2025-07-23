import { useEffect, useState } from "react";
import CoinLineChart from "./CoinLineChart";
export default function CandleStickChart({ coinId }) {
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        async function fetchChartData() {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
            );
            const json = await res.json();
            const formatted = json.prices.map(([timestamp, price]) => ({
                timestamp: new Date(timestamp).toLocaleDateString(),
                price: Number(price.toFixed(2)),
            }));
            setChartData(formatted);
        }
        fetchChartData();
    }, [coinId]);
    return (
        <div className="w-full max-w-3xl mx-auto mt-6 p-6 bg-black rounded-xl shadow-md border border-yellow-400">
            <h2 className="text-white text-lg font-bold mb-2">{coinId.toUpperCase()} (7d)</h2>
            <CoinLineChart data={chartData} />
        </div>
    );
}

