import React from 'react';
import NewsView from '../../Components/NewsView/NewsView';
import RelatedNews from '../../Components/RelatedNews/RelatedNews';
export default function News() {


    return (
        <div>
            <NewsView />
            <RelatedNews/>
        </div>
    );
}