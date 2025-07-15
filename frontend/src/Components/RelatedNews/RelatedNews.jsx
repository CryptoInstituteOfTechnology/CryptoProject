import React from "react";
import { useContext } from 'react';
import { useBackendAttributes } from "../../context/BackEndContext";
// use search by Id for this https://site.financialmodelingprep.com/developer/docs/stable/search-crypto-news to search and load news based on it, use api caching

export default function RelatedNews() {

    const { RelatedNews } = useBackendAttributes()

    return (
        <div>Related News: </div>
    )
}