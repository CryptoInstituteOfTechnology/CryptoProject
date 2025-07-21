import React from "react";
import AllTickersView from "../../Components/AllTickersView/AllTickersView"
import NewsView from "../../Components/NewsView/NewsView"
import PortfolioView from "../../Components/PortfolioView/PortfolioView";
import ProfitLossbox from "../../Components/ProfitLossBox/ProfitLossBox";
import Piechart from "../../Components/PieChart/PieChart";
const Dashboard = () => {
    return (
        <div>
            <div>
                <div className="grid grid-cols-2 grid-rows-[auto_1fr_1fr] gap-4">
                    <div className="col-span-2 flex justify-center gap-12 mt-4 ">
                        <ProfitLossbox />
                        <Piechart/>
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