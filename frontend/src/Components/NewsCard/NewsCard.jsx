import React from "react"
import { TableCell, TableRow } from '../ui/table'



const NewsCard = ({ news }) => {
    // turn whole card into link
    return (
        <a
            href={news.URL}
            target="_blank"//*Opens to new browser
            rel="noopener noreferrer"
            className="hover:bg-muted transition-colors block"

        >
            <TableRow>
                <TableCell>
                    <img src={news.IMAGE_URL} alt="image of news" />
                </TableCell>
                <TableCell>
                    {news.TITLE}
                </TableCell>
                <TableCell>
                    {new Date(news.PUBLISHED_ON * 1000).toLocaleDateString()}
                </TableCell>

            </TableRow>
        </a>
    )

}


export default NewsCard