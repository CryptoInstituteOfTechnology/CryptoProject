import { useBackendAttributes } from "../../context/BackEndContext";
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext";
import { useContext } from 'react';
import { Table, TableRow, TableBody } from "../ui/table";
import { useNavigate } from 'react-router-dom';
import PortfolioBox from '../PortfolioBox/PortfolioBox.jsx';
import ProfitLossbox from "../ProfitLossBox/ProfitLossBox.jsx";
import Piechart from "../PieChart/PieChart.jsx";

export default function PortfolioView({ variant = "fullscreen" }) {
    const { coinApiData, websocketData } = useContext(webFetchedContext);
    const navigate = useNavigate();
    const { portfolio } = useBackendAttributes();
    const height = variant === "dashboard" ? "h-[600px]" : "h-screen";

    const portfolioSymbols = portfolio.map((entry) => entry.symbol.toLowerCase());
    const matchingCoins = coinApiData.filter((coin) =>
        portfolioSymbols.includes(coin.symbol.toLowerCase())
    );

    return (
        <div className={`${height} bg-gray-900 w-full overflow-x-auto rounded-lg p-6 overflow-y-scroll`}>
            <h1 className="text-2xl font-bold mb-4 text-center text-yellow-400">Portfolio Of Tickers</h1>
            <div className="flex justify-center gap-8 mb-6">
                {variant === "fullscreen" && <Piechart />}
                {variant === "fullscreen" && <ProfitLossbox />}
            </div>
            <Table className="min-w-full text-sm table-auto border-collapse">
                <TableBody>
                    {matchingCoins.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="text-center p-6 text-gray-400">
                                No coins in your portfolio, add some crypto to your portfolio!
                            </td>
                        </tr>
                    ) : (
                        matchingCoins.map((coin, index) => {
                            const websocketPrice = websocketData[coin.id.toLowerCase()];
                            const portfolioEntry = portfolio.find((entry) =>
                                entry.symbol.toLowerCase() === coin.symbol.toLowerCase()
                            );
                            const averagePrice = portfolioEntry?.avgPrice;
                            const currentQuantity = portfolioEntry?.quantity;

                            return (
                                <TableRow
                                    key={coin.id}
                                    className={`cursor-pointer transition-colors ${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"} rounded-lg p-4 mb-4 shadow-md hover:bg-yellow-600 hover:text-black transition-all`}
                                    onClick={() => navigate(`/assetview/${coin.id.toLowerCase()}`)}
                                >
                                    <PortfolioBox
                                        coinData={coin}
                                        livePrice={websocketPrice}
                                        avgPrice={averagePrice}
                                        quantity={currentQuantity}
                                    />
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
}