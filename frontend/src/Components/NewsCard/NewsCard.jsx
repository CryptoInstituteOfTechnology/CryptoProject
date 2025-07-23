import React from "react";
import { TableCell, TableRow } from '../ui/table';

const NewsCard = ({ news }) => {
  return (
    <TableRow className="hover:shadow-lg transition-shadow hover:bg-gray-800 bg-gray-900 border border-gray-700 rounded-md mb-2">
      <TableCell className="p-4">
        <a
          href={news.URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-white hover:text-blue-400"
        >
          <img src={news.IMAGE_URL} alt="image of news" className="w-24 h-auto mr-4 rounded" />
          <div className="text-lg font-bold">
            {new Date(news.PUBLISHED_ON * 1000).toLocaleDateString()} : {news.TITLE}
          </div>
        </a>
      </TableCell>
    </TableRow>
  );
};

export default NewsCard;