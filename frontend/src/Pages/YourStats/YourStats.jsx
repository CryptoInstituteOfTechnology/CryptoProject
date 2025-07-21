import HistoryChart from "../../Components/HistoryChart/HistoryChart";
import Stats from "../../Components/Stats/Stats";



export default function YourStats() {
    return (
        <div className="flex flex-col space-y-4 justify-center">
            <Stats />
            <HistoryChart />
        </div>
    )
}