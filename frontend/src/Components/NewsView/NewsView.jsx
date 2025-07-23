import NewsCard from "../NewsCard/NewsCard";
import { webFetchedContext } from "../../context/Webfetching/WebFetchContext";
import { useContext } from 'react';
import { Table, TableBody } from "../ui/table";

const NewsView = () => {
    const { newsApiData } = useContext(webFetchedContext);
    return (
        <div
            className="w-full rounded-md border border-gray-5700 p-4 bg-black text-white mb-8"
            style={{ height: '400px', overflowY: 'auto', overflowX: 'auto' }}
        >
            <h1 className="text-xl font-semibold mb-4">News</h1>
            <Table>
                <TableBody>
                    {newsApiData.Data.map((news) => (
                        <NewsCard key={news.ID} news={news} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default NewsView;