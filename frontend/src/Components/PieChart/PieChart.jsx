import { useBackendAttributes } from "../../context/BackEndContext";


// find percentage makeups of portfolio
function findWeights(data) {
    let total = 0
    for (const coin of data) {
        total += (coin.quantity * coin.avgPrice)
    }
    const mapofWeights = data.map((coin) => {
        const percent = (coin.avgPrice * coin.quantity) / total
        return [coin.symbol, percent]
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
    slices.forEach(slice => {
        //start and end of x and y coordinates, need to know end of y and x to start next slice
        const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
        cumulativePercent += slice.percent;
        const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
        // if the slice is more than 50%, take the large arc (the long way around)
        const largeArcFlag = slice.percent > .5 ? 1 : 0;

        // create an array and join it just for code readability
        const pathData = [
            `M ${startX} ${startY}`, // Move
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
            `L 0 0`, // Line
        ].join(' ');
        const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathEl.setAttribute('d', pathData);
        pathEl.setAttribute('fill', slice.color);
        svgEl.appendChild(pathEl);
    });

    return (
        <svg>

        </svg>
    )

}