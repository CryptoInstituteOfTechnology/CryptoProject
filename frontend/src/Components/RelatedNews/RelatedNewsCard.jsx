import React from "react"
import { TableCell, TableRow } from '../ui/table'

const NewsCard = ({ news }) => {
    return (
        <TableRow className="border-4 border-black hover:shadow-md transition-shadow hover:bg-gray-100 transition-colors block">
            <TableCell className="p-4" colSpan={2}>
                <a
                    href={news.guid}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                >
                    <div className="flex flex-col">
                        <img src={news.image_url} alt="image of news" className="w-24 h-auto" />
                        <div className="text-lg font-bold">
                            {new Date(news.publishedOn * 1000).toLocaleDateString()} : {news.title}
                        </div>
                    </div>
                </a>
            </TableCell>
        </TableRow>
    );
};

export default NewsCard