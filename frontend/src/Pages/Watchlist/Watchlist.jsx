import React from 'react';
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext";
import { useBackendAttributes } from '../../context/BackEndContext.jsx';
import { useContext } from 'react';
import { Table, TableRow, TableBody } from "../../Components/ui/table.jsx"
import { ScrollArea } from "../../Components/ui/scroll-area.jsx"
import { useNavigate } from 'react-router-dom';
import TickerBox from '../../Components/TickerBox/TickerBox.jsx';

export default function WatchList() {
    const { watchlist } = useBackendAttributes()
    const { coinApiData, websocketData } = useContext(webFetchedContext)
    const navigate = useNavigate()

    // map out all symbols in watchlist in an array and then compare to the symbols in coinapi
    const watchlistSymbols = watchlist.map((entry) => entry.symbol.toLowerCase())
    const matchingCoins = coinApiData.filter((coin) => {
        return watchlistSymbols.includes(coin.symbol.toLowerCase());
    });

    return (
        <div>
            <h1 className='text-xl font-semibold mb-2 text-center'>Watchlist Of Tickers</h1>
            <ScrollArea className="h-[600px] rounded-md border p-4 h-screen overflow-y-scroll">
                <Table className="border-4 border-black">
                    <TableBody>
                        {matchingCoins.length === 0 ? (
                            <tr>
                                <td colSpan={1} className="text-center p-4 text-black">
                                    No cryptos in your watchlist yet. Start adding your favorite coins to keep track of them!
                                </td>
                            </tr>
                        ) : (
                            matchingCoins.map((coin) => {
                                const websocketPrice = websocketData[coin.id.toLowerCase()]
                                return (
                                    <TableRow
                                        key={coin.id}
                                        className="cursor-pointer hover:bg-blue-400 transition-colors"
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
                        )}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    )
}