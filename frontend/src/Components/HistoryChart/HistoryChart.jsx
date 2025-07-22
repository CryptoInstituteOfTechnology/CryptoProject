import { useContext } from 'react';
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
    console.log(historicProfitPoints)
    // Sort data by timestamp ascending
    const sortedData = [...historicProfitPoints].sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    // Determine overall trend: compare last profit to first profit
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
                />
                <YAxis />
                <Tooltip
                    labelFormatter={(label) => new Date(label).toLocaleString()}
                    formatter={(value) => [`$${value.toFixed(2)}`, 'Profit']}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="profit"
                    stroke={lineColor}
                    strokeWidth={5}
                    dot={{ r: 6 }}         // normal point radius
                    activeDot={{ r: 10 }}
                    name="Profit"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}