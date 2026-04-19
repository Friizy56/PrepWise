import { useEffect, useState } from "react";
import {
    addTask,
    getTasksByUser,
    deleteTask,
    updateTask,
} from "../services/taskService";
import { useAuth } from "../context/AuthContext";

export default function Tracker() {
    const { user } = useAuth();

    // ✅ ALL HOOKS MUST BE HERE (TOP LEVEL)
    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");

    const [tasks, setTasks] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [filter, setFilter] = useState("All");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // 📥 Load tasks
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

    // ➕ Add / Update
    const handleSubmit = async () => {
        if (!title || !topic) return alert("Fill all fields");

        try {
            setLoading(true);

            if (editingId) {
                await updateTask(editingId, { title, topic, difficulty });
                alert("Task updated!");
                setEditingId(null);
            } else {
                await addTask({
                    title,
                    topic,
                    difficulty,
                    userId: user.uid,
                    createdAt: new Date(),
                });
                alert("Task added!");
            }

            setTitle("");
            setTopic("");
            setDifficulty("Easy");

            loadTasks();
        } catch {
            alert("Error saving task");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (task) => {
        setTitle(task.title);
        setTopic(task.topic);
        setDifficulty(task.difficulty);
        setEditingId(task.id);
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        loadTasks();
    };

    const filteredTasks =
        filter === "All"
            ? tasks
            : tasks.filter((t) => t.difficulty === filter);

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Task Tracker</h1>

            {/* Form */}
            <div className="bg-white p-4 rounded shadow mb-6 space-y-2">
                <input
                    className="border p-2 w-full"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    className="border p-2 w-full"
                    placeholder="Topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />

                <select
                    className="border p-2 w-full"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                        }`}
                >
                    {loading ? "Processing..." : editingId ? "Update Task" : "Add Task"}
                </button>
            </div>

            {/* Filter */}
            <select
                className="border p-2 mb-4"
                onChange={(e) => setFilter(e.target.value)}
            >
                <option>All</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
            </select>

            {/* States */}
            {loading && <p className="text-blue-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* List */}
            <div className="bg-white p-4 rounded shadow">
                {filteredTasks.length === 0 ? (
                    <div className="text-center text-gray-500 py-6">
                        No tasks yet 🚀
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {filteredTasks.map((task) => (
                            <li
                                key={task.id}
                                className="flex justify-between border-b pb-2"
                            >
                                <div>
                                    <p className="font-medium">{task.title}</p>
                                    <p className="text-sm text-gray-500">
                                        {task.topic} • {task.difficulty}
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleEdit(task)}
                                        className="text-blue-500"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(task.id)}
                                        className="text-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}