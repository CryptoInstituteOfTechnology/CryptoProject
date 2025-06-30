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
            {coinApiData.map((coin) => {
                const websocketPrice = websocketData[coin.id.toLowerCase()]
                return (

                    <TableRow>
                        <TableBody>
                            <TickerBox
                                key={coin.id}
                                coinData={coin}
                                livePrice={websocketPrice}
                            />
                        </TableBody>
                    </TableRow>
                )
            })

            }

        </Table>
    )
}

export default AllTickersView;