import React from "react"
import { TableCell, TableRow } from '../ui/table'

const NewsCard = ({ news }) => {
    
    return (
        <a // turns whole card into links that takes user to assetview for crypto
            href={news.URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-gray-100 transition-colors block"
        >
            <TableRow className="border-4 border-black hover:shadow-md transition-shadow">
                <TableCell className="p-4">
                    <img src={news.IMAGE_URL} alt="image of news" className="w-24 h-auto" />
                </TableCell>
                <TableCell className="text-lg font-bold">{new Date(news.PUBLISHED_ON * 1000).toLocaleDateString()} : {news.TITLE}</TableCell>
            </TableRow>
        </a>
    );
}

export default NewsCard