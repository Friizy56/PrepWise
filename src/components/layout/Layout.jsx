import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="flex h-screen">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Topbar />

                <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}