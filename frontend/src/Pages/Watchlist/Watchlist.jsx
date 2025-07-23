import React, { useContext } from 'react';
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext";
import { useBackendAttributes } from '../../context/BackEndContext.jsx';
import { Table, TableRow, TableBody, TableCell } from "../../Components/ui/table.jsx";
import { ScrollArea } from "../../Components/ui/scroll-area.jsx";
import { useNavigate } from 'react-router-dom';
import TickerBox from '../../Components/TickerBox/TickerBox.jsx';

export default function WatchList() {
    const { watchlist } = useBackendAttributes();
    const { coinApiData, websocketData } = useContext(webFetchedContext);
    const navigate = useNavigate();

    const watchlistSymbols = watchlist.map((entry) => entry.symbol.toLowerCase());
    const matchingCoins = coinApiData.filter((coin) =>
        watchlistSymbols.includes(coin.symbol.toLowerCase())
    );

    return (
        <div>
            <h1 className="text-xl font-semibold mb-4 mt-4 text-center text-white">Watchlist Of Tickers</h1>
            <ScrollArea className="h-[600px] rounded-md border border-gray-700 p-4 overflow-y-scroll bg-gray-900">
                <Table className="min-w-full border border-gray-700 text-white">
                    {/* Optional Table Header */}
                    <thead>
                    </thead>
                    <TableBody>
                        {matchingCoins.length === 0 ? (
                            <TableRow key="empty">
                                <TableCell colSpan={4} className="text-center p-4 text-gray-400">
                                    No cryptos in your watchlist yet. Start adding your favorite coins to keep track of them!
                                </TableCell>
                            </TableRow>
                        ) : (
                            matchingCoins.map((coin) => {
                                const websocketPrice = websocketData[coin.id.toLowerCase()];
                                return (
                                    <TableRow
                                        key={coin.id}
                                        className="cursor-pointer hover:bg-yellow-600 transition-colors"
                                        onClick={() => navigate(`/assetview/${coin.id.toLowerCase()}`)}
                                    >
                                        <TickerBox
                                            className="border border-gray-600 rounded-md p-2"
                                            coinData={coin}
                                            livePrice={websocketPrice}
                                        />
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    );
}