import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();

    const links = [
        { name: "Dashboard", path: "/", icon: <DashboardIcon /> },
        { name: "Tracker", path: "/tracker", icon: <TrackerIcon /> },
        { name: "Planner", path: "/planner", icon: <PlannerIcon /> },
        { name: "Analytics", path: "/analytics", icon: <AnalyticsIcon /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="w-72 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 p-6 flex flex-col h-screen sticky top-0">
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <LogoIcon />
                </div>
                <h1 className="text-xl font-bold tracking-tight text-white font-heading">PrepWise</h1>
            </div>

            <nav className="space-y-1 flex-1">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActive(link.path)
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                            : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
                        }`}
                    >
                        <span className={`transition-colors duration-200 ${isActive(link.path) ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`}>
                            {link.icon}
                        </span>
                        {link.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
}

// Minimal Icons
const DashboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
);

const TrackerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
);

const PlannerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
);

const AnalyticsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
);

const LogoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
);