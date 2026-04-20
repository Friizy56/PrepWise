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
    Cell,
} from "recharts";
import { useAuth } from "../context/AuthContext";
import { saveLeetCodeStats, getLeetCodeStatsHistory } from "../services/leetcodeService";
import useTasks from "../hooks/useTasks";
import useLeetCodeSuggestions from "../hooks/useLeetCodeSuggestions";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Card, CardContent } from "./ui/Card";

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

            if (
                parsedData.totalSolved === 0 &&
                parsedData.easySolved === 0 &&
                parsedData.mediumSolved === 0 &&
                parsedData.hardSolved === 0
            ) {
                throw new Error("Invalid username or no submissions");
            }

            setData(parsedData);
            await saveLeetCodeStats(user.uid, parsedData);
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
        <div className="space-y-6">
            {/* Input Section */}
            <div className="flex gap-2">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter LeetCode username"
                    className="flex-1"
                />
                <Button
                    onClick={fetchStats}
                    disabled={!user || loading}
                    className="bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/10"
                >
                    {loading ? "..." : "Fetch"}
                </Button>
            </div>

            {/* States */}
            {error && <p className="text-rose-500 text-xs px-1">{error}</p>}

            {/* Content Grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Solved Stats */}
                {data && (
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Solved</p>
                            <p className="text-2xl font-bold text-white">{data.totalSolved}</p>
                        </div>
                        <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl">
                            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Easy</p>
                            <p className="text-2xl font-bold text-slate-100">{data.easySolved}</p>
                        </div>
                        <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl">
                            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1">Medium</p>
                            <p className="text-2xl font-bold text-slate-100">{data.mediumSolved}</p>
                        </div>
                        <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl">
                            <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-1">Hard</p>
                            <p className="text-2xl font-bold text-slate-100">{data.hardSolved}</p>
                        </div>
                    </div>
                )}

                {/* Suggestions */}
                {data && suggestions.length > 0 && (
                    <div className="p-5 bg-indigo-600/5 border border-indigo-500/10 rounded-2xl">
                        <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">Suggested Topics</h3>
                        <ul className="space-y-3">
                            {suggestions.map((item, index) => (
                                <li key={index} className="flex items-center justify-between group">
                                    <span className="text-sm text-slate-300 group-hover:text-slate-100 transition-colors">• {item.text}</span>
                                    {item.link && (
                                        <a href={item.link} target="_blank" rel="noreferrer" className="p-1 px-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-[10px] font-bold text-slate-300 transition-colors">
                                            Practice
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Charts Section */}
            {(difficultyData.length > 0 || chartData.length > 0) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                    {/* Difficulty Breakdown */}
                    {difficultyData.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Difficulty Breakdown</h3>
                            <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={difficultyData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                        <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f1f5f9', fontSize: '12px' }}
                                        />
                                        <Bar dataKey="value" name="Solved" radius={[4, 4, 0, 0]} barSize={32}>
                                            <Cell fill="#10b981" />
                                            <Cell fill="#f59e0b" />
                                            <Cell fill="#f43f5e" />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}

                    {/* Trend Chart */}
                    {chartData.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Progress Trend</h3>
                            <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                        <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f1f5f9', fontSize: '12px' }}
                                        />
                                        <Line type="monotone" dataKey="totalSolved" stroke="#6366f1" strokeWidth={2} dot={{ r: 3, fill: '#6366f1', strokeWidth: 0 }} activeDot={{ r: 5, strokeWidth: 0 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {!data && chartData.length === 0 && (
                <div className="p-8 text-center border-2 border-dashed border-slate-800 rounded-3xl">
                    <p className="text-sm text-slate-500">Fetch stats once to populate your LeetCode progress graph.</p>
                </div>
            )}
        </div>
    );
}