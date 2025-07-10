import React from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AllTickersView from "../../Components/AllTickersView/AllTickersView"
import NewsView from "../../Components/NewsView/NewsView"
import PortfolioView from "../../Components/PortfolioView/PortfolioView";
import ProfitLossbox from "../../Components/ProfitLossBox/ProfitLossBox";
import { Button } from "../../Components/ui/button"
const Dashboard = () => {
    const { session, signOut } = UserAuth()
    const navigate = useNavigate();
    const handleSignOut = async (e) => {
        e.preventDefault()
        try {
            await signOut()
            navigate("/")
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <div>
            <div>
                <div className="relative">
                    <Button
                        onClick={handleSignOut}
                        className="absolute top-0 right-0 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded"
                    >
                        Sign Out
                    </Button>
                </div>

                <div className="grid grid-cols-2 grid-rows-[auto_1fr_1fr] gap-4">
                    <div className="col-span-2 flex justify-center">
                        <ProfitLossbox />
                    </div>
                    <div className="row-span-1">
                        <PortfolioView variant="dashboard" />
                    </div>
                    <div className="row-span-1">
                        <AllTickersView variant="dashboard" />
                    </div>
                    <div className="col-span-2">
                        <NewsView variant="dashboard" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard