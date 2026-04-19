import { auth } from "../../services/firebase";
import { signOut } from "firebase/auth";
import useTasks from "../../hooks/useTasks";
import useStreak from "../../hooks/useStreak";

export default function Topbar() {
    const { tasks } = useTasks();
    const streak = useStreak(tasks);

    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
            <h2 className="font-semibold text-lg">Welcome back 👋</h2>

            <div className="flex items-center gap-4">
                <span className="text-orange-500 font-medium">
                    🔥 Streak: {streak} days
                </span>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}