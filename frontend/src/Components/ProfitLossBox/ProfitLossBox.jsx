import { useState, useEffect, useRef } from 'react'
import { useBackendAttributes } from "../../context/BackEndContext";
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfitLossbox() {
    const { portfolio } = useBackendAttributes()
    const { websocketData, coinApiData } = useContext(webFetchedContext)

    const [priceColor, setPriceColor] = useState('text-white')
    const [profit, setProfit] = useState("0")


    useEffect(() => {

        if (websocketData && portfolio) {
            calculateProfit()

            if (profit > 0) {
                setPriceColor('text-green-600')
            } else if (profit < 0) {
                setPriceColor('text-red-600')
            } else {
                setPriceColor('text-black')
            }

        }
    }, [websocketData])


    const calculateProfit = () => {
        // for each portfolio entry, find the matching symbol(ex. SOL)coinapi data
        // use coinApiData symbol to get the websocket data through its key
        // then do the math and subtract then multiply by portfolios quantity
        // Sum = (websocketPrice - AvgBuyingPrice) * quantity for all items in portfolio
        let total = 0
        portfolio.forEach((entry) => {
            const coin = coinApiData.find((coinsymbol) => coinsymbol.symbol === entry.symbol.toLowerCase())
            const websocketPrice = websocketData[coin.id]
            total += (websocketPrice - entry.avgPrice) * entry.quantity;
        })
        setProfit(total)
    }



    return (
        <div
            className='stats shadow bg-white rounded-lg border border-gray-200 flex justify-center items-center w-70 h-40'
        >
            <div className="stat">
                <h2 className='stat-title text-lg font-bold mb-2'>Profit and Loss</h2>
                <p className={`font-bold text-4xl ${priceColor}`}>${Number(profit)?.toFixed(2)}</p>
            </div>
        </div>
    )

}