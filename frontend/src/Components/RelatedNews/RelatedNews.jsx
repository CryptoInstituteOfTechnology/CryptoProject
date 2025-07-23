import { useBackendAttributes } from "../../context/BackEndContext";
import { Table, TableBody } from "../ui/table";
import RelatedNewsCard from "./RelatedNewsCard";

export default function RelatedNews() {
    const { relatedNews } = useBackendAttributes();

    if (!relatedNews || relatedNews.length === 0) {
        return null;
    }

    return (
        <div
            className="w-full rounded-md border border-gray-300 p-4 bg-black text-gray-900 h-[400px] overflow-y-auto overflow-x-auto mt-2"
        >
            <h1 className="text-xl  text-white font-semibold mb-4">Important News For Your Portfolio</h1>
            <Table>
                <TableBody>
                    {relatedNews.map((news) => (
                        <RelatedNewsCard key={news.id} news={news} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}