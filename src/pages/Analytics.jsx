import { useEffect, useState, useMemo } from "react";
import { getTasksByUser } from "../services/taskService";
import useAuth from "../hooks/useAuth";
import {
    getTopicDistribution,
    getMostPracticedTopic,
    getHardTaskCount,
    getTotalTasks,
} from "../utils/analytics";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
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

    // 📊 Topic distribution
    const topicMap = useMemo(() => getTopicDistribution(tasks), [tasks]);

    const chartData = useMemo(
        () =>
            Object.keys(topicMap).map((topic) => ({
                topic,
                count: topicMap[topic],
            })),
        [topicMap]
    );

    // 📊 Insights
    const total = useMemo(() => getTotalTasks(tasks), [tasks]);
    const hardTasks = useMemo(() => getHardTaskCount(tasks), [tasks]);
    const mostUsedTopic = useMemo(() => getMostPracticedTopic(tasks), [tasks]);

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Analytics</h1>

            {/* Chart */}
            <div className="bg-white p-5 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">
                    Topic Distribution
                </h2>

                {chartData.length === 0 ? (
                    <p>No data yet</p>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <XAxis dataKey="topic" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>

            {/* Insights */}
            <div className="mt-6 bg-white p-5 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">Insights</h2>

                <p>Total Tasks: <span className="font-medium">{total}</span></p>
                <p>Hard Problems: <span className="font-medium">{hardTasks}</span></p>
                <p>Most Practiced Topic: <span className="font-medium">{mostUsedTopic}</span></p>
            </div>
        </div>
    );
}