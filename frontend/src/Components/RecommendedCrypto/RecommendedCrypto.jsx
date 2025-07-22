import { useBackendAttributes } from "../../context/BackEndContext";
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext";
import { useContext } from 'react';

// return a list of cryptos w their symbols and updating prices
export default function RecommendedCrypto() {
    const { websocketData, coinApiData } = useContext(webFetchedContext)
    const { recommendations } = useBackendAttributes()


    return (
        <div>
            Recommended Crypto
        </div>
    )
}