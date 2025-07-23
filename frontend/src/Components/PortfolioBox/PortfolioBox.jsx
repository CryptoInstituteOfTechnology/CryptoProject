import { useState, useEffect, useRef } from 'react';
import { TableCell } from '../ui/table';
import AddToWatchList from '../AddToWatchList/AddToWatchList';
import AddToPortfolio from '../AddToPortfolio/AddToPortfolio';

export default function PortfolioBox({ coinData, livePrice, avgPrice, quantity }) {
    const [priceColor, setPriceColor] = useState('text-white');
    const previousPrice = useRef(null);
    const [profit, setProfit] = useState(0);
    const [profitColor, setProfitColor] = useState('text-white');

    useEffect(() => {
        if (previousPrice.current == null) {
            previousPrice.current = livePrice;
            return;
        }
        if (livePrice > previousPrice.current) {
            setPriceColor('text-green-500');
        } else if (livePrice < previousPrice.current) {
            setPriceColor('text-red-500');
        } else {
            setPriceColor('text-white');
        }
        previousPrice.current = livePrice;

        const calculatedProfit = (livePrice * quantity) - (avgPrice * quantity);
        setProfit(calculatedProfit);

        if (calculatedProfit > 0) {
            setProfitColor('text-green-500');
        } else if (calculatedProfit < 0) {
            setProfitColor('text-red-500');
        } else {
            setProfitColor('text-white');
        }
    }, [livePrice, avgPrice, quantity]);

    return (
        <>
            <TableCell className="p-4">
                <img src={coinData.image} alt={coinData.symbol} className="w-12 h-auto rounded-full" />
            </TableCell>
            <TableCell className="text-lg font-bold text-white">{coinData.symbol.toUpperCase()}</TableCell>
            <TableCell className={`${priceColor} text-lg font-bold`}>
                Price: ${Number(livePrice).toFixed(4)}
            </TableCell>
            <TableCell className="text-sm text-white font-semibold">Current Quantity: {quantity}</TableCell>
            <TableCell className="text-sm text-white font-semibold">
                Your Average Price: ${avgPrice?.toFixed(4)}
            </TableCell>
            <TableCell className={`${profitColor} text-lg font-bold`}>
                P&L: ${profit?.toFixed(2)}
            </TableCell>
            <TableCell>
                <AddToWatchList coinData={coinData} />
            </TableCell>
            <TableCell className="text-right">
                <AddToPortfolio coinData={coinData} livePrice={livePrice} />
            </TableCell>
        </>
    );
}