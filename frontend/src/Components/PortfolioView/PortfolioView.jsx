import { useBackendAttributes } from "../../context/BackEndContext";
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext";
import { useContext } from 'react';
import { Table, TableRow, TableCaption, TableBody } from "../ui/table";
import { ScrollArea } from "../ui/scroll-area.jsx";
import { useNavigate } from 'react-router-dom';
import PortfolioBox from '../PortfolioBox/PortfolioBox.jsx';
import ProfitLossbox from "../ProfitLossBox/ProfitLossBox.jsx";

export default function PortfolioView() {
    const { coinApiData, websocketData } = useContext(webFetchedContext)
    const navigate = useNavigate()
    const { portfolio } = useBackendAttributes()

    //symbols in portfolio to display
    const portfolioSymbols = portfolio.map((entry) => entry.symbol.toLowerCase())
    // symbols 
    const matchingCoins = coinApiData.filter((coin) => {
        return portfolioSymbols.includes(coin.symbol.toLowerCase());
    });
    return (
        <div className="flex  justify-center flex-col ">
            <h1>Portfolio Of Tickers</h1>
            <ProfitLossbox/>
            <ScrollArea className="h-[600px]  rounded-md border p-4 h-screen overflow-y-scroll">
                <Table className="border-4 border-black">
                    <TableBody>
                        {matchingCoins.map((coin) => {
                            const websocketPrice = websocketData[coin.id.toLowerCase()]
                            // average price of coin in portfolio
                            const averagePrice = portfolio.find((entry) => {
                                return entry.symbol.toLowerCase() === coin.symbol.toLowerCase()
                            })?.avgPrice
                            //quantity
                            const currentQuantity = portfolio.find((entry) => {
                                return entry.symbol.toLowerCase() === coin.symbol.toLowerCase()
                            })?.quantity
                            return (
                                <TableRow
                                    key={coin.id}
                                    className="cursor-pointer hover:bg-gray-100 transitiom-colors"
                                    onClick={() => navigate(`/assetview/${coin.id.toLowerCase()}`)} // takes user to cryptoview when clicked
                                >
                                    <PortfolioBox
                                        className="border-4 border-black hover:bg-gray-100 transition-colors"
                                        coinData={coin}
                                        livePrice={websocketPrice}
                                        avgPrice={averagePrice}
                                        quantity={currentQuantity}
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