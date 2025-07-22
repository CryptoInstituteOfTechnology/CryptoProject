import { useBackendAttributes } from "../../context/BackEndContext";



export default function Stats() {
    const { historicProfit } = useBackendAttributes();
    console.log(historicProfit)
    // Extract profit value safely, fallback to 0 if undefined
    const profitValue = historicProfit.profit

    return (
        <div
            className="stats shadow bg-white rounded-lg border border-gray-200 mt-4 flex justify-center items-center w-72 h-40 mx-auto"
        >
            <div className="stat text-center">
                <h2 className="stat-title text-lg font-bold mb-2">
                    Historical Realized Profit and Loss
                </h2>
                <p
                    className={`font-bold text-4xl ${profitValue < 0 ? 'text-red-600' : 'text-green-600'
                        }`}
                >
                    ${(profitValue ?? 0).toLocaleString('en-US')}
                </p>
            </div>
        </div>
    );
}