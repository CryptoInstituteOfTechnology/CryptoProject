import NewsCard from "../NewsCard/NewsCard"
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext";
import { useContext } from 'react';
import { Table, TableCaption, TableBody } from "../ui/table"
import { ScrollArea } from "../ui/scroll-area.jsx"

const NewsView = () => {
    const { newsApiData } = useContext(webFetchedContext); 
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