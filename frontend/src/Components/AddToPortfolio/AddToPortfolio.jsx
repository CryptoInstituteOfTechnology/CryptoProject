import { useState } from "react"
import AddToPortfolioModal from "../AddToPortfolioModal/AddToPortfolioModal"

export default function AddToPortfolio({ coinData, livePrice }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            {showModal && (
                <AddToPortfolioModal
                    coinData={coinData}
                    livePrice={livePrice}
                    onExit={() => setShowModal(prev => !prev)}
                />
            )}
            <button
                className="w-full px-6 py-3 rounded-lg bg-yellow-200  transition duration-300 ease-in-out text-lg font-bold text-black"
                type="button"
                onClick={() => setShowModal(true)}
            >
                <span className="text-black-600 text-xl">Add to Portfolio</span>
            </button>
        </div>
    )
}