import { useState, useEffect, useCallback, useMemo } from "react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { useAuth } from "../context/AuthContext";
import { saveLeetCodeStats, getLeetCodeStatsHistory } from "../services/leetcodeService";
import useTasks from "../hooks/useTasks";
import useLeetCodeSuggestions from "../hooks/useLeetCodeSuggestions";

export default function LeetCodeStats() {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const [history, setHistory] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { tasks } = useTasks();

    const loadHistory = useCallback(async () => {
        if (!user) return;
        try {
            const hist = await getLeetCodeStatsHistory(user.uid);
            setHistory(hist);
        } catch (err) {
            console.error("Failed to load history:", err);
        }
    }, [user]);

    useEffect(() => {
        const fetchHistory = async () => {
            await loadHistory();
        };
        fetchHistory();
    }, [loadHistory]);

    const fetchStats = async () => {
        if (!input || !user) return;

        setLoading(true);
        setError("");
        setData(null);

        try {
            const res = await fetch(
                `https://alfa-leetcode-api.onrender.com/${input}/profile`
            );

            const result = await res.json();

            const parsedData = {
                totalSolved: result.totalSolved || 0,
                easySolved: result.easySolved || 0,
                mediumSolved: result.mediumSolved || 0,
                hardSolved: result.hardSolved || 0,
            };

            // ❌ If API returns empty or invalid
            if (
                parsedData.totalSolved === 0 &&
                parsedData.easySolved === 0 &&
                parsedData.mediumSolved === 0 &&
                parsedData.hardSolved === 0
            ) {
                throw new Error("Invalid username or no submissions");
            }

            setData(parsedData);

            // Save to Firestore
            await saveLeetCodeStats(user.uid, parsedData);
            // Reload history to include the new data
            await loadHistory();
        } catch {
            setError("Invalid username or API failed");
        } finally {
            setLoading(false);
        }
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return "";
        return timestamp.toDate ? timestamp.toDate() : new Date(timestamp.seconds * 1000);
    };

    const chartData = useMemo(
        () =>
            history.map((entry) => ({
                date: formatTimestamp(entry.timestamp).toLocaleDateString(),
                totalSolved: entry.totalSolved,
            })),
        [history]
    );

    const difficultyData = useMemo(
        () =>
            data
                ? [
                    { name: "Easy", value: data.easySolved },
                    { name: "Medium", value: data.mediumSolved },
                    { name: "Hard", value: data.hardSolved },
                ]
                : [],
        [data]
    );

    const suggestions = useLeetCodeSuggestions(data, tasks);

    return (
        <div className="bg-white p-5 rounded-xl shadow mt-6">
            <h2 className="text-lg font-semibold mb-4">LeetCode Stats</h2>

            {/* Input */}
            <div className="flex gap-2 mb-4">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter LeetCode username"
                    className="border p-2 flex-1"
                />

                <button
                    onClick={fetchStats}
                    className="bg-green-500 text-white px-4 rounded"
                    disabled={!user}
                >
                    Fetch
                </button>
            </div>

            {/* States */}
            {loading && <p className="text-blue-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Current Data */}
            {data && (
                <div className="space-y-1 mb-4">
                    <p>Total Solved: {data.totalSolved}</p>
                    <p>Easy: {data.easySolved}</p>
                    <p>Medium: {data.mediumSolved}</p>
                    <p>Hard: {data.hardSolved}</p>
                </div>
            )}

            {/* Difficulty Breakdown */}
            {difficultyData.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-md font-semibold mb-2">Difficulty Breakdown</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={difficultyData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" name="Solved" fill="#4ade80" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Trend Chart */}
            {chartData.length > 0 ? (
                <div className="mt-6">
                    <h3 className="text-md font-semibold mb-2">Progress Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Line type="monotone" dataKey="totalSolved" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <p className="text-sm text-gray-500 mt-4">Fetch stats once to populate your LeetCode progress graph.</p>
            )}

            {data && suggestions.length > 0 && (
                <div className="mt-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h3 className="text-md font-semibold mb-3">Suggested LeetCode Problems</h3>
                    <ul className="space-y-2 text-gray-700">
                        {suggestions.map((item, index) => (
                            <li key={index} className="leading-6">
                                • {item.text}
                                {item.link && (
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="ml-2 text-blue-600 underline"
                                    >
                                        Open topic
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}