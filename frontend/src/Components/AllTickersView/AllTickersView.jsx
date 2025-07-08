import TickerBox from '../TickerBox/TickerBox.jsx'
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext";
import { useContext } from 'react';
import { Table, TableRow, TableCaption, TableBody } from "../ui/table"
import { ScrollArea } from "../ui/scroll-area.jsx"
import { useNavigate } from 'react-router-dom';

const AllTickersView = () => {
    const { coinApiData, websocketData } = useContext(webFetchedContext)
    const navigate = useNavigate()

    return (
        <ScrollArea className="h-[600px]  rounded-md border p-4 h-screen overflow-y-scroll">
            <Table className="border-4 border-black">
                <TableCaption>All Crypto Assets</TableCaption>
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
        </ScrollArea>
    )
}
export default AllTickersView;