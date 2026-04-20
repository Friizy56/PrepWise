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
        <header className="h-20 px-8 flex justify-between items-center bg-slate-950/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-10">
            <div>
                <h2 className="font-heading text-lg font-semibold text-white">Welcome back 👋</h2>
                <p className="text-xs text-slate-400">Keep up the great work today.</p>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full">
                    <span className="text-sm font-bold text-orange-500">🔥 {streak} days</span>
                </div>

                <div className="h-8 w-[1px] bg-slate-800"></div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-slate-400 hover:text-rose-400 transition-colors"
                >
                    <LogoutIcon />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </header>
    );
}

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
);