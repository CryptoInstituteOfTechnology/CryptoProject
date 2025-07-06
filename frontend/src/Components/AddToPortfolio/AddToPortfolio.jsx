

export default function AddToPortfolio({coinData}) {
    
    const openModal = (e) =>{
        console.log(`modal opened for ${coinData.symbol}`)
    }

    return (
        <button
            className="bg-yellow-200 hover:bg-yellow-400 rounded-lg transition duration-300 ease-in-out py-2 px-4"
            type="submit"
            onClick={openModal}
        >
            <span className="font-bold">Add to Portfolio</span>
        </button>
    )

}