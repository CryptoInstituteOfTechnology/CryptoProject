import React from "react";
import { TableCell, TableRow } from "../ui/table";

const RelatedNewsCard = ({ news }) => {
    return (
        <TableRow className="hover:shadow-lg transition-shadow hover:bg-gray-100 bg-gray-900 border border-gray-300 rounded-md mb-2">
            <TableCell className="p-4">
                <a
                    href={news.guid}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-900 hover:text-blue-600"
                >
                    <img
                        src={news.image_url}
                        alt="image of news"
                        className="w-24 h-auto mr-4 rounded"
                    />
                    <div className="text-lg text-white font-bold">
                        {new Date(news.publishedOn * 1000).toLocaleDateString()} : {news.title}
                    </div>
                </a>
            </TableCell>
        </TableRow>
    );
};

export default RelatedNewsCard;