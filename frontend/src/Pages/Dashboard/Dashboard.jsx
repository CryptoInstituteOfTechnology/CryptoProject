import React from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AllTickersView from "../../Components/AllTickersView/AllTickersView"
import NewsView from "../../Components/NewsView/NewsView"
import PortfolioView from "../../Components/PortfolioView/PortfolioView";
import ProfitLossbox from "../../Components/ProfitLossBox/ProfitLossBox";
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
            <h1>Dashboard</h1>
            <h2>Welcome, {session?.user?.email} </h2>
            <div>
                <p
                    onClick={handleSignOut}
                    className="sign-out">Sign Out
                </p>

                <div className="grid grid-cols-2 grid-rows-[auto_1fr_1fr] gap -4">
                    <div className="col-span-2">
                        <ProfitLossbox/>
                    </div>
                    <div className="row-span-1">
                        <PortfolioView variant="dashboard"/>
                    </div>
                    <div className="row-span-1">
                        <AllTickersView variant="dashboard"/>
                    </div>
                    <div className="col-span-2">
                        <NewsView variant="dashboard"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard