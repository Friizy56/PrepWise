import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load components for code splitting
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Tracker = lazy(() => import("./pages/Tracker"));
const Planner = lazy(() => import("./pages/Planner"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

// Loading component
const LoadingSpinner = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950">
        <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-600/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-4 text-slate-400 font-medium animate-pulse">Preparing your workspace...</p>
    </div>
);

export default function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    {/* Public */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Protected */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Layout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Dashboard />} />
                        <Route path="tracker" element={<Tracker />} />
                        <Route path="planner" element={<Planner />} />
                        <Route path="analytics" element={<Analytics />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}