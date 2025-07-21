import NewsCard from "../NewsCard/NewsCard"
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext";
import { useContext } from 'react';
import { Table, TableBody } from "../ui/table"

const NewsView = ({  }) => {
    const { newsApiData } = useContext(webFetchedContext);

    return (
        <div className={`h-[500px] w-full overflow-x-auto rounded-md border p-4 overflow-y-scroll`}>
            <h1 className="text-xl font-semibold mb-2">News</h1>
            <Table className="border-4 border-black"> 

                <TableBody>
                    {newsApiData.Data.map((news) => {
                        return (
                            <NewsCard
                                key={news.ID}
                                news={news}
                            />
                        )
                    })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default NewsView