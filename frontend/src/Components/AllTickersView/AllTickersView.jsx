import TickerBox from '../TickerBox/TickerBox.jsx'
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext";
import { useContext } from 'react';
import { Table, TableRow, TableCaption, TableBody } from "../ui/table"
const AllTickersView = () => {


    const { coinApiData, websocketData } = useContext(webFetchedContext) // get the data
    //map the price to the coindata using the map key from webfetched context, pass it down as
    return (
        <Table>
            <TableCaption>All Crypto Assets</TableCaption>
            <TableBody>
                {coinApiData.map((coin) => {
                    const websocketPrice = websocketData[coin.id.toLowerCase()]
                    return (

                        <TableRow>

                            <TickerBox
                                key={coin.id}
                                coinData={coin}
                                livePrice={websocketPrice}
                            />

                        </TableRow>
                    )
                })

                }
            </TableBody>

        </Table>
    )
}

export default AllTickersView;