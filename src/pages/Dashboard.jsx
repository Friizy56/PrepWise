import { useMemo } from "react";
import LeetCodeStats from "../components/LeetCodeStats";
import useTasks from "../hooks/useTasks";
import useStreak from "../hooks/useStreak";
import useStudyPlan from "../hooks/useStudyPlan";
import { getTopicDistribution, getWeakTopic } from "../utils/analytics";

export default function Dashboard() {
    const { tasks } = useTasks();
    const plan = useStudyPlan(tasks);

    // 📊 Total tasks
    const totalTasks = useMemo(() => tasks.length, [tasks]);

    // 📅 Tasks today
    const todayTasks = useMemo(() => {
        const today = new Date().toDateString();
        return tasks.filter((t) => {
            const date = t.createdAt?.seconds
                ? new Date(t.createdAt.seconds * 1000)
                : new Date(t.createdAt);
            return date.toDateString() === today;
        }).length;
    }, [tasks]);

    // 🧠 Topic frequency
    const topicCount = useMemo(() => {
        const map = {};
        tasks.forEach((t) => {
            map[t.topic] = (map[t.topic] || 0) + 1;
        });
        return map;
    }, [tasks]);

    // ⚠️ Weak topic (improved algorithm considering recency, difficulty, and practice count)
    const weakTopic = useMemo(() => getWeakTopic(tasks), [tasks]);

    const streak = useStreak(tasks);

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
                    <h2 className="text-gray-500 text-sm">Total Tasks</h2>
                    <p className="text-2xl font-bold mt-2">{totalTasks}</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
                    <h2 className="text-gray-500 text-sm">Tasks Today</h2>
                    <p className="text-2xl font-bold mt-2">{todayTasks}</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
                    <h2 className="text-gray-500 text-sm">Weak Topic</h2>
                    <p className="text-2xl font-bold mt-2 text-red-500">
                        {weakTopic}
                    </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
                    <h2 className="text-gray-500 text-sm">Streak</h2>
                    <p className="text-2xl font-bold mt-2 text-orange-500">
                        🔥 {streak} days
                    </p>
                </div>
            </div>

            {/* Today's Plan (optional static for now) */}
            <div className="mt-8 bg-white p-5 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-3">Today's Suggested Plan</h2>
                <ul className="space-y-2">
                    {plan.map((item, index) => (
                        <li key={index}>• {item}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-8">
                <LeetCodeStats />
            </div>
        </div>
    );
}