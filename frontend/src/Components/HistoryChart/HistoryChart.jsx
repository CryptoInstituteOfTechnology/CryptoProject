import { useBackendAttributes } from "../../context/BackEndContext";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Tooltip,
} from 'recharts';

export default function HistoryChart() {
    const { historicProfitPoints } = useBackendAttributes();

    if (!historicProfitPoints || historicProfitPoints.length === 0) {
        return (
            <div className="flex justify-center items-center h-72 text-gray-500 italic">
                No profit data yet. Make your first trade to see your profit history.
            </div>
        );
    }

    // Sort data by timestamp ascending
    const sortedData = [...historicProfitPoints].sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    const firstProfit = sortedData.length > 0 ? sortedData[0].profit : 0;
    const lastProfit = sortedData.length > 0 ? sortedData[sortedData.length - 1].profit : 0;
    const lineColor = lastProfit >= firstProfit ? 'green' : 'red';

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="timestamp"
                    tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
                    minTickGap={20}
                    label={{ value: 'Date', position: 'insideBottomRight', offset: -10 }}
                />
                <YAxis label={{ value: 'Profit ($)', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                    labelFormatter={(label) => new Date(label).toLocaleString()}
                    formatter={(value) => [`$${value.toFixed(2)}`, 'Profit']}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="profit"
                    stroke={lineColor}
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Profit"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}