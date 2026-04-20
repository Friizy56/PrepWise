import { useEffect, useState, useMemo } from "react";
import { getTasksByUser } from "../services/taskService";
import useAuth from "../hooks/useAuth";
import {
    getTopicDistribution,
    getMostPracticedTopic,
    getHardTaskCount,
    getTotalTasks,
} from "../utils/analytics";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell,
} from "recharts";

export default function Analytics() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (user) loadTasks();
    }, [user]);

    const loadTasks = async () => {
        const data = await getTasksByUser(user.uid);
        setTasks(data);
    };

    const topicMap = useMemo(() => getTopicDistribution(tasks), [tasks]);

    const chartData = useMemo(
        () =>
            Object.keys(topicMap).map((topic, index) => ({
                topic,
                count: topicMap[topic],
            })),
        [topicMap]
    );

    const total = useMemo(() => getTotalTasks(tasks), [tasks]);
    const hardTasks = useMemo(() => getHardTaskCount(tasks), [tasks]);
    const mostUsedTopic = useMemo(() => getMostPracticedTopic(tasks), [tasks]);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Analytics</h1>
                <p className="text-slate-400">Visualize your progress and gain deep insights.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-white">Topic Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[400px] w-full pt-4">
                            {chartData.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-800 rounded-3xl">
                                    <ChartIcon />
                                    <p className="mt-4">Not enough data to generate chart</p>
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: -20, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                        <XAxis 
                                            dataKey="topic" 
                                            stroke="#64748b" 
                                            fontSize={12} 
                                            tickLine={false} 
                                            axisLine={false}
                                            tick={{ fill: '#94a3b8' }}
                                        />
                                        <YAxis 
                                            stroke="#64748b" 
                                            fontSize={12} 
                                            tickLine={false} 
                                            axisLine={false}
                                            tick={{ fill: '#94a3b8' }}
                                        />
                                        <Tooltip 
                                            cursor={{ fill: '#1e293b' }}
                                            contentStyle={{ 
                                                backgroundColor: '#0f172a', 
                                                borderColor: '#334155',
                                                borderRadius: '12px',
                                                color: '#f1f5f9'
                                            }}
                                            itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
                                        />
                                        <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6366f1' : '#8b5cf6'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Insights */}
                <div className="space-y-6">
                    <Card className="bg-indigo-600/10 border-indigo-500/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-indigo-400 text-sm uppercase tracking-wider">Quick Insights</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-1">
                                <p className="text-slate-400 text-xs font-medium">Total Preparation Tasks</p>
                                <p className="text-3xl font-bold text-white">{total}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-slate-400 text-xs font-medium">Hard Level Mastery</p>
                                <p className="text-3xl font-bold text-rose-400">{hardTasks}</p>
                            </div>
                            <div className="h-[1px] bg-slate-800"></div>
                            <div className="space-y-1">
                                <p className="text-slate-400 text-xs font-medium">Most Practiced Field</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="p-1 px-3 bg-indigo-500/20 text-indigo-400 rounded-full font-bold text-sm border border-indigo-500/20">
                                        {mostUsedTopic || "N/A"}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-slate-400 text-sm uppercase tracking-wider text-center">Progress Badge</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center p-8">
                            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.3)] mb-4">
                                <BadgeIcon />
                            </div>
                            <p className="font-heading font-bold text-white text-lg">Consistent Learner</p>
                            <p className="text-slate-500 text-xs text-center mt-1">Practice daily to unlock the next level.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

const ChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
);

const BadgeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/><path d="M9 8h6"/></svg>
);