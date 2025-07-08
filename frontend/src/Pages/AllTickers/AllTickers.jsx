import React from 'react';
import AllTickersView from '../../Components/AllTickersView/AllTickersView';
import { useBackendAttributes } from '../../context/BackEndContext';
const AllTickers = () => {

    return (
        <div>
            <h1>All Tickers on Exchange</h1>
            <AllTickersView />
        </div>
    )
}


export default AllTickers