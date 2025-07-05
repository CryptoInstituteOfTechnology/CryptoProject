import TickerBox from '../TickerBox/TickerBox.jsx'
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext";
import { useContext } from 'react';
import { Table, TableRow, TableCaption, TableBody } from "../ui/table"
import { ScrollArea } from "../ui/scroll-area.jsx"
const AllTickersView = () => {
    const { coinApiData, websocketData } = useContext(webFetchedContext) 

    const navigate = useNavigate // routing for CryptoView

    return (
        <ScrollArea className="h-[600px]  rounded-md border p-4 h-screen overflow-y-scroll">
            <Table className="border-4 border-black">
                <TableCaption>All Crypto Assets</TableCaption>
                <TableBody>
                    {coinApiData.map((coin) => {
                        const websocketPrice = websocketData[coin.id.toLowerCase()]
                        return (

                            <div
                                key = {coin.id}
                                className = "cursor-pointer hover:bg-gray-100 transitiom-colors"
                                onClick={() => navigate(`/assetview/${coin.id.toLowerCase()}`)} // takes user to cryptoview when clicked
                            >


                            <TickerBox
                                
                                coinData={coin}
                                livePrice={websocketPrice}
                            />
                            </div>


                        )
                    })
                    }
                </TableBody>
            </Table>
        </ScrollArea>
    )
}
export default AllTickersView;