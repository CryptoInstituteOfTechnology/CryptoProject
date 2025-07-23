import { useBackendAttributes } from "../../context/BackEndContext";

export default function LeaderBoard() {
    const { leaderBoard } = useBackendAttributes();

    return (
        <div className="w-full max-w-2xl mx-auto bg-[#181A20] rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Leaderboard</h2>
            <table className="w-full text-left rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-blue-600">
                        <th className="p-4 text-white font-semibold">#</th>
                        <th className="p-4 text-white font-semibold">Username</th>
                        <th className="p-4 text-white font-semibold">Profit ($)</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderBoard?.map((user, index) => (
                        <tr
                            key={user.username}
                            className="border-b border-[#23272F] hover:bg-[#23272F] transition"
                        >
                            <td className="p-4 text-yellow-600">{index + 1}</td>
                            <td className="p-4 text-gray-100 font-medium">{user.username}</td>
                            <td className="p-4 text-green-400 font-mono">
                                {user.profit.toLocaleString(undefined, {
                                    style: "currency",
                                    currency: "USD",
                                })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}