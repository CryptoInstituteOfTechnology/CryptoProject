import TickerBox from '../TickerBox/TickerBox.jsx'
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext";
import { useContext } from 'react';
import { Table, TableRow, TableCaption, TableBody } from "../ui/table"
import { ScrollArea } from "../ui/scroll-area.jsx"
import { useNavigate } from 'react-router-dom';

const AllTickersView = ({ variant = "fullscreen" }) => {
    const { coinApiData, websocketData } = useContext(webFetchedContext)
    const navigate = useNavigate()
    const height = variant === "dashboard" ? "h-[600px]" : "h-screen"

    return (
        <div className={`${height} bg-gray-900 w-full overflow-x-auto rounded-lg border border-gray-700 p-6 overflow-y-scroll`}>
            <h1 className="text-2xl font-bold mb-4 text-center text-yellow-400">All Crypto Assets</h1>
            <Table className="min-w-full text-sm table-auto border-collapse">
                <TableBody>
                    {coinApiData.map((coin, index) => {
                        const websocketPrice = websocketData[coin.id.toLowerCase()]
                        return (
                            <TableRow
                                key={coin.id}
                                className={`cursor-pointer transition-colors ${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                                    } hover:bg-yellow-600 hover:text-black rounded-md`}
                                onClick={() => navigate(`/assetview/${coin.id.toLowerCase()}`)}
                            >
                                <TickerBox
                                    className="p-3 border border-gray-600 rounded-md"
                                    coinData={coin}
                                    livePrice={websocketPrice}
                                />
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}
export default AllTickersView;