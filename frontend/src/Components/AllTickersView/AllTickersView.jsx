import TickerBox from '../TickerBox/TickerBox.jsx'
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext";
import { useContext } from 'react';
import { Table, TableRow, TableCaption, TableBody } from "../ui/table"
import { ScrollArea } from "../ui/scroll-area.jsx"
import { useNavigate } from 'react-router-dom';

const AllTickersView = ({ variant = "fullscreen" }) => {
    const { coinApiData, websocketData } = useContext(webFetchedContext)
    const navigate = useNavigate()
    const height = variant === "dashboard" ? "h-[600px]" : "h-screen" // set to 300px or full screen depedning on where it is

    return (
        <div className={`${height} w-full overflow-x-auto rounded-md border p-4 overflow-y-scroll`}>
            <h1 className="text-xl font-semibold mb-2">All Crypto Assets</h1>
            <Table className="border-4 border-black">
                <TableBody>
                    {coinApiData.map((coin) => {
                        const websocketPrice = websocketData[coin.id.toLowerCase()]
                        return (

                            <TableRow
                                key={coin.id}
                                className="cursor-pointer hover:bg-gray-100 transitiom-colors"
                                onClick={() => navigate(`/assetview/${coin.id.toLowerCase()}`)} // takes user to cryptoview when clicked
                            >
                                <TickerBox
                                    className="border-4 border-black hover:bg-gray-100 transition-colors"
                                    coinData={coin}
                                    livePrice={websocketPrice}
                                />
                            </TableRow>
                        )
                    })
                    }
                </TableBody>
            </Table>
        </div>
    )
}
export default AllTickersView;