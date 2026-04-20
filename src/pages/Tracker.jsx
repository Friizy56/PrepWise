import { useEffect, useState } from "react";
import {
    addTask,
    getTasksByUser,
    deleteTask,
    updateTask,
} from "../services/taskService";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input, Select } from "../components/ui/Input";

export default function Tracker() {
    const { user } = useAuth();

    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");

    const [tasks, setTasks] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [filter, setFilter] = useState("All");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadTasks = async () => {
        try {
            setLoading(true);
            const data = await getTasksByUser(user.uid);
            setTasks(data);
        } catch {
            setError("Failed to load tasks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            loadTasks();
        }
    }, [user]);

    const handleSubmit = async () => {
        if (!title || !topic) return;

        try {
            setLoading(true);

            if (editingId) {
                await updateTask(editingId, { title, topic, difficulty });
                setEditingId(null);
            } else {
                await addTask({
                    title,
                    topic,
                    difficulty,
                    userId: user.uid,
                    createdAt: new Date(),
                });
            }

            setTitle("");
            setTopic("");
            setDifficulty("Easy");
            loadTasks();
        } catch {
            setError("Error saving task");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (task) => {
        setTitle(task.title);
        setTopic(task.topic);
        setDifficulty(task.difficulty);
        setEditingId(task.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this task?")) {
            await deleteTask(id);
            loadTasks();
        }
    };

    const filteredTasks =
        filter === "All"
            ? tasks
            : tasks.filter((t) => t.difficulty === filter);

    const getDifficultyColor = (diff) => {
        switch (diff) {
            case "Easy": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
            case "Medium": return "text-amber-400 bg-amber-400/10 border-amber-400/20";
            case "Hard": return "text-rose-400 bg-rose-400/10 border-rose-400/20";
            default: return "text-slate-400 bg-slate-400/10 border-slate-400/20";
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Task Tracker</h1>
                <p className="text-slate-400">Manage and track your study tasks effectively.</p>
            </div>

            {/* Form */}
            <Card className="border-indigo-500/20 bg-indigo-500/5">
                <CardHeader>
                    <CardTitle className="text-white">
                        {editingId ? "Update Task" : "Add New Task"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">Task Title</label>
                            <Input
                                placeholder="e.g. Quick Sort Implementation"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">Topic</label>
                            <Input
                                placeholder="e.g. Algorithms"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">Difficulty Level</label>
                        <Select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                        >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </Select>
                    </div>

                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full"
                    >
                        {loading ? "Processing..." : editingId ? "Update Task Details" : "Add Task to List"}
                    </Button>
                </CardContent>
            </Card>

            {/* List Header & Filter */}
            <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                <h2 className="font-heading font-semibold text-white">Your Tasks</h2>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-500">Filter by:</span>
                    <Select
                        className="w-32 py-1.5 text-xs h-9 bg-slate-900"
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All Levels</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </Select>
                </div>
            </div>

            {/* States */}
            {error && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-sm text-center">
                    {error}
                </div>
            )}

            {/* Task List */}
            <div className="space-y-3">
                {loading && tasks.length === 0 ? (
                    <p className="text-center text-slate-500 py-12 animate-pulse">Loading tasks...</p>
                ) : filteredTasks.length === 0 ? (
                    <div className="text-center text-slate-500 py-12 border-2 border-dashed border-slate-800 rounded-3xl">
                        <div className="mb-4 inline-flex p-4 bg-slate-900 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/></svg>
                        </div>
                        <p className="text-lg font-medium text-slate-300">No tasks found</p>
                        <p className="text-sm">Start by adding a new preparation task above.</p>
                    </div>
                ) : (
                    filteredTasks.map((task) => (
                        <Card key={task.id} className="group hover:border-slate-700 transition-all hover:-translate-y-1 duration-300">
                            <CardContent className="p-5 flex justify-between items-center">
                                <div className="space-y-1">
                                    <h4 className="font-semibold text-slate-50 group-hover:text-indigo-400 transition-colors">{task.title}</h4>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-slate-500 uppercase tracking-wider font-bold text-[10px]">{task.topic}</span>
                                        <div className="w-1 h-1 rounded-full bg-slate-700" />
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getDifficultyColor(task.difficulty)} uppercase tracking-wide`}>
                                            {task.difficulty}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleEdit(task)}
                                        className="text-slate-400 hover:text-indigo-400"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDelete(task.id)}
                                        className="text-slate-400 hover:text-rose-500"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}