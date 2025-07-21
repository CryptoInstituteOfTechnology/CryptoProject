import { useBackendAttributes } from "../../context/BackEndContext";
import { useNavigate } from "react-router-dom";
import symbolToName from "./symbolToName.json";
// find percentage makeups of portfolio, and assign random color
function findWeights(data) {
    let total = 0
    for (const coin of data) {
        total += (coin.quantity * coin.avgPrice)
    }
    const mapofWeights = data.map((coin) => {
        const percent = (coin.avgPrice * coin.quantity) / total
        let sum = 0;
        //get consistent, non changing color
        for (let i = 0; i < coin.symbol.length; i++) {
            sum += coin.symbol.charCodeAt(i);
        }
        // use modulus to get hue between 0-359
        const hue = sum % 360;
        const color = `hsl(${hue}, 70%, 50%)`;
        return {
            symbol: coin.symbol,
            percent,
            color
        }
    })
    return mapofWeights
}

function getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
}

export default function Piechart() {
    const { portfolio } = useBackendAttributes()
    const navigate = useNavigate()
    //get percentages of slice
    const slices = findWeights(portfolio)
    //tracker to see what percent has been filled, so you know where to start next slice
    let cumulativePercent = 0;
    //for each slice
    const paths = slices.map((slice, i) => {
        // starting x and y point to end of y and x
        const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
        cumulativePercent += slice.percent;
        const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
        //if arc is big start clockwise
        const largeArcFlag = slice.percent > .5 ? 1 : 0;

        // Calculate midpoint for symbol display
        const midPoint = cumulativePercent - slice.percent / 2;
        const [symbolX, symbolY] = getCoordinatesForPercent(midPoint);

        const pathData = [
            `M ${startX} ${startY}`,
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            `L 0 0`,
        ].join(' ');
        return (
            <g
                key={i}
                className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
                onClick={() => navigate(`/assetview/${symbolToName[slice.symbol]}`)}
            >
                <path
                    d={pathData}
                    fill={slice.color}
                    stroke="#000"
                    strokeWidth="0.02"
                    strokeLinejoin="round"
                    className="transition-colors duration-300 ease-in-out hover:fill-gray-100"
                />
                <text
                    className="font-bold  pointer-events-none"
                    x={symbolX * .6}
                    y={symbolY * .6}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize="0.15"  // smaller font size for smaller chart
                    fill="#000"
                >
                    {slice.symbol}
                </text>
            </g>
        );
    });
    return (
        <svg className="mb-10 mr-4"
            viewBox="-1 -1 2 2"
            width="250"
            height="250"
            style = {{overflow: "visible"}}
        >
            {paths}
        </svg>
    )

}