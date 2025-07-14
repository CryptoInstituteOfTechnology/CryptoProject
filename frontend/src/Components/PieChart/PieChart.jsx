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

    const paths = slices.map((slice, i) =>{
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

        return <path key = {i} d = {pathData} fill = {slice.color}/>
    })

    return (
        <svg
            viewBox="-1 1 2 2" // puts center at the center of circle
            style = {{transform: "rotate(-90deg)"}} // start circle at top
        > 
            {paths}
        </svg>
    )

}