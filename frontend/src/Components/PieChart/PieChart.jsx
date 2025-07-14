import { useBackendAttributes } from "../../context/BackEndContext";


// find percentage makeups of portfolio, and assign random color
function findWeights(data) {
    let total = 0
    for (const coin of data) {
        total += (coin.quantity * coin.avgPrice)
    }
    const mapofWeights = data.map((coin) => {
        const percent = (coin.avgPrice * coin.quantity) / total
        const red = Math.floor(Math.random() * 156) + 100
        const green = Math.floor(Math.random() * 156) + 100
        const blue = Math.floor(Math.random() * 156) + 100
        const color = `rgb(${red},${blue},${green})`
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

    //get percentages of slice
    const slices = findWeights(portfolio)

    //tracker to see what percent has been filled, so you know where to start next slice
    let cumulativePercent = 0;
    //for each slice

    const paths = slices.map((slice, i) => {
        const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
        cumulativePercent += slice.percent;
        const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
        const largeArcFlag = slice.percent > .5 ? 1 : 0;

        // Calculate midpoint for symbol
        const midPoint = cumulativePercent - slice.percent / 2;
        const [symbolX, symbolY] = getCoordinatesForPercent(midPoint);

        const pathData = [
            `M ${startX} ${startY}`,
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            `L 0 0`,
        ].join(' ');

        return (
            <g key={i}>
                <path d={pathData} fill={slice.color} />
                {/* Example: Place a text symbol at the midpoint */}
                <text
                    x={symbolX}
                    y={symbolY}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize="0.1"
                    fill="#000"
                >
                    ★
                </text>
            </g>
        );
    });
    
    return (
        <svg
            viewBox="-1 1 2 2" // puts center at the center of circle
            style={{ transform: "rotate(-90deg)" }} // start circle at top
        >
            {paths}
        </svg>
    )

}