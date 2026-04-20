import { useMemo } from "react";
import LeetCodeStats from "../components/LeetCodeStats";
import useTasks from "../hooks/useTasks";
import useStreak from "../hooks/useStreak";
import useStudyPlan from "../hooks/useStudyPlan";
import { getWeakTopic } from "../utils/analytics";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";

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

    // ⚠️ Weak topic
    const weakTopic = useMemo(() => getWeakTopic(tasks), [tasks]);
    const streak = useStreak(tasks);

    const stats = [
        { label: "Total Tasks", value: totalTasks, icon: <TasksIcon />, color: "text-indigo-400", bg: "bg-indigo-400/10" },
        { label: "Tasks Today", value: todayTasks, icon: <TodayIcon />, color: "text-emerald-400", bg: "bg-emerald-400/10" },
        { label: "Weak Topic", value: weakTopic || "N/A", icon: <WeakIcon />, color: "text-rose-400", bg: "bg-rose-400/10" },
        { label: "Current Streak", value: `${streak} days`, icon: <StreakIcon />, color: "text-orange-400", bg: "bg-orange-400/10" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Dashboard</h1>
                <p className="text-slate-400">Welcome to your preparation workspace.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <Card key={idx} className="hover:border-slate-700 transition-colors group">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-slate-400 mb-1">{stat.label}</p>
                                    <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
                                </div>
                                <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Study Plan */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="text-indigo-400"><PlanIcon /></span>
                            Suggested Plan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {plan.length === 0 ? (
                                <li className="text-sm text-slate-500 py-4 text-center">No tasks for today! Enjoy your rest.</li>
                            ) : (
                                plan.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 group">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.5)]" />
                                        <span className="text-sm text-slate-300 group-hover:text-slate-100 transition-colors leading-tight">
                                            {item}
                                        </span>
                                    </li>
                                ))
                            )}
                        </ul>
                    </CardContent>
                </Card>

                {/* LeetCode Stats */}
                <Card className="lg:col-span-2 overflow-hidden">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="text-indigo-400"><CodeIcon /></span>
                            LeetCode Performance
                        </CardTitle>
                    </CardHeader>
                    <div className="px-6 pb-6 pt-2">
                        <LeetCodeStats />
                    </div>
                </Card>
            </div>
        </div>
    );
}

// Icons
const TasksIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>;
const TodayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
const WeakIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>;
const StreakIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.5 4 6.5 2 2 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>;
const PlanIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v10"/><path d="M18.4 4.6a10 10 0 1 1-12.8 0"/></svg>;
const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;