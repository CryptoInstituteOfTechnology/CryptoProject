import { useBackendAttributes } from "../../context/BackEndContext";


// find percentage makeups of portfolio
function findWeights (data) {
    let total = 0
    for (const coin of data){
        total += (coin.quantity * coin.avgPrice)
    }
    const mapofWeights = data.map((coin) =>{
        const percent = (coin.avgPrice * coin.quantity) / total 
        return[coin.symbol, percent]
    })
    return mapofWeights
}

export default function Piechart() {
    const { portfolio } = useBackendAttributes()
    weightsOfPortfolio = findWeights(portfolio)

    //give it a angle out of 360, thats the weight it gets

    //logic for a circle idk and give it a color

    //reload on eevery reload



    return(
        <svg>
            
        </svg>
    )

}