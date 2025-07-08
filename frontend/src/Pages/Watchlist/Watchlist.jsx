import React from 'react';
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext";
import { useBackendAttributes } from '../../context/BackEndContext.jsx';
import { useContext } from 'react';
import { Table, TableRow, TableCaption, TableBody } from "../../Components/ui/table.jsx"
import { ScrollArea } from "../../Components/ui/scroll-area.jsx"
import { useNavigate } from 'react-router-dom';
import TickerBox from '../../Components/TickerBox/TickerBox.jsx';

export default function WatchList() {
    const { watchlist } = useBackendAttributes()
    const { coinApiData, websocketData } = useContext(webFetchedContext)
    const navigate = useNavigate()

    // map out all symbols in watchlist in an array and then compare to the symbols in coinapi
    const watchlistsymbols = watchlist.map((entry) => entry.symbol.toLowerCase())
    const matchingCoins = coinApiData.filter((coin) => {
        return watchlistsymbols.includes(coin.symbol.toLowerCase());
    });
    return (
        <div>
        <h1>Watchlist Of Tickers</h1>
        <ScrollArea className="h-[600px]  rounded-md border p-4 h-screen overflow-y-scroll">
            <Table className="border-4 border-black">
                <TableBody>
                    {matchingCoins.map((coin) => {
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
        </div>
    )
}
