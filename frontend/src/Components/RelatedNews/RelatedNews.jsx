import { useBackendAttributes } from "../../context/BackEndContext";
import { Table, TableBody } from "../ui/table"
import RelatedNewsCard from "./RelatedNewsCard"
// use search by Id for this https://site.financialmodelingprep.com/developer/docs/stable/search-crypto-news to search and load news based on it, use api caching

export default function RelatedNews() {
    const { relatedNews } = useBackendAttributes()

    return (
        <div className={` h-[500px] w-full overflow-x-auto rounded-md border p-4 overflow-y-scroll mt-2`}>
            <h1 className="text-xl font-semibold mb-2">Important News For Your Portfolio</h1>
            <Table className="border-4 border-black">
                <TableBody>
                    {relatedNews?.map((news) => {
                        console.log(news)
                        return (
                            <RelatedNewsCard
                                key={news.id}
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