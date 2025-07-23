import { useBackendAttributes } from "../../context/BackEndContext";
import { useNavigate } from 'react-router-dom';

export default function Stats() {
    const { historicProfit } = useBackendAttributes();
    const navigate = useNavigate();

    const profitValue = historicProfit?.profit ?? 0;

    if (profitValue === 0) {
        return (
            <div className="stats shadow bg-white rounded-lg border border-gray-200 mt-4 flex flex-col justify-center items-center w-72 h-40 mx-auto p-4 text-center">
                <h2 className="stat-title text-lg font-bold mb-2">
                    Historical Realized Profit and Loss
                </h2>
                <p className="text-gray-600 mb-4">
                    No realized profit yet. Start trading to see your profits here.
                </p>
                <button
                    onClick={() => navigate('/alltickers')}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded"
                >
                    Make a Trade
                </button>
            </div>
        );
    }

    return (
        <div className="stats shadow bg-white rounded-lg border border-gray-200 mt-4 flex justify-center items-center w-72 h-40 mx-auto">
            <div className="stat text-center">
                <h2 className="stat-title text-lg font-bold mb-2">
                    Historical Realized Profit and Loss
                </h2>
                <p className={`font-bold text-4xl ${profitValue < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ${profitValue.toLocaleString('en-US')}
                </p>
            </div>
        </div>
    );
}