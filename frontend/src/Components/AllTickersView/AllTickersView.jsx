import TickerBox from '../TickerBox/TickerBox.jsx'
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext";
import { useContext } from 'react';
import { Table, TableRow, TableCaption, TableBody } from "../ui/table"
import { ScrollArea } from "../ui/scroll-area.jsx"
const AllTickersView = () => {


    const { coinApiData, websocketData } = useContext(webFetchedContext) // get the data
    //map the price to the coindata using the map key from webfetched context, pass it down as
    return (
        <ScrollArea className="h-[600px]  rounded-md border p-4 h-screen overflow-y-scroll">
            <Table className="border-4 border-black">

                <TableCaption>All Crypto Assets</TableCaption>
                <TableBody>
                    {coinApiData.map((coin) => {
                        const websocketPrice = websocketData[coin.id.toLowerCase()]
                        return (
                            <TickerBox
                                key={coin.id}
                                coinData={coin}
                                livePrice={websocketPrice}
                            />


                        )
                    })

                    }
                </TableBody>

            </Table>
        </ScrollArea>
    )
}

export default AllTickersView;