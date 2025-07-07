import { useState } from "react"
import AddToPortfolioModal from "../AddToPortfolioModal/AddToPortfolioModal"


export default function AddToPortfolio({ coinData, livePrice }) {
    const [showModal, setShowModal] = useState(false)


    return (
        <div>

            {showModal && <AddToPortfolioModal />}
            <button
                className="bg-yellow-200 hover:bg-yellow-400 rounded-lg transition duration-300 ease-in-out py-2 px-4"
                type="submit"
                onExit ={() => setShowModal(prev => !prev)} // used this code from old kudosboard proj
            >
                <span className="font-bold">Add to Portfolio</span>
            </button>
        </div>
    )

}