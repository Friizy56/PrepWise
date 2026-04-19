import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();

    const linkStyle = (path) =>
        `block px-4 py-2 rounded-lg font-medium transition ${location.pathname === path
            ? "bg-blue-500 text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`;

    return (
        <div className="w-64 bg-white shadow-md p-5">
            <h1 className="text-2xl font-bold mb-6">PrepWise</h1>

            <nav className="space-y-2">
                <Link to="/" className={linkStyle("/")}>Dashboard</Link>
                <Link to="/tracker" className={linkStyle("/tracker")}>Tracker</Link>
                <Link to="/planner" className={linkStyle("/planner")}>Planner</Link>
                <Link to="/analytics" className={linkStyle("/analytics")}>Analytics</Link>
            </nav>
        </div>
    );
}