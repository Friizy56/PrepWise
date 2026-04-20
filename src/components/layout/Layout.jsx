import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="flex min-h-screen bg-slate-950">
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                <Topbar />

                <main className="p-8 flex-1 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}