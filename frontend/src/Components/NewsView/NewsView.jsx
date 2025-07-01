// for general news we fetch
import NewsCard from "../NewsCard/NewsCard" // newsCard componenets
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext"; // get context to access data
import { useContext } from 'react';
import { Table, TableCaption, TableBody } from "../ui/table"
import { ScrollArea } from "../ui/scroll-area.jsx"

// may have a next page where we make another api request :)



const NewsView = () => {
    const { newsApiData } = useContext(webFetchedContext); // get news data


    // same layout as tickers
    return (
        <ScrollArea className="h-[600px]  rounded-md border p-4  h-screen overflow-y-scroll">
            <Table className="border-4 border-black">

                <TableCaption>News</TableCaption>
                <TableBody>
                    {newsApiData.Data.map((news) =>{
                        return(
                            <NewsCard
                                key = {news.ID}
                                news = {news}
                            />
                        )
                    })
                    }
                </TableBody>

            </Table>
        </ScrollArea>
    )

}


export default NewsView